
/*
* 组合继承（伪经典继承）
* */

function SuperType(name) {
    this.name= name;
    this.colors = ['red', 'blue', 'green'];
}
SuperType.prototype.sayName = function () {
    console.log(this.name);
}

function SubType(name, age) {
    // 继承超类型的实例属性
    SuperType.call(this, name);
    // 子类型实例自己定义的属性
    this.age = age;
}
// 继承超类型原型上的方法
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function () {
    console.log(this.age);
}


var instance01 = new SubType('Jay', 23);
instance01.colors.push('black');
console.log(instance01.colors);             // ['red', 'blue', 'green', 'black']
instance01.sayName();                       // 'Jay'
instance01.sayAge();                        // 23

var instance02 = new SubType('Vivian', 23);
console.log(instance02.colors);             // ['red', 'blue', 'green']
instance02.sayName();                       // 'Vivian'
instance02.sayAge();                        // 23

