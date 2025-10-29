/**
 * سیستم مودال CTA هوشمند — ماژولار و بدون تداخل
 * هر دکمه با data-modal-trigger="slug" می‌تواند مودال را فعال کند.
 */
export class CtaModal {
    constructor() {
        this.modal = document.getElementById('salnama-cta-modal');
        if (!this.modal) return;

        this.contentContainer = this.modal.querySelector('.modal-content');
        this.closeButtons = [
            this.modal.querySelector('.modal-close'),
            this.modal.querySelector('.modal-overlay')
        ];

        this.init();
    }

    init() {
        // ثبت کلیک روی دکمه‌های CTA
        document.querySelectorAll('[data-modal-trigger]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const slug = button.dataset.modalTrigger;
                this.open(slug);
            });
        });

        // ثبت کلیک روی دکمه‌های بستن
        this.closeButtons.forEach(btn => {
            if (btn) {
                btn.addEventListener('click', () => this.close());
            }
        });

        // بستن با کلید ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('is-open')) {
                this.close();
            }
        });
    }

    open(slug) {
        // دریافت محتوای پیش‌بارگذاری‌شده (از DOM)
        const contentElement = document.querySelector(`[data-modal-content="${slug}"]`);
        
        if (contentElement) {
            this.contentContainer.innerHTML = contentElement.innerHTML;
        } else {
            // در صورت عدم وجود، پیام پیش‌فرض
            this.contentContainer.innerHTML = `
                <h3>در حال بارگذاری...</h3>
                <p>لطفاً صبر کنید.</p>
            `;
            // در آینده می‌توانید اینجا AJAX اضافه کنید
        }

        // نمایش مودال با انیمیشن
        gsap.set(this.modal, { opacity: 0 });
        gsap.to(this.modal, {
            opacity: 1,
            duration: 0.4,
            ease: 'expo.out',
            onComplete: () => {
                this.modal.classList.add('is-open');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    close() {
        gsap.to(this.modal, {
            opacity: 0,
            duration: 0.3,
            ease: 'expo.in',
            onComplete: () => {
                this.modal.classList.remove('is-open');
                document.body.style.overflow = '';
                this.contentContainer.innerHTML = ''; // پاک‌سازی محتوا
            }
        });
    }
}
