// assets/js/modules/Header.js

import { isDesktop } from '../core/utils.js';

/**
 * کلاس مدیریت هدر عمودی
 * این نسخه:
 * ۱. منطق منوی تمام‌صفحه (Overlay) را با جلوه اسلاید از راست به چپ در دسکتاپ به‌روزرسانی می‌کند.
 * ۲. اطمینان حاصل می کند که ارتفاع هدر در حالت موبایل (به هنگام باز شدن منو) ثابت باقی بماند.
 * ۳. مطمئن می شود که فیلتر بلور در دسکتاپ پس از بسته شدن منو بازگردانده شود.
 */
export class Header {
    constructor() {
        this.header = document.querySelector('.minimal-vertical-header');
        if (!this.header) return;

        this.toggleArea = this.header.querySelector('.menu-toggle-area');
        this.menuIcon = this.header.querySelector('.menu-icon');
        this.overlay = document.querySelector('.full-screen-menu-overlay');
        this.logoContainer = this.header.querySelector('.logo-container');
        this.ctaButton = this.header.querySelector('.cta-button-wrapper');
        this.arrowPath = this.header.querySelector('.arrow-path');
        
        if (!this.toggleArea || !this.overlay) return; 

        this.isMenuOpen = false;
        this.lastScrollTop = 0;

        // تنظیم اولیه:
        // ۱. لوگو و CTA برای انیمیشن ورود از راست
        gsap.set([this.logoContainer, this.ctaButton], { x: 30, autoAlpha: 0 });
        
        // ۲. اورلی برای اسلاید از راست: ابتدا آن را به بیرون صفحه (سمت راست) منتقل می‌کنیم.
        gsap.set(this.overlay, { 
            x: window.innerWidth, 
            opacity: 0, 
            pointerEvents: 'none', 
            width: '100%' 
        });

        this.init();
    }

    remToPx(rem) {
        return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    }

    get fullHeight() {
        return window.innerHeight;
    }


