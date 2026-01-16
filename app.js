// app.js - Main Application Controller
class PixabayGallery {
    constructor() {
        // Services
        this.api = new PixabayAPI('54018086-4743ed0a7fd1bc6bcbbf9c225');
        this.storage = new StorageService();
        this.ui = new GalleryUI(document.getElementById('gallery'));
        
        // State
        this.currentPage = 1;
        this.perPage = 8;
        this.totalHits = 0;
        this.images = [];
        
        // DOM Elements
        this.elements = {
            apiKeyInput: document.getElementById('apiKeyInput'),
            saveKeyBtn: document.getElementById('saveKeyBtn'),
            loadMoreBtn: document.getElementById('loadMore'),
            loading: document.getElementById('loading'),
            error: document.getElementById('error')
        };
        
        this.init();
    }

    init() {
        this.loadSavedState();
        this.bindEvents();
        
        if (this.api.apiKey) {
            this.loadImages();
        }
    }

    loadSavedState() {
        const savedApiKey = this.storage.load('apiKey');
        const savedPage = this.storage.load('currentPage');
        
        if (savedApiKey) {
            this.api.setApiKey(savedApiKey);
        }
        
        this.elements.apiKeyInput.value = this.api.apiKey;
        
        if (savedPage) {
            this.currentPage = parseInt(savedPage);
        }
    }

    bindEvents() {
        this.elements.saveKeyBtn.addEventListener('click', () => this.saveApiKey());
        this.elements.loadMoreBtn.addEventListener('click', () => this.loadMore());
        
        this.elements.apiKeyInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.saveApiKey();
            }
        });
    }

    saveApiKey() {
        const newKey = this.elements.apiKeyInput.value.trim();
        
        if (!newKey) {
            this.ui.showError(this.elements.error, 'Please enter an API key');
            return;
        }
        
        this.api.setApiKey(newKey);
        this.storage.save('apiKey', newKey);
        this.resetGallery();
        this.loadImages();
    }

    async loadImages() {
        this.ui.showLoading(this.elements.loading, true);
        this.ui.hideError(this.elements.error);

        try {
            const result = await this.api.fetchImages(this.currentPage, this.perPage);
            
            this.totalHits = result.total;
            this.images.push(...result.images);
            this.ui.renderImages(result.images);
            this.updateUI();
            this.storage.save('currentPage', this.currentPage);
        } catch (err) {
            this.ui.showError(this.elements.error, 'Error: ' + err.message);
        } finally {
            this.ui.showLoading(this.elements.loading, false);
        }
    }

    loadMore() {
        this.currentPage++;
        this.loadImages();
    }

    updateUI() {
        const hasMore = this.currentPage * this.perPage < this.totalHits;
        this.ui.updateLoadMoreButton(this.elements.loadMoreBtn, hasMore);
    }

    resetGallery() {
        this.currentPage = 1;
        this.images = [];
        this.ui.clear();
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new PixabayGallery();
});