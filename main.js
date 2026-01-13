import { HashMap } from "./HashMap.js";
import { HashSet } from "./HashSet.js";

//HASHMAP TEST CODE

const test = new HashMap();

// test.set('apple', 'red')
// test.set('banana', 'yellow')
// test.set('carrot', 'orange')
// test.set('dog', 'brown')
// test.set('elephant', 'gray')
// test.set('frog', 'green')
// test.set('grape', 'purple')
// test.set('hat', 'black')
// test.set('ice cream', 'white')
// test.set('jacket', 'blue')
// test.set('kite', 'pink')
// test.set('lion', 'golden')

// console.log(test.get('dog'));
// console.log(test.get('lion'));
// console.log(test.get('hat'));
// console.log(test.get('hob'));

// console.log(test.has('dog'));
// console.log(test.has('lion'));
// console.log(test.has('hat'));
// console.log(test.has('hob'));

// console.log(test.remove('frog'));
// console.log(test.remove('hob'));

// console.log(test.length());

// console.log(test.keys());

// console.log(test.values());

// console.log(test.entries());

// test.clear();

// test.set('moon', 'silver');

// console.log(test.entries());

// test.set('moon', 'cheese');

// console.log(test.length());

// console.log(test.entries());


//HASHSET TEST CODE

const set = new HashSet();

console.log(set.length()); // 0

set.set("ironman");
set.set("thor");
set.set("hulk");

console.log(set.length()); // 3
console.log(set.has("thor")); // true
console.log(set.has("loki")); // false

set.set("ironman");
set.set("ironman");
set.set("ironman");

console.log(set.length()); // still being 3

console.log(set.remove("thor")); // true
console.log(set.has("thor"));    // false
console.log(set.length());       // 2

console.log(set.remove("thor")); // false (no longer exists)

const collisionSet = new HashSet();

collisionSet.set("abc");
collisionSet.set("acb");
collisionSet.set("bac");
collisionSet.set("bca");
collisionSet.set("cab");
collisionSet.set("cba");

console.log(collisionSet.length()); // 6

console.log(collisionSet.has("cab")); // true
console.log(collisionSet.has("zzz")); // false

const resizeSet = new HashSet();

for (let i = 0; i < 20; i++) {
    resizeSet.set(`key-${i}`);
}

console.log(resizeSet.length());   // 20
console.log(resizeSet.capacity);   // should be 32

resizeSet.clear();

console.log(resizeSet.length());   // 0
console.log(resizeSet.capacity);   // 16
console.log(resizeSet.has("key-5")); // false

resizeSet.set("jarvis");
resizeSet.set("friday");

console.log(resizeSet.getAllKeys()); 
// ["jarvis", "friday"] (unguaranteed order)
