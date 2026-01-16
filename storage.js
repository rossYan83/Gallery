// storage.js - Storage Service
class StorageService {
    constructor() {
        this.storage = {};
    }

    save(key, value) {
        this.storage[key] = value;
    }

    load(key) {
        return this.storage[key] || null;
    }

    loadAll() {
        return this.storage;
    }

    delete(key) {
        delete this.storage[key];
    }

    clear() {
        this.storage = {};
    }
}