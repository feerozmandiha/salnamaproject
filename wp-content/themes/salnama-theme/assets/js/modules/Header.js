import { isDesktop } from '../core/utils.js';

/**
 * کلاس مدیریت هدر عمودی — فقط برای تعاملات پیچیده (گسترش، منوی تمام‌صفحه)
 * انیمیشن‌های ساده (فلش، چرخش، ورود اولیه) با CSS انجام شده‌اند.
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

        this.isMenuOpen = false;
        this.lastScrollTop = 0;

        // تنظیم اولیه موقعیت لوگو و CTA برای انیمیشن ورود از راست
        gsap.set([this.logoContainer, this.ctaButton], { x: 30, autoAlpha: 0 });

        this.init();
    }

    get fullHeight() {
        return window.innerHeight;
    }

    get verticalHeaderWidth() {
        return window.innerWidth * 0.0833;
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

            // 1. گسترش هدر با ease نرم
            gsap.to(this.header, { 
                height: this.fullHeight, 
                duration: 0.6, 
                ease: 'power1.out' // تغییر به power1.out برای نرمی و یکنواختی بیشتر
            });

            // 2. ورود نرم لوگو و CTA از راست
            gsap.to([this.logoContainer, this.ctaButton], {
                autoAlpha: 1, // opacity و visibility را مدیریت می‌کند
                x: 0, // حرکت به موقعیت نهایی
                duration: 0.5, // افزایش مدت زمان برای حس ملایم‌تر
                delay: 0.2, // اندکی تأخیر برای اینکه گسترش هدر دیده شود
                ease: 'power1.out' // تغییر به power1.out برای حرکت ملایم
            });

            // چرخش آیکون — با CSS class
            this.menuIcon.classList.add('is-rotated-90');
            this.menuIcon.classList.remove('is-rotated-180');

            this.setArrowLoop('hovered');
            this.shiftBodyContent(true);
        });

        this.header.addEventListener('mouseleave', () => {
            if (this.isMenuOpen || !isDesktop()) return;

            // 1. خروج لوگو و CTA (انیمیشن خروج)
            gsap.to([this.logoContainer, this.ctaButton], { 
                autoAlpha: 0, 
                x: 30, // بازگشت به موقعیت شروع از راست
                duration: 0.2 
            });

            // 2. جمع شدن هدر
            gsap.to(this.header, { 
                height: '20vh', 
                duration: 0.5, 
                ease: 'power2.inOut' 
            });

            this.menuIcon.classList.remove('is-rotated-90', 'is-rotated-180');
            this.setArrowLoop('initial');
            this.shiftBodyContent(false);
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
            this.arrowPath?.classList.remove('animate-loop-initial', 'animate-loop-hovered');
            
            // 1. مدیریت هدر در دسکتاپ
            if (isDesktop()) {
                gsap.to(this.header, { height: this.fullHeight, duration: 0.4, ease: 'power2.inOut' });
                this.shiftBodyContent(true);
                // لوگو و CTA در اینجا نیاز به تنظیم دارند چون منو را باز می کنیم
                gsap.set([this.logoContainer, this.ctaButton], { autoAlpha: 1, x: 0 }); 
            }

            // 2. باز کردن اورلی منو
            gsap.to(this.overlay, {
                opacity: 1,
                pointerEvents: 'all',
                width: isDesktop() ? `calc(100% - ${this.verticalHeaderWidth}px)` : '100%',
                duration: 0.5,
                ease: 'expo.out'
            });

            // چرخش به 180 درجه — با CSS
            this.menuIcon.classList.remove('is-rotated-90');
            this.menuIcon.classList.add('is-rotated-180');

        } else {
            // 1. مدیریت هدر در دسکتاپ
            if (isDesktop()) {
                gsap.to(this.header, { height: '20vh', duration: 0.4, ease: 'power2.inOut' });
                this.shiftBodyContent(false);
                // لوگو و CTA دوباره پنهان شوند
                gsap.set([this.logoContainer, this.ctaButton], { autoAlpha: 0, x: 30 }); 
            }

            // 2. بستن اورلی منو
            gsap.to(this.overlay, {
                opacity: 0,
                pointerEvents: 'none',
                width: '100%',
                duration: 0.3
            });

            this.menuIcon.classList.remove('is-rotated-90', 'is-rotated-180');
            this.setArrowLoop('initial');
        }
    }

    shiftBodyContent(shouldShift) {
        if (!isDesktop()) return;
        const paddingRight = shouldShift ? this.verticalHeaderWidth : 0;
        gsap.to('body', { paddingRight, duration: 0.4, ease: 'power2.inOut' });
    }

    /**
     * مدیریت اسکرول در موبایل: هدر هنگام اسکرول به پایین مخفی شده و هنگام اسکرول به بالا ظاهر می‌شود.
     */
    handleScroll() {
        // این منطق فقط برای حالت موبایل و زمانی که منو بسته است اجرا می‌شود
        if (isDesktop() || this.isMenuOpen) return; 
        
        const st = window.pageYOffset || document.documentElement.scrollTop;
        const headerHeight = this.header.offsetHeight;

        if (st > this.lastScrollTop && st > headerHeight) {
            // اسکرول به سمت پایین: مخفی کردن هدر
            gsap.to(this.header, { y: -headerHeight, duration: 0.3, ease: 'power2.in' });
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
                gsap.set(this.header, { height: '20vh', y: 0 });
                // مطمئن می‌شویم که لوگو/CTA در دسکتاپ بسته، مخفی هستند
                gsap.set([this.logoContainer, this.ctaButton], { autoAlpha: 0, x: 30 });
                this.setArrowLoop('initial');
            } else {
                 // اگر منو باز است، ارتفاع را روی fullHeight تنظیم کن
                gsap.set(this.header, { height: this.fullHeight, y: 0 });
                gsap.set([this.logoContainer, this.ctaButton], { autoAlpha: 1, x: 0 });
            }
            this.shiftBodyContent(this.isMenuOpen || this.header.matches(':hover'));
        } else {
            // حالت موبایل
            gsap.set(this.header, { height: 'auto', y: 0 });
            
            // در اینجا فقط برای تمیزکاری انیمیشن دسکتاپ را ریست می‌کنیم:
            gsap.set([this.logoContainer, this.ctaButton], { autoAlpha: 1, x: 0 });
            
            if (!this.isMenuOpen) {
                this.setArrowLoop('initial');
            }
            this.shiftBodyContent(false);
        }
    }
}
