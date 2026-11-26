<?php
/**
 * Plugin Name: FPS – Publications
 * Description: Offres d'emploi, appels d'offres et documents affichés sur fps.cd.
 */
if (!defined('ABSPATH')) { exit; }

function fps_types_publications() {
    return [
        'fps_offre' => ['route' => 'offres', 'pluriel' => "Offres d'emploi", 'singulier' => "Offre d'emploi", 'icone' => 'dashicons-businessperson',
            'description' => 'description', 'champs' => [
                'departement' => ['Département', 'text'], 'lieu' => ['Lieu', 'text'], 'type' => ['Type de contrat (CDI, CDD, stage…)', 'text'],
                'niveau' => ['Profil / niveau', 'text'], 'experience' => ['Expérience', 'text'], 'salaire' => ['Salaire', 'text'],
                'dateLimite' => ['Date limite (texte libre, ex. 30 juin 2026)', 'text'], 'requirements' => ['Exigences (une par ligne)', 'lignes'],
                'pdfUrl' => ["Avis officiel (PDF)", 'fichier']]],
        'fps_appel' => ['route' => 'appels', 'pluriel' => "Appels d'offres", 'singulier' => "Appel d'offres", 'icone' => 'dashicons-megaphone',
            'description' => 'description', 'champs' => [
                'reference' => ['Référence', 'text'], 'statut' => ['Statut', 'statut'], 'dateLimite' => ['Date limite (ex. 28 Février 2027)', 'text'],
                'montant' => ['Montant (ex. 450,000 USD)', 'text'], 'lieu' => ['Lieu', 'text'], 'fileUrl' => ["Dossier d'appel d'offres (PDF)", 'fichier']]],
        'fps_document' => ['route' => 'documents', 'pluriel' => 'Documents', 'singulier' => 'Document', 'icone' => 'dashicons-media-document',
            'description' => 'description', 'champs' => [
                'category' => ['Catégorie (Rapport Annuel, Texte Légal, Décret…)', 'text'], 'date' => ['Date affichée', 'text'],
                'downloads' => ['Nombre de téléchargements affiché', 'number'], 'fileUrl' => ['Fichier (PDF)', 'fichier']]],
    ];
}

add_action('init', function () {
    foreach (fps_types_publications() as $type => $t) {
        register_post_type($type, [
            'labels' => ['name' => $t['pluriel'], 'singular_name' => $t['singulier'], 'add_new' => 'Ajouter', 'add_new_item' => 'Ajouter : ' . $t['singulier'], 'edit_item' => 'Modifier : ' . $t['singulier']],
            'public' => false, 'show_ui' => true, 'show_in_menu' => true, 'menu_icon' => $t['icone'], 'supports' => ['title', 'excerpt'], 'rewrite' => false,
        ]);
        add_action("add_meta_boxes_$type", function () use ($type, $t) {
            add_meta_box('fps_champs', 'Informations affichées sur le site', fn($post) => fps_boite_publication($post, $t), $type, 'normal', 'high');
        });
        add_action("save_post_$type", function ($id) use ($t) {
            if (!isset($_POST['fps_pub_nonce']) || !wp_verify_nonce($_POST['fps_pub_nonce'], 'fps_pub') || !current_user_can('edit_post', $id)) { return; }
            foreach ($t['champs'] as $cle => [, $genre]) {
                $v = wp_unslash($_POST["fps_$cle"] ?? '');
                $v = $genre === 'lignes' ? sanitize_textarea_field($v) : ($genre === 'fichier' ? (string) absint($v) : sanitize_text_field($v));
                update_post_meta($id, "fps_$cle", $v);
            }
        });
    }
});

function fps_boite_publication($post, $t) {
    wp_nonce_field('fps_pub', 'fps_pub_nonce');
    wp_enqueue_media();
    echo "<p>Le texte de présentation se saisit dans <strong>Extrait</strong>. La date de publication est la date affichée « Publié le ».</p>";
    foreach ($t['champs'] as $cle => [$label, $genre]) {
        $v = get_post_meta($post->ID, "fps_$cle", true); $nom = "fps_$cle";
        echo '<p><strong>' . esc_html($label) . '</strong><br>';
        if ($genre === 'lignes') {
            echo '<textarea name="' . $nom . '" rows="4" class="widefat">' . esc_textarea($v) . '</textarea>';
        } elseif ($genre === 'statut') {
            echo '<select name="' . $nom . '">'; foreach (['Ouvert', 'Fermé'] as $o) { echo '<option' . selected($v, $o, false) . '>' . $o . '</option>'; } echo '</select>';
        } elseif ($genre === 'fichier') {
            $url = $v ? wp_get_attachment_url((int) $v) : '';
            echo '<input type="hidden" name="' . $nom . '" value="' . esc_attr($v) . '"><button type="button" class="button fps-fichier">Choisir le PDF</button> <span>' . esc_html($url ? basename($url) : 'aucun fichier') . '</span>';
        } else {
            echo '<input type="' . esc_attr($genre) . '" name="' . $nom . '" value="' . esc_attr($v) . '" class="widefat">';
        }
        echo '</p>';
    }
    ?>
    <script>
    document.querySelectorAll('.fps-fichier').forEach(function (b) {
      b.addEventListener('click', function () {
        var cadre = wp.media({ title: 'Choisir un PDF', multiple: false, library: { type: 'application/pdf' } });
        cadre.on('select', function () { var f = cadre.state().get('selection').first().toJSON(); b.previousElementSibling.value = f.id; b.nextElementSibling.textContent = f.filename; });
        cadre.open();
      });
    });
    </script>
    <?php
}

function fps_publication(WP_Post $p, array $t) {
    $a = ['id' => (string) $p->ID];
    $a[in_array($t['route'], ['offres', 'appels'], true) ? 'titre' : 'title'] = fps_texte_brut($p->post_title);
    $a['description'] = fps_texte_brut($p->post_excerpt);
    foreach ($t['champs'] as $cle => [, $genre]) {
        $v = (string) get_post_meta($p->ID, "fps_$cle", true);
        if ($genre === 'lignes') { $a[$cle] = array_values(array_filter(array_map('trim', explode("\n", $v)))); }
        elseif ($genre === 'fichier') {
            $id = (int) $v; $a[$cle] = $id ? fps_chemin($id) : '';
            $fichier = $id ? get_attached_file($id) : '';
            if ($t['route'] === 'documents') {
                $a['fileSize'] = $fichier && is_file($fichier) ? number_format(filesize($fichier) / 1048576, 1, '.', '') . ' MB' : '—';
                $a['format'] = 'PDF';
            }
        } else { $a[$cle] = $genre === 'number' ? (int) $v : $v; }
    }
    if ($t['route'] !== 'documents') { $t0 = strtotime($p->post_date); $a['datePublication'] = date_i18n('d', $t0) . ' ' . mb_convert_case(date_i18n('F', $t0), MB_CASE_TITLE) . ' ' . date_i18n('Y', $t0); }
    return $a;
}

add_action('rest_api_init', function () {
    foreach (fps_types_publications() as $type => $t) {
        register_rest_route('fps/v1', '/' . $t['route'], [
            'methods' => 'GET', 'permission_callback' => '__return_true',
            'callback' => fn() => array_map(fn($p) => fps_publication($p, $t), get_posts(['post_type' => $type, 'post_status' => 'publish', 'numberposts' => 200,
                'has_password' => false, 'orderby' => ['menu_order' => 'ASC', 'date' => 'DESC']])),
        ]);
    }
});
