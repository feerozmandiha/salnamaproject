import { BaseModal } from './BaseModal.js';

export class SpecialOrderModal extends BaseModal {
    constructor() {
        super('special-order-modal', {
            animationType: 'slide',
            closeOnOverlayClick: true,
            closeOnEsc: true
        });
        
        this.setupProductSelection();
    }

    setupProductSelection() {
        const productSelect = this.element?.querySelector('#product-select');
        if (productSelect) {
            productSelect.addEventListener('change', (e) => this.onProductChange(e));
        }
    }

    onProductChange(e) {
        const selectedProduct = e.target.value;
        this.updateProductDetails(selectedProduct);
    }

    updateProductDetails(productId) {
        // آپدیت جزئیات محصول بر اساس انتخاب
        const detailsContainer = this.element?.querySelector('#product-details');
        if (detailsContainer) {
            detailsContainer.innerHTML = this.getProductDetailsHTML(productId);
        }
    }

    getProductDetailsHTML(productId) {
        // برگرداندن HTML جزئیات محصول
        return `<div class="product-details">
            <h4>جزئیات محصول ${productId}</h4>
            <p>توضیحات مربوط به محصول انتخاب شده</p>
        </div>`;
    }
}