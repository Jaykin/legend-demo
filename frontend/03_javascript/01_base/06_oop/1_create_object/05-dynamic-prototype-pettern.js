/*
* 动态原型模式
* */

function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;

    if (typeof this.sayName !== 'function') {
        Person.prototype.sayName = function () {
            alert(this.name);
        }
    }
}

var person01 = new Person('Jay', 22, 'Front End Engineer');