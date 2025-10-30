<?php
namespace Salnama_Theme\Modals;

abstract class BaseModal {
    protected $modal_id;
    protected $args;

    public function __construct($args = []) {
        $this->args = wp_parse_args($args, [
            'classes' => '',
            'overlay_classes' => '',
            'content_classes' => ''
        ]);
    }

    abstract public function render();

    protected function get_modal_wrapper($content) {
        return sprintf(
            '<div id="%s" class="modal-wrapper hidden %s" data-modal="%s">
                %s
            </div>',
            esc_attr($this->modal_id),
            esc_attr($this->args['classes']),
            esc_attr($this->modal_id),
            $content
        );
    }

    protected function get_modal_overlay() {
        return sprintf(
            '<div class="modal-overlay fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 %s"></div>',
            esc_attr($this->args['overlay_classes'])
        );
    }

    protected function get_modal_content($content) {
        return sprintf(
            '<div class="modal-content fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto %s">
                %s
            </div>',
            esc_attr($this->args['content_classes']),
            $content
        );
    }

    protected function get_close_button() {
        return '<button type="button" class="modal-close absolute top-4 left-4 text-gray-500 hover:text-gray-700 transition-colors" data-modal-close>
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>';
    }
}