import { gsapManager } from '../core/GSAPManager.js';

export class BaseModal {
    constructor(modalId, config = {}) {
        this.modalId = modalId;
        this.config = {
            animationType: 'fade',
            closeOnOverlayClick: true,
            closeOnEsc: true,
            ...config
        };
        
        this.element = document.getElementById(modalId);
        this.isOpen = false;
        this.animation = null;
        
        this.init();
    }

    init() {
        if (!this.element) {
            console.warn(`Modal element with id '${this.modalId}' not found`);
            return;
        }

        this.setupEventListeners();
        this.createAnimation();
    }

    createAnimation() {
        this.animation = gsapManager.createModalAnimation(this.element, this.config.animationType);
    }

    setupEventListeners() {
        // دکمه بستن
        const closeButtons = this.element.querySelectorAll('[data-modal-close]');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => this.close());
        });

        // کلیک روی overlay
        if (this.config.closeOnOverlayClick) {
            const overlay = this.element.querySelector('.modal-overlay');
            if (overlay) {
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) {
                        this.close();
                    }
                });
            }
        }

        // کلید ESC
        if (this.config.closeOnEsc) {
            this.escapeHandler = (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.close();
                }
            };
            document.addEventListener('keydown', this.escapeHandler);
        }
    }

    open() {
        if (!this.element || this.isOpen) return;

        this.element.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        if (this.animation) {
            this.animation.play();
        }
        
        this.isOpen = true;
        this.dispatchEvent('modalOpened', { modalId: this.modalId });
    }

    close() {
        if (!this.element || !this.isOpen) return;

        if (this.animation) {
            this.animation.reverse().then(() => {
                this.element.style.display = 'none';
                document.body.style.overflow = '';
            });
        } else {
            this.element.style.display = 'none';
            document.body.style.overflow = '';
        }
        
        this.isOpen = false;
        this.dispatchEvent('modalClosed', { modalId: this.modalId });
    }

    dispatchEvent(eventName, detail) {
        const event = new CustomEvent(eventName, { detail });
        document.dispatchEvent(event);
    }

    destroy() {
        if (this.escapeHandler) {
            document.removeEventListener('keydown', this.escapeHandler);
        }
    }
}