class GalleryUI {
    constructor(galleryElement) {
        this.gallery = galleryElement;
    }

    renderImages(images) {
        images.forEach(img => {
            const card = this.createImageCard(img);
            this.gallery.appendChild(card);
        });
    }

    createImageCard(img) {
        const card = document.createElement('div');
        card.className = 'image-card';
        card.onclick = () => window.open(img.pageURL, '_blank');
        
        card.innerHTML = `
            <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy">
        `;
        
        return card;
    }

    clear() {
        this.gallery.innerHTML = '';
    }

    showLoading(loadingElement, show) {
        if (show) {
            loadingElement.classList.add('active');
        } else {
            loadingElement.classList.remove('active');
        }
    }

    showError(errorElement, message) {
        errorElement.textContent = message;
        errorElement.classList.add('active');
    }

    hideError(errorElement) {
        errorElement.classList.remove('active');
    }

    updateLoadMoreButton(button, hasMore) {
        if (hasMore) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    }
}

export default GalleryUI;