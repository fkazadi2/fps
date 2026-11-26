<?php
/**
 * Plugin Name: FPS – Actualités et événements
 * Description: Champs d'événement, galerie photo et lecture des articles par le site fps.cd.
 */
if (!defined('ABSPATH')) { exit; }

const FPS_CHAMPS = [
    'fps_auteur'        => ['Auteur / source', 'text'],
    'fps_date'          => ['Date affichée (facultatif)', 'text'],
    'fps_event_debut'   => ['Événement : date de début', 'date'],
    'fps_event_fin'     => ['Événement : date de fin', 'date'],
    'fps_event_heure'   => ['Événement : horaire', 'text'],
    'fps_event_lieu'    => ['Événement : lieu', 'text'],
];

add_action('after_setup_theme', function () { add_theme_support('post-thumbnails'); });

add_action('init', function () {
    foreach (['communique' => 'Communiqué', 'evenement' => 'Événement'] as $slug => $nom) {
        if (!term_exists($slug, 'category')) { wp_insert_term($nom, 'category', ['slug' => $slug]); }
    }
});

add_action('add_meta_boxes', function () {
    add_meta_box('fps_infos', 'Informations FPS', 'fps_boite_infos', 'post', 'normal', 'high');
});

function fps_boite_infos($post) {
    wp_nonce_field('fps_infos', 'fps_nonce');
    wp_enqueue_media();
    echo '<p>Choisissez la catégorie <strong>Communiqué</strong> ou <strong>Événement</strong>. La photo principale est « l\'image mise en avant ».</p>';
    foreach (FPS_CHAMPS as $cle => [$label, $type]) {
        printf('<p><label><strong>%s</strong><br><input type="%s" name="%s" value="%s" class="widefat"></label></p>',
            esc_html($label), esc_attr($type), esc_attr($cle), esc_attr(get_post_meta($post->ID, $cle, true)));
    }
    $ids = array_filter(array_map('absint', explode(',', (string) get_post_meta($post->ID, 'fps_galerie', true))));
    echo '<p><strong>Galerie photo</strong></p><div id="fps-apercu">';
    foreach ($ids as $id) { echo wp_get_attachment_image($id, [80, 80], false, ['style' => 'margin:0 6px 6px 0']); }
    echo '</div><input type="hidden" id="fps_galerie" name="fps_galerie" value="' . esc_attr(implode(',', $ids)) . '">';
    echo '<button type="button" class="button" id="fps-choisir">Choisir les photos</button> <button type="button" class="button-link" id="fps-vider">Vider la galerie</button>';
    ?>
    <script>
    (function () {
      var champ = document.getElementById('fps_galerie'), apercu = document.getElementById('fps-apercu');
      document.getElementById('fps-vider').addEventListener('click', function () { champ.value = ''; apercu.innerHTML = ''; });
      document.getElementById('fps-choisir').addEventListener('click', function () {
        var cadre = wp.media({ title: 'Photos de la galerie', multiple: 'add', library: { type: 'image' } });
        cadre.on('open', function () {
          champ.value.split(',').filter(Boolean).forEach(function (id) { var a = wp.media.attachment(id); a.fetch(); cadre.state().get('selection').add(a); });
        });
        cadre.on('select', function () {
          var photos = cadre.state().get('selection').toJSON(); apercu.innerHTML = '';
          champ.value = photos.map(function (p) { return p.id; }).join(',');
          photos.forEach(function (p) { var i = new Image(80, 80); i.src = (p.sizes && p.sizes.thumbnail ? p.sizes.thumbnail : p).url; i.style.margin = '0 6px 6px 0'; apercu.appendChild(i); });
        });
        cadre.open();
      });
    })();
    </script>
    <?php
}

add_action('save_post_post', function ($id) {
    if (!isset($_POST['fps_nonce']) || !wp_verify_nonce($_POST['fps_nonce'], 'fps_infos') || !current_user_can('edit_post', $id)) { return; }
    foreach (array_keys(FPS_CHAMPS) as $cle) {
        update_post_meta($id, $cle, sanitize_text_field(wp_unslash($_POST[$cle] ?? '')));
    }
    update_post_meta($id, 'fps_galerie', implode(',', array_filter(array_map('absint', explode(',', (string) ($_POST['fps_galerie'] ?? ''))))));
});

function fps_chemin($id) {
    $url = $id ? wp_get_attachment_url($id) : '';
    return $url ? wp_parse_url($url, PHP_URL_PATH) : '';
}

function fps_texte_brut($t) { return trim(html_entity_decode(wp_strip_all_tags($t), ENT_QUOTES | ENT_HTML5, 'UTF-8')); }

function fps_article(WP_Post $p) {
    $m = fn($cle) => (string) get_post_meta($p->ID, $cle, true);
    $cats = wp_list_pluck(get_the_category($p->ID), 'slug');
    $galerie = [];
    foreach (array_filter(array_map('absint', explode(',', $m('fps_galerie')))) as $id) {
        if ($src = fps_chemin($id)) { $galerie[] = ['src' => $src, 'alt' => (string) get_post_meta($id, '_wp_attachment_image_alt', true)]; }
    }
    $a = [
        '_id' => 'wp-' . $p->ID, 'id' => 'wp-' . $p->ID,
        'title' => fps_texte_brut($p->post_title), 'slug' => urldecode($p->post_name),
        'excerpt' => fps_texte_brut($p->post_excerpt ?: wp_trim_words(wp_strip_all_tags(strip_shortcodes($p->post_content)), 40, '…')),
        'content' => apply_filters('the_content', $p->post_content),
        'image' => fps_chemin(get_post_thumbnail_id($p->ID)) ?: ($galerie[0]['src'] ?? '/images/banners/centre-presse/presse.jpg'),
        'images' => $galerie,
        'category' => in_array('evenement', $cats, true) ? 'evenement' : 'communique',
        'tags' => wp_list_pluck(get_the_tags($p->ID) ?: [], 'name'),
        'author' => $m('fps_auteur'), 'date' => $m('fps_date'), 'published' => true,
        'publishedAt' => get_post_time('c', true, $p), 'createdAt' => get_post_time('c', true, $p), 'updatedAt' => get_post_modified_time('c', true, $p),
    ];
    foreach (['fps_event_debut' => 'eventStartDate', 'fps_event_fin' => 'eventEndDate', 'fps_event_heure' => 'eventTime', 'fps_event_lieu' => 'eventLocation'] as $cle => $nom) {
        if ($m($cle) !== '') { $a[$nom] = $m($cle); }
    }
    return $a;
}

add_action('rest_api_init', function () {
    register_rest_route('fps/v1', '/articles', [
        'methods' => 'GET',
        'permission_callback' => '__return_true',   // contenus publiés uniquement, déjà publics sur le site
        'callback' => fn() => array_map('fps_article', get_posts(['post_type' => 'post', 'post_status' => 'publish', 'numberposts' => 200, 'has_password' => false])),
    ]);
});
