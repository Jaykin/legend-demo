/**
 * 基础概念
*/
const sum = (a, b) => a + b

// ============================== 01、Arity 函数参数数量 ==============================
console.log(sum.length)         // 2

// ============================== 02、Higher-Order Functions 高阶函数 ==============================
const filter = (pred, xs) => {
    const result = []

    xs.forEach((s) => {
        if (pred(s)) {
            result.push(s)
        }
    })

    return result
}
const is = (type) => x => Object(x) instanceof type
filter(is(Number), [0, 1, '2', null])               // [0, 1]

// ============================== 03、Partial Application 偏函数 ==============================
const partial = (fn, ...args) => (...moreArgs) => fn(...args, ...moreArgs)
const add3 = (a, b, c) => a + b + c
const fivePlus = partial(add3, 2, 3)
console.log(fivePlus(4))                            // 9

// 使用 bind 创建偏函数
const add1More = add3.bind(null, 2, 3)
console.log(add1More(4))                            // 9

// ============================== 04、Currying 柯里化 ==============================
const curriedSum = a => b => a + b
console.log(curriedSum(40)(2))                      // 42

const add2 = curriedSum(2)
console.log(add2(10))                               // 12

// 柯里化实现
function curry(fn, ...initArgs) {
    // TODO 注意，fn.length 并不可靠，可增加 arity 作为形参传入
    const arity = fn.length

    return function () {
        let args = [].slice.call(arguments)

        // 组装参数集
        if (initArgs.length) {
            args = initArgs.concat(args)
        }

        // 递归获取参数
        if (args.length < arity) {
            return curry(fn, ...args)
        }

        // 参数获取完，调用原始函数，返回结果
        return fn.apply(null, args)
    }
}

// ============================== 05、Function Composition 函数组合 ==============================
const compose = (f, g) => a => f(g(a))
const add10 = v => v + 10
const mult5 = v => v * 5

const mult5AfterAdd10 = compose(mult5, add10)
console.log(mult5AfterAdd10(2))                     // (2 + 10) * 5 = 60


// ============================== 06、Purity 纯函数 ==============================
// 非纯函数
const greet = () => 'Hi, ' + global.name
// 纯函数
const greet1 = (name) => 'Hi, ' + name


// ============================== 07、Side Effects 副作用 ==============================
let gg
const setGg = () => gg = 'Hi, GG!'
setGg()                                 // 修改了外部环境的变量，产生副作用

const timer = () => new Date()          // 读取可变数据，产生副作用

// ============================== 08、Idempotent 幂等 ==============================
console.log(Math.abs(-10) === Math.abs(Math.abs(-10)))      // true

// ============================== 09、Point-Free Style ==============================
const map = fn => list => list.map(fn)
const add = a => b => a + b

// 非 point-free
const incrementAll = (list) => map(add(1))(list)
// point-free
const incrementAll2 = map(add(1))


// ============================== 10、断言（Assert/Predicate） ==============================
const predicate = a => a > 2
[1, 2, 3, 4].filter(predicate)      // [3, 4]


// ============================== 11、Pointed Functor ==============================
// 将单值转为函子
Array.of(1, 2)                         // [1, 2]
// 将复杂值转为函子
Array.from(new Set([1, 2, 3]))          // [1, 2, 3]

// ============================== 12、Lift ==============================
const ap = (fns, arr) => {
    let result = []
    fns.forEach(fn => {
        arr.forEach(i => result.push(fn(i)))
    })
    return result
}

const lift = fn => (...args) => {
    let result
    // 1、curried fn
    let curriedFn = curry(fn)

    result = [curriedFn]
    // 2、ap
    args.forEach((arg) => {
        result = ap(result, arg)
    })

    return result
}

const arg1 = [1, 2]
const arg1 = [3, 4, 5]
lift(n => n * 2)(arg1)                  // [2, 4] 
lift((a, b) => a + b)(arg1, arg2)       // [4, 5, 6, 5, 6, 7]

// ============================== 13、 ==============================
