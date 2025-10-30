<?php
namespace Salnama_Theme\Core;

class ModalManager {
    
    private static $instance = null;
    private $modals = [];

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function register_modal($modal_id, $modal_class) {
        $this->modals[$modal_id] = $modal_class;
    }

    public function get_modal_content($modal_id, $args = []) {
        if (isset($this->modals[$modal_id])) {
            $modal_class = $this->modals[$modal_id];
            if (class_exists($modal_class)) {
                $modal_instance = new $modal_class($args);
                return $modal_instance->render();
            }
        }
        return '';
    }

    public function init() {
        add_action('wp_footer', array($this, 'render_modals'));
    }

    public function render_modals() {
        foreach ($this->modals as $modal_id => $modal_class) {
            echo $this->get_modal_content($modal_id);
        }
    }

}