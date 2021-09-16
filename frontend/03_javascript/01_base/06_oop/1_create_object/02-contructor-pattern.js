/*
*
*构造函数模式
*   -- 支持创建指定类型的对象
* */

function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job= job;
    this.sayName = function () {
        alert(this.name);
    }
}

var person01 = new Person('Jay', 19, 'Front End Engineer');
var person02 = new Person('Vivian', 19, 'Product Manager');


// 构造函数(contructor)属性
console.log(person01.constructor === Person);       // true

// 实例判断
console.log(person02 instanceof Person);            // true
console.log(person02 instanceof Object);            // true

// 打印实例
console.dir(person01);
console.dir(person02);