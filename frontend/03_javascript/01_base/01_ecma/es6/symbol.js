/**
 * 背景
 *   - ES5 的对象属性名都是字符串，这容易造成属性名的冲突
 * 
 * Symbol 可用来表示独一无二的值，是一种基本数据类型，不能添加属性，是一种原始值
 * Symbol 值不能与其他类型的值进行运算，会报错
 * 
*/

// ========================================== 1、创建 Symbol 值 ==========================================
const s1 = Symbol()
const s2 = Symbol('s2')     // 参数为字符串
const s3 = Symbol({})       // 参数为对象，会调用对象的 toString 方法转换为字符串

// ========================================== 2、转字符串 ==========================================
s1.toString()   // Symbol()
s2.toString()   // Symbol('s2')
s3.toString()   // Symbol([object Object])
String(s2)      // Symbol('s2')

// ========================================== 3、转布尔值 ==========================================
Boolean(s1)     // true
!s1             // false

// Symbol.prototype.description【ES2019 支持】，用来获取 Symbol 的描述
// s2.description   // s2

// ========================================== 4、定义属性名 ==========================================
// 注意：定义的属性无法被常规方式遍历，但其不是私有属性
cont mySymbol = Symbol('property')
const obj = {
    [mySymbol]() {
        console.log(mySymbol.toString())
    }
}
obj[mySymbol]()     // Symbol('property')

// ========================================== 5、定义常量，可以保证常量的值是绝对不相等的 ==========================================
const log = {
    levels: {
        DEBUG: Symbol('debug'),
        INFO: Symbol('info'),
        WARN: Symbol('warn')
    }
}

// ========================================== 6、消除魔术字符串 ==========================================
// 魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值
// 风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的变量代替
// 其实有时这个变量是什么值无所谓，只要跟其他不一样即可，此时可以使用 Symbol
const shapeType = {
    triangle: Symbol()
}
function getArea(shape, options) {
    let area = 0
    switch(shape) {
        case shapeType.triangle:
            area = .5 * options.width * options.height
            break;
    }
    return area
}
getArea(shapeType.triangle, { width: 100, height: 100 })

// ========================================== 7、遍历属性名 ==========================================
// Symbol 值作为属性名时，该属性不会出现在 for...in...、for...of...、Object.keys()、Object.getOwnPropertyNames()、JSON.stringify() 中
// Object.getOwnPropertySymbols() 可以获取指定对象的所有 Symbol 属性名，返回为数组
const obj1 = {
    [Symbol('a')]: 'Hello',
    [Symbol('b')]: 'World'
}
Object.getOwnPropertySymbols(obj1)      // [Symbol(a), Symbol(b)]

// ========================================== 8、模拟私有属性 ==========================================
// 由于以 Symbol 值作为键名，不会被常规方法遍历得到。我们可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法
let size = Symbol('size')
class Collection {
    constructor() {
        this[size] = 0;
    }

    add(item) {
        this[this[size]] = item;
        this[size]++;
    }

    static sizeOf(instance) {
        return instance[size];
    }
}
let x = new Collection();
Collection.sizeOf(x)        // 0

// ========================================== 9、Symbol.for()/Symbol.keyFor() ==========================================
// Symbol.for(<string>) 接受字符串作为参数，然后再全局搜索搜索有无该参数作为名称的 Symbol 值，有则返回，无则创建并登记在全局环境中供之后搜索（全局登记特性 - 包括 iframe 和 service worker）
// Symbol() 则每次都会创建新的 Symbol 值，且不会登记到全局环境
Symbol.for('for') === Symbol.for('for')     // true
Symbol('for') === Symbol('for')             // false
// Symbol.keyFor(<symbol>) 返回一个已登记的 Symbol 值的 key，未登记的则返回 undefined
Symbol.keyFor(Symbol.for('tt'))     // tt
Symbol.keyFor(Symbol('tt'))     // undefined

// ========================================== 10、Symbol.toStringTag==========================================
// 对象的Symbol.toStringTag属性，指向一个方法
// 在该对象上面调用Object.prototype.toString方法时，如果这个属性存在，它的返回值会出现在toString方法返回的字符串之中，表示对象的类型（即可以定制 [object Object] 的 object 后面的那个字符串）
({[Symbol.toStringTag]: 'Foo'}.toString())  // "[object Foo]"

const obj = {[Symbol.toStringTag]: 'JayObj'}
Object.prototype.toString.call(obj) // "[object Foo]"

// ========================================== 11、单例模式 Singleton ==========================================
const FOO_KEY = Symbol('foo')
const _global = {}

class A {
    constructor() {
        if (_global[FOO_KEY]) {
            return _global[FOO_KEY]
        }

        _global[FOO_KEY] = this
    }
}

(new A()) === (new A()) // true
