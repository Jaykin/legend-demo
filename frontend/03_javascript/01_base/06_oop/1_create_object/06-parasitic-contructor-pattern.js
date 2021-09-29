/*
* 寄生构造函数模式
* */

function SpecialArray() {
    // 创建普通数组
    var array = new Array();

    // 初始化数组的值
    array.push.apply(array, arguments);

    // 为数组实例添加方法
    array.toPipedString = function () {
        return this.join('|');
    }

    return array;
}

var colors = new SpecialArray('red', 'blue', 'yellow');
console.log(colors.toPipedString);      // "red|blue|yellow"
console.log(colors instanceof SpecialArray);    // false



function Person(name, age, job){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        alert(this.name);
    };
    return o;
}
var friend = new Person("Nicholas", 29, "Software Engineer");
friend.sayName();       //"Nicholas"
