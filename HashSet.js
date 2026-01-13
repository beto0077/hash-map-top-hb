export class HashSet {
    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.buckets = new Array(this.capacity);
        this.size = 0;
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    restructureHashSet() {
        const keys = this.getAllKeys();
        this.buckets = new Array(this.capacity);
        this.size = 0;
        for (const currentKey of keys) {
            this.set(currentKey);
        }
    }

    checkCapacity() {
        const safeEntriesLimit = this.loadFactor * this.capacity;
        if (safeEntriesLimit < this.length()) {
            this.capacity = this.capacity * 2;
            this.restructureHashSet();
        }
    }

    set(key) {
        const index = this.hash(key);

        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }

        const foundKey = this.buckets[index].findIndex(tempKey => {
            return tempKey === key;
        });
        if (foundKey === -1) {
            this.buckets[index].push(key);
            this.size++;
            this.checkCapacity();
        }
    }
    
    has(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        if (bucket) {
            for (let index = 0; index < bucket.length; index++) {
                const currentKey = bucket[index];
                if (currentKey === key) {
                    return true;
                }
            }
        }
        return false;
    }
    
    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        if (bucket) {
            const indexToDelete = bucket.findIndex(tempKey => {
                return tempKey === key;
            });
            if (indexToDelete !== -1) {
                bucket.splice(indexToDelete, 1);
                this.size--;
                return true;
            }
        }
        return false;
    }
    
    length() {
        // let numberOfKeys = 0;
        // for (let index = 0; index < this.buckets.length; index++) {
        //     const bucket = this.buckets[index];
        //     if (bucket) {
        //         for (let index = 0; index < bucket.length; index++) {
        //             numberOfKeys++;
        //         }
        //     }
        // }
        // return numberOfKeys;
        return this.size;
    }
    
    clear() {
        this.capacity = 16;
        this.buckets = new Array(this.capacity);
        this.size = 0;
    }
    
    getAllKeys() {
        const keys = [];
        for (let index = 0; index < this.buckets.length; index++) {
            const bucket = this.buckets[index];
            if (bucket) {
                for (const currentKey of bucket) {
                    keys.push(currentKey);
                }
            }
        }
        return keys;
    }
}