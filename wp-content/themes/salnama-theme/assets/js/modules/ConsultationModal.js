import { BaseModal } from './BaseModal.js';

export class ConsultationModal extends BaseModal {
    constructor() {
        super('consultation-modal', {
            animationType: 'fade',
            closeOnOverlayClick: true,
            closeOnEsc: true
        });
        
        this.setupFormHandlers();
    }

    setupFormHandlers() {
        const form = this.element?.querySelector('#consultation-form');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        try {
            submitBtn.textContent = 'در حال ارسال...';
            submitBtn.disabled = true;

            // شبیه‌سازی ارسال فرم
            await this.submitFormData(formData);
            
            this.showSuccessMessage();
            this.close();
            
        } catch (error) {
            this.showErrorMessage(error);
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    async submitFormData(formData) {
        // اینجا می‌توانید با AJAX به backend متصل شوید
        return new Promise((resolve) => {
            setTimeout(() => resolve({ success: true }), 1000);
        });
    }

    showSuccessMessage() {
        // نمایش پیام موفقیت
        console.log('Consultation form submitted successfully');
    }

    showErrorMessage(error) {
        // نمایش پیام خطا
        console.error('Form submission error:', error);
    }
}