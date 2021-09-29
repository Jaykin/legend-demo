/*
* 工厂模式
*   -- 解放生产力，使用函数封装创建相似对象的过程
* */

function createPerson(name, age, job) {
    var o = new Object();

    o.name = name;
    o.age = age;
    o.job = job;

    return o;
}

var person01 = createPerson('Jay', 18, 'Front End Engineer');
var person02 = createPerson('Vivian', 18, 'Product Manager');