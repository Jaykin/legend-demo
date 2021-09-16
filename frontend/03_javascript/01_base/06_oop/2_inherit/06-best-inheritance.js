
/**
 * 最全继承方式
 * 具体的继承方式根据场景使用即可
*/

// 创建原型对象
function createPrototype(subClass, superClass) {
    var subProto = Object.create(superClass.prototype);

    subProto.constructor = subClass;

    return subProto;
}

/**
 * 父类
*/
function SuperClass(name, age) {
    this.name = name || 'Jay';
    this.age = age || 18;
}

SuperClass.prototype.sayHello = function () {
    console.log('Hello，' + this.name + '！Welcome...');
}


/**
 * 子类
*/
function SubClass(name, age, job) {
    SuperClass.apply(this, [name, age]);

    this.job = job || 'nothing';
}

SubClass.prototype = createPrototype(SubClass, SuperClass);
SubClass.prototype.findJob = function () {
    return this.job;
}

/**
 * 子类的子类
*/
function SubSubClass(name, age, job, life) {
    SubClass.apply(this, [name, age, job]);

    this.life = life || 'game';
}

SubSubClass.prototype = createPrototype(SubSubClass, SubClass);
SubSubClass.prototype.enjoyLife = function () {
    console.log('My Life Is So Beauty!');
}


/**
 * 实例化
 * */ 

 // 父类实例化
 var super01 = new SuperClass('Vivian', 18);
 console.log(super01.sayHello());
 console.table(super01);

 // 子类实例化
 var sub01 = new SubClass('Jay', 25, 'Fronter');
 console.log(sub01.sayHello());
 console.log(sub01.findJob());
 console.table(sub01);

 // 子类的子类实例化
 var subSub01 = new SubSubClass('Test', 30, 'FullStack', 'Family');
 console.log(subSub01.sayHello());
 console.log(subSub01.findJob());
 console.log(subSub01.enjoyLife());
 console.table(subSub01);
