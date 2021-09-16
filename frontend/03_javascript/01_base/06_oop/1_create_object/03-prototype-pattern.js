/*
*
* 原型模式
*
* */

// =========================== 1.0 ===========================
var Person = function () {}

Person.prototype.name = 'Jay';
Person.prototype.age = 20;
Person.prototype.job = 'Front End Engineer';
Person.prototype.syName = function () {
    alert(this.name);
}

var person01 = new Person();
var person02 = new Person();

// 判断 原型对象 与 某实例的关系
console.log(Person.prototype.isPrototypeOf(person01));      // true
    // ES5
console.log(Object.getPrototypeOf(person01) === Person.prototype);      // true


// 检测属性存在实例还是原型上
person01.sex = 'man';
    // 只要属性在实例上就返回true
console.log(person01.hasOwnProperty('sayName'));        // false
console.log(person01.hasOwnProperty('sex'));        // true
    // 只要对象能访问属性就返回true
console.log('sex' in person01);     // true
console.log('name' in person01);     // true
    // 只要属性在原型上就返回true
function hasPrototypeProperty(obj, properName) {
        // 属性能被对象实例访问 且 不在实例上 则返回true
    return (properName in obj) && !obj.hasOwnProperty(properName);
}


// =========================== 2.0、更简单的原型语法 ===========================
Person.prototype = {
    name: 'Jay',
    age: 20,
    job: 'Front End Engineer',
    sayName: function () {
        alert(this.name);
    }
}

Object.defineProperty(Person.prototype, 'constructor', {
    enumerable: false,
    value: Person
})

// =========================== 原型的动态性 ===========================
var friend01 = new Person();
Person.prototype.sayHi = function () {
    alert('Hi，' + this.name);
}
friend01.sayHi();         // Hi，Jay

var friend02 = new Person();
Person.prototype = {
        // 重写原型
    constructor: Person,
    name: 'Jay',
    age: 20,
    job: 'Front End Engineer',
    sayName: function () {
        alert(this.name);
    },
    sayHi: function () {
        alert('Hi，' + this.name);
    }
}
friend02.sayHi();       // error!