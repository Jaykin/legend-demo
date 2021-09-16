/*
* 稳妥构造函数模式
* */

function Person(name, age, job) {
    var o = new Object();

    o.getName = function () {
        return name;
    }
    o.getAge = function () {
        return age;
    }
    o.job = function () {
        return job;
    }

    return o;
}

var person = Person('Jay', 18, 'front');

