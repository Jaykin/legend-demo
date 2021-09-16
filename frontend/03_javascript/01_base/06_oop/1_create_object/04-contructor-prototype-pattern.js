/*
*
* 组合使用构造函数和原型模式
*
* */

// =============================== 普通实现 ===============================
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.friend = ['Kobe', 'Vivian'];
}

Person.prototype = {
    constructor: Person,
    sayName: function () {
        alert(this.name);
    }
}

var person01 = new Person('Jay', 21, 'Front End Engineer');


// =============================== jQuery实现 ===============================
function jQuery(selector, context) {
    return new jQuery.fn.init(selector, context);
}

jQuery.fn = jQuery.prototype = {
    init: function (selector, context) {
        // ...
    }
}

jQuery.fn.init.prototype = jQuery.fn;   // init.prototype的init属性就相当于constructor属性

var $a = jQuery('a', document);