import { Header } from '../modules/Header.js';
// import { gsapManager } from './GSAPManager.js'; // این خط را کامنت کنید
import { ModalManager } from '../modules/ModalManager.js';

/**
 * Main application initializer for the Salnama Theme.
 * Initializes all modular JavaScript components.
 */
class SalnamaApp {
    constructor() {
        console.log('🚀 SalnamaApp constructor called');
        this.modalManager = null;
        this.init();
    }

    init() {
        console.log('🚀 SalnamaApp init started');

        // مقداردهی اولیه ماژول هدر
        new Header();

        // اطمینان از وجود GSAP قبل از ادامه کار
        if (typeof gsap === 'undefined') {
            console.warn("GSAP library not found. Skipping advanced animations.");
            this.initBasicComponents();
        } else {
            this.initWithGSAP();
        }

        // مقداردهی اولیه سیستم مودال
        this.initModalSystem();
        
        console.log('✅ SalnamaApp fully initialized');
    }

    /**
     * مقداردهی اولیه کامپوننت‌ها بدون GSAP
     */
    initBasicComponents() {
        // کامپوننت‌های پایه بدون انیمیشن‌های پیشرفته
        this.setupGlobalEventListeners();
    }

    /**
     * مقداردهی اولیه کامل با پشتیبانی GSAP
     */
    initWithGSAP() {
        this.setupGlobalEventListeners();
        this.initAnimations();
    }

    /**
     * راه‌اندازی سیستم مودال
     */
    initModalSystem() {
        // ایجاد ModalManager
        this.modalManager = new ModalManager();
        
        // ثبت برای دسترسی جهانی
        window.salmamaModalManager = this.modalManager;
        
        console.log('✅ Modal system initialized');
    }

    setupGlobalEventListeners() {
        // مدیریت کلیک روی triggerهای مودال
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('[data-modal-trigger]');
            if (trigger) {
                e.preventDefault();
                const modalId = trigger.dataset.modalTrigger;
                console.log(`🟢 Modal trigger clicked: ${modalId}`);
                
                if (this.modalManager) {
                    this.modalManager.openModal(modalId);
                } else {
                    console.error('❌ ModalManager not initialized');
                }
            }
        });

        // رفرش ScrollTrigger هنگام لود کامل صفحه
        window.addEventListener('load', () => {
            if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
                // gsapManager.refreshScrollTriggers(); // این خط را کامنت کنید
                ScrollTrigger.refresh(); // استفاده مستقیم از ScrollTrigger
            }
        });

        // مدیریت ریزپونسیو و تغییر سایز
        window.addEventListener('resize', () => {
            if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
                setTimeout(() => ScrollTrigger.refresh(), 300); // استفاده مستقیم
            }
        });

        console.log('✅ Global event listeners setup');
    }

    initAnimations() {
        // انیمیشن‌های عمومی صفحه با GSAP
        this.initScrollAnimations();
        this.initPageTransitions();
    }

    initScrollAnimations() {
        // اگر GSAPManager وجود ندارد، انیمیشن‌ها را غیرفعال کن
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.log('⏸️ GSAP not available, skipping animations');
            return;
        }

        // انیمیشن‌های اسکرول با GSAP - فقط اگر المنت‌ها وجود دارند
        const header = document.querySelector('header');
        if (header) {
            // استفاده مستقیم از ScrollTrigger
            ScrollTrigger.create({
                trigger: header,
                start: 'top top',
                end: 'bottom top',
                toggleClass: { targets: header, className: 'scrolled' },
                markers: false
            });
        }

        // انیمیشن برای عناصر با کلاس animate-on-scroll
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        if (animateElements.length > 0) {
            ScrollTrigger.create({
                trigger: animateElements,
                start: 'top 80%',
                end: 'bottom 20%',
                onEnter: () => {
                    gsap.to(animateElements, {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: 'power2.out'
                    });
                }
            });
        }
    }

    initPageTransitions() {
        // انیمیشن‌های انتقال بین صفحات
        if (typeof gsap === 'undefined') return;

        const mainContent = document.querySelector('main');
        if (mainContent) {
            gsap.fromTo(mainContent, 
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
            );
        }
    }

    /**
     * متدهای عمومی برای دسترسی از خارج کلاس
     */
    getModalManager() {
        return this.modalManager;
    }
}

// راه‌اندازی برنامه
console.log('📜 App.js loaded');

document.addEventListener('DOMContentLoaded', () => {
    console.log('🏠 DOM Content Loaded - Initializing SalnamaApp');
    
    // ایجاد instance全局 از کلاس اصلی
    window.salmamaApp = new SalnamaApp();
    
    // متدهای global برای دسترسی آسان
    window.openModal = (modalId) => {
        if (window.salmamaApp && window.salmamaApp.getModalManager()) {
            window.salmamaApp.getModalManager().openModal(modalId);
        } else {
            console.error('❌ SalnamaApp or ModalManager not available');
        }
    };
    
    window.closeModal = (modalId) => {
        if (window.salmamaApp && window.salmamaApp.getModalManager()) {
            window.salmamaApp.getModalManager().closeModal(modalId);
        } else {
            console.error('❌ SalnamaApp or ModalManager not available');
        }
    };

    window.closeAllModals = () => {
        if (window.salmamaApp && window.salmamaApp.getModalManager()) {
            window.salmamaApp.getModalManager().closeAllModals();
        } else {
            console.error('❌ SalnamaApp or ModalManager not available');
        }
    };

    console.log('✅ Global modal functions registered');
    console.log('💡 Test commands:');
    console.log('   - openModal("consultation")');
    console.log('   - closeModal("consultation")');
    console.log('   - closeAllModals()');
});