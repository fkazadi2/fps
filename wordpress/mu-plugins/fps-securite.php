<?php
/**
 * Plugin Name: FPS – Sécurité
 */
if (!defined('ABSPATH')) { exit; }

// XML-RPC : cible classique des attaques par mot de passe, inutile ici
add_filter('xmlrpc_enabled', '__return_false');

// Ne pas divulguer la liste des comptes aux visiteurs non connectés
add_filter('rest_endpoints', function ($routes) {
    if (!is_user_logged_in()) {
        unset($routes['/wp/v2/users'], $routes['/wp/v2/users/(?P<id>[\d]+)']);
    }
    return $routes;
});
