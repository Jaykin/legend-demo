/*
* 原型链
* */

// 1.0 基本模式
function SuperType() {
    this.property = true;
}
SuperType.prototype.getSuperValue = function () {
    return this.property;
}

function SubType() {
    this.subproperty = false;
}
    // 继承SuperType
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function () {
    return this.subproperty;
}

var instance = new SubType();
console.log(instance.getSuperValue);    // true

// 测试实例与原型的关系
alert(instance instanceof Object);      //true
alert(instance instanceof SuperType);   //true
alert(instance instanceof SubType);     //true
alert(Object.prototype.isPrototypeOf(instance)); //true
alert(SuperType.prototype.isPrototypeOf(instance)); //true
alert(SubType.prototype.isPrototypeOf(instance)); //true


// 2.0 原型链问题
function Super() {
    this.colors = ['red', 'blue', 'white'];
}

function Sub() {}
Sub.prototype = new Super();

var instance01 = new Sub();
instance01.colors.push('yellow');
console.log(instance01.colors);     // ['red', 'blue', 'white', 'yellow']

var instance02 = new Sub();
console.log(instance02.colors);     // ['red', 'blue', 'white', 'yellow']