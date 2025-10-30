<?php
namespace Salnama_Theme\Core;

/**
 * Manages the registration of custom Block Patterns for the Salnama Theme.
 */
class BlockPattern {

    public function run() {
        // add_action( 'init', [ $this, 'register_block_patterns' ] );
        add_action( 'init', [ $this, 'register_pattern_categories' ] );
        add_action( 'init', [ $this, 'salnama_register_block_patterns' ] );
        add_action('init', [ $this, 'register_block_styles']);

    }

    public function register_block_styles() {
        // استایل برای مودال overlay
        register_block_style('core/group', [
            'name' => 'modal-overlay',
            'label' => __('پس‌زمینه مودال', 'salnama-theme')
        ]);

        // استایل برای مودال content
        register_block_style('core/group', [
            'name' => 'modal-content', 
            'label' => __('محتوای مودال', 'salnama-theme')
        ]);
    }
    

    /**
     * Registers custom categories for patterns.
     */
    public function register_pattern_categories() {
        register_block_pattern_category(
            'salnama-header',
            [ 'label' => esc_html__( 'هدرهای سالنما', 'salnama-theme' ) ]
        );
        register_block_pattern_category(
            'salnama-components',
            [ 'label' => esc_html__( 'اجزای تعاملی سالنما', 'salnama-theme' ) ]
        );
    }

    public function salnama_register_block_patterns() {
        register_block_pattern_category('salmama-modals', [
            'label' => __('مودال‌های سالنامه', 'salnama-theme')
        ]);

        register_block_pattern(
            'salmama-modals/consultation',
            [
                'title'       => __('مودال مشاوره', 'salnama-theme'),
                'categories'  => ['salmama-modals'],
                'description' => __('مودال درخواست مشاوره با فرم تماس', 'salnama-theme'),
                'content'     => $this->load_pattern_content('modal-consultation'),
            ]
        );

                // پترن دکمه فراخوان
        register_block_pattern(
            'salmama-modals/consultation-button',
            [
                'title'       => __('دکمه مشاوره', 'salnama-theme'),
                'categories'  => ['salmama-modals'],
                'description' => __('دکمه برای باز کردن مودال مشاوره', 'salnama-theme'),
                'content'     => $this->get_consultation_button_content(),
            ]
        );
    }

    private function load_pattern_content($pattern_name) {
        $pattern_file = SALNAMA_THEME_PATH . '/patterns/' . $pattern_name . '.html';
        
        if (file_exists($pattern_file)) {
            $content = file_get_contents($pattern_file);
            return $content;
        }
        
        return '<!-- پترن یافت نشد: ' . $pattern_name . ' -->';
    }

    // اضافه کردن متد جدید
    private function get_consultation_button_content() {
        return '<!-- wp:buttons -->
    <div class="wp-block-buttons">
        <!-- wp:button {"className":"consultation-trigger","data":{"modalTrigger":"consultation"}} -->
        <div class="wp-block-button consultation-trigger">
            <button class="wp-block-button__link wp-element-button" data-modal-trigger="consultation">
                دریافت مشاوره رایگان
            </button>
        </div>
        <!-- /wp:button -->
    </div>
    <!-- /wp:buttons -->';
    }
}

