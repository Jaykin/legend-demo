/** 
 * 创建类的工具
*/

// 修改函数执行时的this指向
function proxy(func) {
    const _this = this;
    return function () {
        return func.apply(_this, arguments);
    }
}

// 类共享的东西
const classShared = {
    _static: {             // 静态共享 
        proxy: proxy
    },          
    _proto: {             // 原型共享  
        // 类进行实例化
        init: function () {},
        // 修改函数执行的this指向
        proxy: proxy
    }                     
};

// 用来创建类的方法
function Klass(parent) {
    const kclass = function () {
        // 实例化方法
        this.init.apply(this, arguments);
    }

    // kclass继承
    if (parent) {
        // 引入subClass是为了避免继承到parent的实例属性
        const subClass = function () {};
        subClass.prototype = parent.prototype;  
        kclass.prototype = new subClass();
    }

    // 为类添加公共属性
    Object.assign(kclass, classShared._static);
    Object.assign(kclass.prototype, classShared._proto);

    // 给类动态添加静态方法
    kclass.extend = function (opts) {
        Object.assign(kclass, opts);
    }

    // 给类动态添加实例方法
    kclass.include = function (opts) {
        Object.assign(kclass.prototype, opts);
    }
    return kclass;
}


// example
const Person = Klass();

Person.CONSTANT = {
    defName: 'Jay',
    defAge: '18',
    defJob: 'web'
};
Person.prototype.init = function (options) {
    // 对实例做初始化
    const constant = Person.CONSTANT;
    this.name = options.name || constant.defName;
    this.age = options.age || constant.defAge;
    this.job = options.job || constant.defJob;
}

const person = new Person({
    name: 'vivian',
    age: '16',
    job: 'wife'
});
console.log(person);