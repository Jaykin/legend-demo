/*
* 寄生组合式继承
* */
        // 超类型
function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'blue'];
}
SuperType.prototype.sayName = function () {
    alert(this.name);
}

        // 子类型
function SubType(name, age) {
        // 继承超类型实例属性
    SuperType.call(this, name);
    this.age = age;
}
        // 继承超类型的原型属性
SubType.prototype = inheritPrototype(SubType, SuperType);
        // 定义子类型原型方法
SubType.prototype.sayAge = function () {
    alert(this.age);
}

        // 定义函数实现原型继承
function inheritPrototype(subType, superType) {
    var subPrototype = Object.create(superType.prototype);
    subPrototype.constructor = subType;
    return subPrototype;
}

var instance01 = new SubType('Jay', 24);
console.dir(instance01);