    init() {
        this.initHoverEvents();
        this.initClickEvents();
        this.setArrowLoop('initial');

        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());
    }

    setArrowLoop(state) {
        if (!this.arrowPath || this.isMenuOpen) return;

        this.arrowPath.classList.remove('animate-loop-initial', 'animate-loop-hovered');
        this.arrowPath.classList.add(state === 'initial' ? 'animate-loop-initial' : 'animate-loop-hovered');
    }

    initHoverEvents() {
        if (!this.toggleArea || !isDesktop()) return;

        this.toggleArea.addEventListener('mouseenter', () => {
            if (this.isMenuOpen) return;

            // ۱. گسترش هدر (Duration 1.5s)
            gsap.to(this.header, { 
                height: this.fullHeight - this.remToPx(2), 
                duration: 1.5, 
                ease: 'power2.out' 
            });

            // ۲. ورود نرم لوگو و CTA
            const tl = gsap.timeline();
            tl.to(this.ctaButton, { autoAlpha: 1, x: 0, duration: 1, ease: 'circ.out' });
            tl.to(this.logoContainer, { autoAlpha: 1, x: 0, duration: 1, ease: 'circ.out' }, "<0.5");

            // چرخش آیکون 
            this.menuIcon.classList.add('is-rotated-90');
            this.menuIcon.classList.remove('is-rotated-180');
            this.setArrowLoop('hovered');
        });

        this.header.addEventListener('mouseleave', () => {
            if (this.isMenuOpen || !isDesktop()) return;

            // ۱. خروج لوگو و CTA
            const targets = [];
            if (this.logoContainer) targets.push(this.logoContainer);
            if (this.ctaButton) targets.push(this.ctaButton);
            if (targets.length > 0) {
                gsap.to(targets, { autoAlpha: 0, x: 30, duration: 0.3, ease: 'power2.in' });
            }

            // ۲. جمع شدن هدر (22vh Duration 1.5s)
            gsap.to(this.header, { 
                height: '22vh', 
                duration: 1.5, 
                ease: 'power2.inOut' 
            });

            this.menuIcon.classList.remove('is-rotated-90', 'is-rotated-180');
            this.setArrowLoop('initial');
        });
    }

    initClickEvents() {
        if (!this.toggleArea || !this.overlay) return;

        this.toggleArea.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMenu();
        });

        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.toggleMenu();
            }
        });
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;

        if (this.isMenuOpen) {
            // ۱. اعمال استایل پس زمینه و چرخش آیکون (برای دسکتاپ: حذف بلور)
            this.header.classList.add('is-expanded-menu'); 
            this.arrowPath?.classList.remove('animate-loop-initial', 'animate-loop-hovered');
            this.menuIcon.classList.remove('is-rotated-90');
            this.menuIcon.classList.add('is-rotated-180');

            // ۲. مدیریت هدر (فقط در دسکتاپ: ارتفاع کامل)
            if (isDesktop()) {
                const targetHeight = this.fullHeight - this.remToPx(2);
                gsap.to(this.header, { height: targetHeight, duration: 0.4, ease: 'power2.inOut' });
            }
            // توجه: در موبایل، هدر ارتفاع ثابت (16vh) خود را حفظ می کند.

            // ۳. نمایش لوگو/CTA (فقط در دسکتاپ)
            if (isDesktop()) {
                gsap.to([this.logoContainer, this.ctaButton], { autoAlpha: 1, x: 0, duration: 0.4, ease: 'circ.out' });
            }

            // ۴. باز کردن اورلی منو با اسلاید از راست به چپ
            gsap.to(this.overlay, {
                opacity: 1,
                pointerEvents: 'all',
                x: 0, 
                duration: 0.5,
                ease: 'expo.out'
            });

        } else {
            // ۱. حذف کلاس استایل پس زمینه و چرخش آیکون (برای دسکتاپ: اعمال بلور مجدد)
            this.header.classList.remove('is-expanded-menu');
            this.menuIcon.classList.remove('is-rotated-90', 'is-rotated-180');

            // ۲. جمع شدن هدر (فقط در دسکتاپ: به 22vh)
            if (isDesktop()) {
                gsap.to(this.header, { height: '22vh', duration: 0.4, ease: 'power2.inOut' });
            }
            
            // ۳. پنهان کردن لوگو/CTA (فقط در دسکتاپ)
            if (isDesktop()) {
                gsap.to([this.logoContainer, this.ctaButton], { autoAlpha: 0, x: 30, duration: 0.3, ease: 'power2.in' });
            }
            
            // ۴. بستن اورلی منو با اسلاید به راست و خروج از دید
            gsap.to(this.overlay, {
                opacity: 0,
                pointerEvents: 'none',
                x: window.innerWidth, // حرکت به بیرون صفحه (سمت راست)
                width: '100%',
                duration: 0.5,
                ease: 'power2.in'
            });

            // ۵. چرخش و لوپ
            this.setArrowLoop('initial');
        }
    }

    /**
     * مدیریت اسکرول در موبایل: هدر هنگام اسکرول به پایین مخفی شده و هنگام اسکرول به بالا ظاهر می‌شود.
     */
    handleScroll() {
        // این منطق فقط برای حالت موبایل و زمانی که منو بسته است اجرا می‌شود
        if (isDesktop() || this.isMenuOpen || !this.header) return; 
        
        const st = window.pageYOffset || document.documentElement.scrollTop;
        const headerHeight = this.header.offsetHeight;

        if (st > this.lastScrollTop && st > headerHeight) {
            // اسکرول به سمت پایین: مخفی کردن هدر
            gsap.to(this.header, { y: -headerHeight- this.remToPx(2), duration: 0.3, ease: 'power2.in' });
        } else if (st < this.lastScrollTop) {
            // اسکرول به سمت بالا: نمایش هدر
             gsap.to(this.header, { y: 0, duration: 0.3, ease: 'power2.out' });
        }
        
        // جلوگیری از خطای پرش در موبایل
        this.lastScrollTop = st <= 0 ? 0 : st; 
    }

    handleResize() {
        if (isDesktop()) {
            if (!this.isMenuOpen) {
                // حالت دسکتاپ بسته
                gsap.set(this.header, { height: '22vh', y: 0 });
                this.header.classList.remove('is-expanded-menu'); 
                gsap.set([this.logoContainer, this.ctaButton], { autoAlpha: 0, x: 30 });
                this.setArrowLoop('initial');
                // اورلی را به بیرون صفحه بفرست
                gsap.set(this.overlay, { x: window.innerWidth, opacity: 0, pointerEvents: 'none', width: '100%' }); 
            } else {
                // حالت دسکتاپ باز
                gsap.set(this.header, { height: this.fullHeight - this.remToPx(2), y: 0 });
                this.header.classList.add('is-expanded-menu'); 
                gsap.set([this.logoContainer, this.ctaButton], { autoAlpha: 1, x: 0 });
                
                // اورلی را در موقعیت نهایی با عرض تنظیم شده قرار بده
                gsap.set(this.overlay, { 
                    x: 0, 
                    opacity: 1, 
                    pointerEvents: 'all',
                });
            }
        } else {
            // حالت موبایل
            gsap.set(this.header, { height: '16vh', y: 0 }); 
            this.header.classList.remove('is-expanded-menu'); // در موبایل این کلاس فقط برای ریست استایل استفاده می شود
            gsap.set([this.logoContainer, this.ctaButton], { autoAlpha: 1, x: 0 }); // در موبایل همیشه باید قابل مشاهده باشند
            
            if (!this.isMenuOpen) {
                this.setArrowLoop('initial');
                // اورلی را به بیرون صفحه بفرست
                gsap.set(this.overlay, { x: window.innerWidth, opacity: 0, pointerEvents: 'none', width: '100%' }); 
            } else {
                // اورلی را در موقعیت نهایی قرار بده
                gsap.set(this.overlay, { x: 0, opacity: 1, pointerEvents: 'all', width: '100%' });
            }
        }
    }
}
