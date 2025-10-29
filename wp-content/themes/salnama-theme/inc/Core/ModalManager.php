<?php
namespace Salnama_Theme\Core;

class ModalManager {
    public function run() {
        // اضافه کردن مودال به footer
        add_action('wp_footer', [$this, 'render_modal_template']);
        // بارگذاری الگوهای CTA
        add_action('init', [$this, 'register_cta_patterns']);
    }

    public function render_modal_template() {
        get_template_part('template-parts/modal/cta-modal');
    }

    public function register_cta_patterns() {
        $pattern_dir = SALNAMA_THEME_PATH . '/patterns/cta/';
        if (!is_dir($pattern_dir)) return;

        foreach (glob($pattern_dir . '*.php') as $file) {
            register_block_pattern(
                'salnama/' . basename($file, '.php'),
                require $file
            );
        }
    }
}