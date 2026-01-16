// api.js - Pixabay API Service
class PixabayAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = 'https://pixabay.com/api/';
    }

    setApiKey(key) {
        this.apiKey = key;
    }

    async fetchImages(page = 1, perPage = 8) {
        if (!this.apiKey) {
            throw new Error('API key is required');
        }

        const url = `${this.baseURL}?key=${this.apiKey}&editors_choice=true&per_page=${perPage}&page=${page}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.hits) {
            throw new Error('Invalid API response');
        }
        
        return {
            images: data.hits,
            total: data.totalHits,
            page: page
        };
    }
}