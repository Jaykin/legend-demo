/**
 * 数据绑定
*/

function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * 01、数据劫持（Getter/Setter） Vue
 * - 监听对象变动
 * - 监听数组变动
*/

/**
 * 01_1、监听对象变动
 * */ 
function Observer(value) {
    this.value = value;
    this.walk(value);
}

Observer.prototype.walk = function (value) {
    var propVal;

    for (var prop in value) {
        propVal = value[prop];
        this.defineProp(value, prop, propVal);
        isPlainObject(propVal) && this.walk(propVal);
    }
}

// 定义对象属性的getter/setter
Observer.prototype.defineProp = function (obj, prop, val) {
    var descriptor = Object.getOwnPropertyDescriptor(obj, prop),
        getter,
        setter;

    // 不可配置属性
    if (descriptor && descriptor.configurable === false) return;    
    
    // 保存对象属性预先定义的getter/setter
    getter = descriptor && descriptor.get;
    setter = descriptor && descriptor.set;

    // 定义对象属性的getter/setter
    Object.defineProperty(obj, prop, {
        enumerable: true,
        configurable: true,
        get: function () {
            console.log('访问：' + prop);
            return getter ? getter.call(obj) : val;
        },
        set: function (newVal) {
            var value = getter ? getter.call(obj) : val;

            if (newVal === value) return;

            if (setter) {
                setter.call(obj, newVal)
            } else {
                val = newVal;
            }

            console.log('更新：' + prop + ' = ' + newVal);
        }        
    })
}


// 创建数据观察者实例
function observer(value) {
    if (!value || !isPlainObject(value)) return;

    return new Observer(value);
}

var data = {
    user: {
        name: 'Jay',
        age: 18
    },
    address: {
        city: 'GZ'
    }
}

// var dataObserver = observer(data);

// console.log(data.user.name);
// data.user.name = 'Vivian';


/**
 * 01_2、监听数组变动
*/
var arrayProto = Array.prototype;
var arrayObj = Object.create(arrayProto);

function defineProp(obj, prop, val, enumerable) {
    Object.defineProperty(obj, prop, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    })
}

;[
    'push',
    'pop',
    'shift',
    'unshift',
    'sort',
    'reverse',
    'splice'
].forEach(function (method) {
    var original = arrayProto[method];

    defineProp(arrayObj, method, function mutator() {
        var args = Array.prototype.slice.call(arguments);

        console.log('数组有变动！');
        return original.apply(this, args);
    })
})

var skills = ['JavaScript', 'NodeJS', 'HTML5'];

skills.__proto__ = arrayObj;

skills.push('Java');
skills.pop();



