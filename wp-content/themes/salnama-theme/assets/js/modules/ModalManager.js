export class ModalManager {
    constructor() {
        this.modals = new Map();
        this.init();
    }

    init() {
        console.log('🔧 ModalManager initialized');
        this.registerExistingModals();
        this.setupEventListeners();
    }

    registerExistingModals() {
        const modalWrappers = document.querySelectorAll('.modal-wrapper');
        console.log(`🔍 Found ${modalWrappers.length} modal wrappers`);
        
        modalWrappers.forEach((modal, index) => {
            let modalType = modal.dataset.modalType;
            
            if (!modalType) {
                modalType = this.extractModalTypeFromClass(modal);
            }
            
            console.log(`🔍 Modal ${index + 1}:`, { type: modalType });
            
            if (modalType) {
                this.registerModal(modalType, modal);
            }
        });

        console.log('📝 Registered modals:', Array.from(this.modals.keys()));
    }

    extractModalTypeFromClass(modalElement) {
        const classes = modalElement.className.split(' ');
        
        for (let cls of classes) {
            if (cls.includes('consultation-modal')) return 'consultation';
            if (cls.includes('special-order-modal')) return 'special-order';
            if (cls.includes('catalog-modal')) return 'catalog';
            if (cls.includes('modal') && !cls.includes('modal-wrapper')) {
                return cls.replace('-modal', '');
            }
        }
        
        return null;
    }

    registerModal(modalId, modalElement) {
        this.modals.set(modalId, modalElement);
        console.log(`✅ Modal registered: ${modalId}`);
    }

    openModal(modalId) {
        console.log(`🔄 Attempting to open modal: ${modalId}`);
        
        const modal = this.modals.get(modalId);
        if (modal) {
            this.closeAllModals();
            
            modal.classList.remove('hidden');
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            console.log(`✅ Modal opened: ${modalId}`);
        } else {
            console.error(`❌ Modal not found: ${modalId}`);
        }
    }

    closeModal(modalId) {
        const modal = this.modals.get(modalId);
        if (modal) {
            modal.classList.remove('active');
            modal.classList.add('hidden');
            document.body.style.overflow = '';
            console.log(`✅ Modal closed: ${modalId}`);
        }
    }

    closeAllModals() {
        console.log('🔴 Closing all modals');
        this.modals.forEach((modal, modalId) => {
            this.closeModal(modalId);
        });
    }

    setupEventListeners() {
        console.log('🔧 Setting up modal event listeners');
        

        // مدیریت کلیک - با دیباگ پیشرفته
        document.addEventListener('click', (e) => {
            console.log('🖱️ Document clicked:', e.target);
            
            // ۱. اول بررسی کن آیا روی trigger کلیک شده
            const trigger = e.target.closest('[data-modal-trigger]');
            if (trigger) {
                console.log('🎯 Modal trigger CLICKED:', trigger);
                e.preventDefault();
                e.stopPropagation();
                const modalId = trigger.dataset.modalTrigger;
                console.log(`🎯 Opening modal: ${modalId}`);
                this.openModal(modalId);
                return;
            }

            // ۲. سپس بررسی کن آیا روی دکمه بستن کلیک شده
            const closeButton = e.target.closest('.modal-close-btn');
            if (closeButton) {
            console.log('🔴 Close button CLICKED (by class):', closeButton);

                e.preventDefault();
                e.stopPropagation();
                this.closeAllModals();
                return;
            }

            // ۳. سپس بررسی کن آیا روی overlay کلیک شده
            if (e.target.classList.contains('modal-overlay')) {
                console.log('🔴 Overlay CLICKED');
                this.closeAllModals();
                return;
            }

            // ۴. اگر روی محتوای مودال کلیک شده، کاری نکن
            if (e.target.closest('.modal-content')) {
                console.log('📦 Modal content clicked - ignoring');
                return;
            }
        });

        // مدیریت کلید ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                console.log('🔴 ESC key pressed');
                this.closeAllModals();
            }
        });

        console.log('✅ Modal event listeners setup complete');
    }
}