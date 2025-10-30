<?php
namespace Salnama_Theme\Core;

/**
 * مدیریت بارگذاری فایل‌های CSS و جاوااسکریپت
 * این کلاس تمام منابع استاتیک قالب را ثبت می‌کند.
 */
class AssetsLoader {

    /**
     * ثبت هک‌ها و فیلترهای مربوط به بارگذاری منابع
     */
    public function run() {
        add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_styles' ] );
        add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
        add_filter( 'script_loader_tag', [ $this, 'add_module_type_to_scripts' ], 10, 3 );
        add_filter( 'script_loader_tag', [ $this, 'add_module_type_to_cta_modal' ], 10, 3 ); // ← جدید

    }

    /**
     * بارگذاری فایل‌های استایل
     */
    public function enqueue_styles() {
        wp_enqueue_style( 
            'salnama-theme-tailwind', 
            SALNAMA_ASSETS_URI . '/css/dist/tailwind.css', 
            [], 
            SALNAMA_THEME_VERSION 
        );

        wp_enqueue_style( 
            'salnama-theme-global-css', 
            SALNAMA_ASSETS_URI . '/css/global.css', 
            ['salnama-theme-tailwind'], 
            SALNAMA_THEME_VERSION 
        );

            // استایل‌های مخصوص بلوک‌ها
        wp_enqueue_style(
            'salnama-block-styles',
            SALNAMA_ASSETS_URI . '/css/blocks/modal-blocks.css',
            ['salnama-theme-global-css'],
            SALNAMA_THEME_VERSION
        );
    }

    /**
     * بارگذاری فایل‌های جاوااسکریپت
     */
    public function enqueue_scripts() {
        // GSAP Core
        wp_enqueue_script(
            'gsap-core',
            'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js',
            [],
            '3.13.0',
            true
        );
        
        // ScrollTrigger
        wp_enqueue_script(
            'gsap-scrolltrigger',
            'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js',
            ['gsap-core'], 
            '3.13.0',
            true
        );

            // ماژول‌های مودال
        $modal_scripts = [
            'salnama-gsap-manager' => '/js/core/GSAPManager.js',
            'salnama-modal-manager' => '/js/modules/ModalManager.js',
            'salnama-base-modal' => '/js/modules/BaseModal.js',
            'salnama-consultation-modal' => '/js/modules/ConsultationModal.js',
            'salnama-special-order-modal' => '/js/modules/SpecialOrderModal.js',
            'salnama-app' => '/js/core/App.js'
        ];

        foreach ($modal_scripts as $handle => $path) {
            wp_enqueue_script(
                $handle,
                SALNAMA_ASSETS_URI . $path,
                ['gsap-scrolltrigger'],
                SALNAMA_THEME_VERSION,
                true
            );
        }


    }

    /**
     * افزودن type="module" به اسکریپت اصلی
     */
    // در متد add_module_type_to_app_js
    public function add_module_type_to_scripts($tag, $handle, $src) {
        $module_handles = [
            'salnama-gsap-manager',
            'salnama-modal-manager', 
            'salnama-base-modal',
            'salnama-consultation-modal',
            'salnama-special-order-modal',
            'salnama-catalog-modal',
            'salnama-app'
        ];

        if (in_array($handle, $module_handles)) {
            return '<script type="module" src="' . esc_url($src) . '"></script>';
        }
        
        return $tag;
    }

    public function add_module_type_to_cta_modal( $tag, $handle, $src ) {
        if ( 'salnama-cta-modal' === $handle ) {
            return '<script type="module" src="' . esc_url( $src ) . '"></script>';
        }
        return $tag;
    }
}