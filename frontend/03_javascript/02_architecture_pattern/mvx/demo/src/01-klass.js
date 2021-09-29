
// 类：01 将实例化封装到原型上去

var Klass = function () {
    this.init.apply(this, arguments);
}

Klass.prototype.init = function (name, age) {
    // 初始化Klass实例
    this.name = name;
    this.age = age;
}

var person = new Klass('jay', 18);


// 类： 02 简便原型

Klass.fn = Klass.prototype;

Klass.fn.getName = function () {
    return this.name;
}


// 类：03 区分类的静态属性 和 类的原型属性
    /**
     * Class 用来创建类
     *
     * */
var Class = function (parent) {
    var klass = function () {
    // 01 封装实例化
        this.init.apply(this, argument);
    }

    // 04 添加继承：只继承原型上的属性
    if (parent) {
        var SubClass = function () {};
        SubClass.prototype = parent.prototype;
        klass.prototype = new SubClass();
    }

    // 02 简便原型对象的引用
    klass.fn = klass.prototype;
    klass.fn.init = function (name, age) {
        this.name = name;
        this.age = age;
    }
    // 03 区别添加类的静态属性 和 类的原型属性
    klass.extend = function (obj) {
        // 添加静态属性（支持回调）
        var extendedCallback = obj.extended;

        for (var k in obj) {
            klass[k] = obj[k];
        }

        extendedCallback && extendedCallback(klass);
    }
    klass.include = function (obj) {
        // 添加原型属性（支持回调）
        var includedCallback = obj.included;

        for (var k in obj) {
            klass.fn[k] = obj[k];
        }

        includedCallback && includedCallback(klass);
    }

    // 05 控制作用域：即保证this的指向
    klass.proxy = function (fn) {
        var self = this;

        return function () {
            return fn.apply(self, arguments);
        }
    }

    return klass;
}

var Person = new Class();
var person = new Person('Jay', 18);
console.log(person);



