/**
 * مدیریت متمرکز GSAP برای جلوگیری از تداخل انیمیشن‌ها
 */
class GSAPManager {
    constructor() {
        this.timelines = new Map();
        this.scrollTriggers = new Map();
        this.init();
    }

    init() {
        // بررسی وجود GSAP
        if (typeof gsap === 'undefined') {
            console.warn('GSAP not loaded');
            return;
        }

        // ثبت پلاگین ScrollTrigger
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }
    }

    createTimeline(id, config = {}) {
        const timeline = gsap.timeline(config);
        this.timelines.set(id, timeline);
        return timeline;
    }

    createScrollTrigger(id, config) {
        if (typeof ScrollTrigger === 'undefined') {
            console.warn('ScrollTrigger not available');
            return null;
        }

        const scrollTrigger = ScrollTrigger.create(config);
        this.scrollTriggers.set(id, scrollTrigger);
        return scrollTrigger;
    }

    getTimeline(id) {
        return this.timelines.get(id);
    }

    killTimeline(id) {
        const timeline = this.timelines.get(id);
        if (timeline) {
            timeline.kill();
            this.timelines.delete(id);
        }
    }

    refreshScrollTriggers() {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }

    // متد برای انیمیشن‌های مشترک مودال
    createModalAnimation(modalElement, type = 'fade') {
        const overlay = modalElement.querySelector('.modal-overlay');
        const content = modalElement.querySelector('.modal-content');
        
        switch (type) {
            case 'fade':
                return gsap.timeline({ paused: true })
                    .fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3 })
                    .fromTo(content, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2');
            
            case 'slide':
                return gsap.timeline({ paused: true })
                    .fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3 })
                    .fromTo(content, { opacity: 0, x: 100 }, { opacity: 1, x: 0, duration: 0.4 }, '-=0.2');
            
            default:
                return gsap.timeline({ paused: true })
                    .fromTo(modalElement, { opacity: 0 }, { opacity: 1, duration: 0.4 });
        }
    }
}

export const gsapManager = new GSAPManager();