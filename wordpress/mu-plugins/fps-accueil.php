<?php
/**
 * Plugin Name: FPS – Accueil (carrousel et bandeau d'annonce)
 */
if (!defined('ABSPATH')) { exit; }

function fps_reglages_accueil() {
    return [
        'fps_diapo' => [
            'champs' => ['buttonText' => 'Bouton principal : texte', 'buttonLink' => 'Bouton principal : lien (ex. /programmes)',
                'secondaryButtonText' => 'Second bouton : texte (facultatif)', 'secondaryButtonLink' => 'Second bouton : lien'],
            'aide' => "Texte de la diapositive dans <strong>Extrait</strong>, photo dans <strong>Image mise en avant</strong>, position dans <strong>Ordre</strong> (1 = première).",
        ],
        'fps_annonce' => [
            'champs' => ['lien' => 'Page ouverte au clic (ex. /publications/offre-emploi)'],
            'aide' => "Le <strong>titre</strong> est le message qui défile en haut du site. Plusieurs annonces défilent à la suite. Aucune annonce publiée = bandeau masqué.",
        ],
    ];
}

add_action('init', function () {
    $commun = ['public' => false, 'show_ui' => true, 'show_in_menu' => true, 'rewrite' => false];
    register_post_type('fps_diapo', $commun + ['labels' => ['name' => 'Diapositives', 'singular_name' => 'Diapositive', 'add_new_item' => 'Ajouter une diapositive'],
        'menu_icon' => 'dashicons-images-alt2', 'supports' => ['title', 'excerpt', 'thumbnail', 'page-attributes']]);
    register_post_type('fps_annonce', $commun + ['labels' => ['name' => 'Annonces', 'singular_name' => 'Annonce', 'add_new_item' => 'Ajouter une annonce'],
        'menu_icon' => 'dashicons-bell', 'supports' => ['title', 'page-attributes']]);
});

add_action('add_meta_boxes', function ($type) {
    $reglages = fps_reglages_accueil()[$type] ?? null;
    if (!$reglages) { return; }
    add_meta_box('fps_champs', 'Réglages sur le site', function ($post) use ($reglages) {
        wp_nonce_field('fps_acc', 'fps_acc_nonce');
        echo '<p>' . $reglages['aide'] . '</p>';
        foreach ($reglages['champs'] as $cle => $label) {
            printf('<p><label><strong>%s</strong><br><input type="text" name="fps_%s" value="%s" class="widefat"></label></p>',
                esc_html($label), esc_attr($cle), esc_attr(get_post_meta($post->ID, "fps_$cle", true)));
        }
    }, $type, 'normal', 'high');
});

add_action('save_post', function ($id, $post) {
    $reglages = fps_reglages_accueil()[$post->post_type] ?? null;
    if (!$reglages || !isset($_POST['fps_acc_nonce']) || !wp_verify_nonce($_POST['fps_acc_nonce'], 'fps_acc') || !current_user_can('edit_post', $id)) { return; }
    foreach (array_keys($reglages['champs']) as $cle) {
        update_post_meta($id, "fps_$cle", sanitize_text_field(wp_unslash($_POST["fps_$cle"] ?? '')));
    }
}, 10, 2);

function fps_ordonnes($type) {
    return get_posts(['post_type' => $type, 'post_status' => 'publish', 'numberposts' => 50, 'has_password' => false, 'orderby' => ['menu_order' => 'ASC', 'date' => 'ASC']]);
}

add_action('rest_api_init', function () {
    register_rest_route('fps/v1', '/diapos', ['methods' => 'GET', 'permission_callback' => '__return_true', 'callback' => function () {
        $liste = [];
        foreach (fps_ordonnes('fps_diapo') as $p) {
            $image = fps_chemin(get_post_thumbnail_id($p->ID));
            if (!$image) { continue; }
            $d = ['id' => $p->ID, 'title' => fps_texte_brut($p->post_title), 'description' => fps_texte_brut($p->post_excerpt), 'image' => $image];
            foreach (array_keys(fps_reglages_accueil()['fps_diapo']['champs']) as $cle) {
                $v = (string) get_post_meta($p->ID, "fps_$cle", true);
                if ($v !== '') { $d[$cle] = $v; }
            }
            $liste[] = $d;
        }
        return $liste;
    }]);
    register_rest_route('fps/v1', '/annonces', ['methods' => 'GET', 'permission_callback' => '__return_true', 'callback' => fn() => array_map(
        fn($p) => ['id' => (string) $p->ID, 'texte' => fps_texte_brut($p->post_title), 'lien' => (string) get_post_meta($p->ID, 'fps_lien', true)],
        fps_ordonnes('fps_annonce'))]);
});
