<?php
/**
 * Plugin Name: FPS – Albums photo
 * Description: Galerie du site fps.cd : un album = titre, date, description et photos.
 */
if (!defined('ABSPATH')) { exit; }

add_action('init', function () {
    register_post_type('fps_album', [
        'labels' => ['name' => 'Albums photo', 'singular_name' => 'Album photo', 'add_new' => 'Ajouter un album',
            'add_new_item' => 'Ajouter un album', 'edit_item' => "Modifier l'album", 'all_items' => 'Tous les albums'],
        'public' => false, 'show_ui' => true, 'show_in_menu' => true, 'menu_icon' => 'dashicons-format-gallery',
        'supports' => ['title', 'excerpt'], 'rewrite' => false,
    ]);
});

add_action('add_meta_boxes_fps_album', function () {
    add_meta_box('fps_album_photos', "Photos de l'album", 'fps_boite_album', 'fps_album', 'normal', 'high');
});

function fps_boite_album($post) {
    wp_nonce_field('fps_album', 'fps_album_nonce');
    wp_enqueue_media();
    $ids = array_filter(array_map('absint', explode(',', (string) get_post_meta($post->ID, 'fps_galerie', true))));
    echo '<p>La <strong>première photo</strong> sert de couverture (glissez les photos pour changer l\'ordre). La légende vient du champ « Légende » de chaque photo. La description de l\'album se saisit dans « Extrait ». La date affichée est la date de publication.</p>';
    echo '<div id="fps-album-apercu">';
    foreach ($ids as $id) { echo wp_get_attachment_image($id, [90, 90], false, ['style' => 'margin:0 6px 6px 0']); }
    echo '</div><input type="hidden" id="fps_album_ids" name="fps_galerie" value="' . esc_attr(implode(',', $ids)) . '">';
    echo '<button type="button" class="button button-primary" id="fps-album-choisir">Choisir les photos</button>';
    ?>
    <script>
    (function () {
      var champ = document.getElementById('fps_album_ids'), apercu = document.getElementById('fps-album-apercu');
      document.getElementById('fps-album-choisir').addEventListener('click', function () {
        var ids = champ.value.split(',').filter(Boolean).join(',');
        var cadre = wp.media.gallery.edit('[gallery ids="' + (ids || 0) + '"]');
        if (!ids) { cadre.setState('gallery-library'); }
        cadre.on('update', function (selection) {
          var photos = selection.toJSON(); apercu.innerHTML = '';
          champ.value = photos.map(function (p) { return p.id; }).join(',');
          photos.forEach(function (p) { var i = new Image(90, 90); i.src = (p.sizes && p.sizes.thumbnail ? p.sizes.thumbnail : p).url; i.style.margin = '0 6px 6px 0'; apercu.appendChild(i); });
        });
      });
    })();
    </script>
    <?php
}

add_action('save_post_fps_album', function ($id) {
    if (!isset($_POST['fps_album_nonce']) || !wp_verify_nonce($_POST['fps_album_nonce'], 'fps_album') || !current_user_can('edit_post', $id)) { return; }
    update_post_meta($id, 'fps_galerie', implode(',', array_filter(array_map('absint', explode(',', (string) ($_POST['fps_galerie'] ?? ''))))));
});

add_action('rest_api_init', function () {
    register_rest_route('fps/v1', '/albums', [
        'methods' => 'GET', 'permission_callback' => '__return_true',
        'callback' => function () {
            $albums = [];
            foreach (get_posts(['post_type' => 'fps_album', 'post_status' => 'publish', 'numberposts' => 200, 'has_password' => false]) as $p) {
                $slug = urldecode($p->post_name); $photos = [];
                foreach (array_filter(array_map('absint', explode(',', (string) get_post_meta($p->ID, 'fps_galerie', true)))) as $i => $id) {
                    $src = fps_chemin($id); if (!$src) { continue; }
                    $photos[] = ['id' => "$slug-" . ($i + 1), 'src' => $src,
                        'alt' => (string) get_post_meta($id, '_wp_attachment_image_alt', true) ?: fps_texte_brut($p->post_title),
                        'caption' => fps_texte_brut((string) wp_get_attachment_caption($id))];
                }
                if (!$photos) { continue; }
                $albums[] = ['id' => $slug, 'title' => fps_texte_brut($p->post_title), 'description' => fps_texte_brut($p->post_excerpt),
                    'date' => get_the_date('d/m/Y', $p), 'coverImage' => $photos[0]['src'], 'photos' => $photos];
            }
            return $albums;
        },
    ]);
});
