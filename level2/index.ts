// 1. 

function getFirstWord(a: string) {
    return a.split(/ +/)[0].length;
}

console.log(getFirstWord('Hello World!'));

// 2.

function getUserNamings(a: {name: string, surname: string}) {
    return {
        fullname: a.name + " " + a.surname,
        initials: a.name[0] + "." + a.surname[0]
    };
}

getUserNamings({name: '123', surname: '321'})
// 3. 

// <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining>
function getAllProductNames(a: {products: {name: string}[]}) {
    return a?.products?.map(prod => prod?.name) || [];
}
getAllProductNames({products: [{name: "1"}, {name: "2"}]})

// 4.1

// easy way is using 'as' keyword
// hard way is ?...
function hey(a: {name: () => string, cuteness?: number, coolness?: number}): string {
    return "hey! i'm " + a.name();
}

console.log(hey({name: () => "roma", cuteness: 100}));
console.log(hey({name: () => "vasya", coolness: 100}));

// 4.2
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name
    }
    returnName(){
        return this.name
    }
}
class Cat extends Animal{
    live: boolean
    constructor(name: string, live: boolean) {
        super(name);
        this.live = live
    }
}
class Dog extends Animal{
    years: number
    constructor(name: string, years: number) {
        super(name);
        this.years = years
    }
}

function hey1(abstractPet: Dog | Cat): string {
    return "hey! i'm " + abstractPet.returnName();
}
let a = new Cat("myavchik", true)
let b = new Dog("gavchik", 333)
console.log(hey1(a));
console.log(hey1(b));

// 4.3
interface task4_3 {
    name: () => string,
    type: string,
    cuteness?: number,
    coolness?: number
}

function hey2(a: task4_3) {
    return "hey! i'm " + a.name()
        + (a.type === "cat" ? ("cuteness: "+a.cuteness) : ("coolness: "+a.coolness))
}

console.log(hey2({name: () => "roma", type: "cat", cuteness: 100}));
console.log(hey2({name: () => "vasya", type: "dog", coolness: 100}));

// 5.

// google for Record type
function stringEntries(a: [] | {}) {
    return Array.isArray(a) ? a : Object.keys(a)
}

console.log(stringEntries([1, 2, 3]));
console.log(stringEntries({a: 1, b: 2, c: 3}));

// 6.

// you don't know Promises and async/await yet. Or do you? 
// ....can be hard, don't worry and SKIP if you do not know how to do it

async function world(a: number) {
    return "*".repeat(a)
}
const hello = async () => {
    return await world(10)
}
hello().then(r => console.log(r)).catch(e => console.log("fail"))