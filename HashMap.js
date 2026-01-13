export class HashMap {
    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.buckets = new Array(this.capacity);
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    restructureHashMap() {
        const entries = this.entries();
        this.buckets = new Array(this.capacity);
        for (const [key, value] of entries) {
            this.set(key, value);
        }
    }

    checkCapacity() {
        const safeEntriesLimit = this.loadFactor * this.capacity;
        if (safeEntriesLimit < this.length()) {
            this.capacity = this.capacity * 2;
            this.restructureHashMap();
        }
    }

    // set(key, value) takes two arguments: the first is a key, and the second is a value that is assigned to this key. If a key already exists, then the old value is overwritten, and we can say that we update the key’s value (e.g. Carlos is our key but it is called twice: once with value I am the old value., and once with value I am the new value.. Following this logic, Carlos should contain only the latter value).
    set(key, value) {
        const index = this.hash(key);

        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }

        const foundKey = this.buckets[index].findIndex(pair => {
            return pair[0] === key;
        });
        if (foundKey !== -1) {
            this.buckets[index][foundKey] = [key, value];
        } else {
            this.buckets[index].push([key, value]);
            this.checkCapacity();
        }
    }
    // get(key) takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null.
    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        if (bucket) {
            for (const [currentKey, value] of bucket) {
                if (currentKey === key) {
                    return value;
                }
            }
        }
        return null;
    }
    // has(key) takes a key as an argument and returns true or false based on whether or not the key is in the hash map.
    has(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        if (bucket) {
            for (let index = 0; index < bucket.length; index++) {
                const currentKey = bucket[index][0];
                if (currentKey === key) {
                    return true;
                }
            }
        }
        return false;
    }
    // remove(key) takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false.
    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        if (bucket) {
            const indexToDelete = bucket.findIndex(pair => {
                return pair[0] === key;
            });
            if (indexToDelete != -1) {
                bucket.splice(indexToDelete, 1);
                return true;
            }
        }
        return false;
    }
    // length() returns the number of stored keys in the hash map.
    length() {
        let numberOfKeys = 0;
        for (let index = 0; index < this.buckets.length; index++) {
            const bucket = this.buckets[index];
            if (bucket) {
                for (let index = 0; index < bucket.length; index++) {
                    numberOfKeys++;
                }
            }
        }
        return numberOfKeys;
    }
    // clear() removes all entries in the hash map.
    clear() {
        this.capacity = 16;
        this.buckets = new Array(this.capacity);
    }
    // keys() returns an array containing all the keys inside the hash map.
    keys() {
        const keys = [];
        for (let index = 0; index < this.buckets.length; index++) {
            const bucket = this.buckets[index];
            if (bucket) {
                for (const pair of bucket) {
                    keys.push(pair[0]);
                }
            }
        }
        return keys;
    }
    // values() returns an array containing all the values.
    values() {
        const values = [];
        for (let index = 0; index < this.buckets.length; index++) {
            const bucket = this.buckets[index];
            if (bucket) {
                for (const pair of bucket) {
                    values.push(pair[1]);
                }
            }
        }
        return values;
    }
    // entries() returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]
    entries() {
        const entries = [];
        for (let index = 0; index < this.buckets.length; index++) {
            const bucket = this.buckets[index];
            if (bucket) {
                for (const [key, value] of bucket) {
                    entries.push([key, value]);
                }
            }
        }
        return entries;
    }
}