/**
 * 管理函数的输入，使用闭包来保存实参
 *
 * 1、拆解多参数函数，被拆解的函数最终仍然能获取所有参数被调用 n => (n - m1) + ... + (n - mn)
 *      - 偏应用 
 *      - 柯里化
 * 2、多参数函数强制转为一元函数，被转换的函数仅会使用一个实参 n => 1
 *      - 即只保留一位形参
*/

// ============================ 1、偏应用 ========================================================
// 预设函数参数（左 -> 右）
const partial = (fn, ...presetArgs) => (...laterArgs) => fn(...presetArgs, ...laterArgs)

// 颠倒实参顺序
const reverseArgs = fn => (...args) => fn(...args.reverse())

// 预设函数参数（右 -> 左） 天啦噜，这哪里可读了？？
const partialRight = (fn, ...presetArgs) => reverseArgs(partial(reverseArgs(fn), ...presetArgs.reverse()))


// ============================ 2、柯里化 ========================================================
const curry = (fn, arity = fn.length) =>
    (function nextCurried(prevArgs) {
        return nextArg => {
            const args = prevArgs.concat([nextArg])
            if (args.length < arity) {
                return nextCurried(args)
            } else {
                return fn(...args)
            }
        }
    })([])

const looseCurry = (fn, arity = fn.length) =>
    (function nextCurried(prevArgs) {
        return (...nextArg) => {
            const args = prevArgs.concat(nextArg)
            if (args.length < arity) {
                return nextCurried(args)
            } else {
                return fn(...args)
            }
        }
    })([])

const uncurry = fn => (...args) => {
    let ret = fn
    for (let i = 0; i < args.length; i++) {
        ret = ret[args[i]]
    }

    return ret
}


// ============================ 2、一元函数，将函数转为只接收一个实参的函数 ========================================================
const unary = fn => arg => fn(arg)

// ============================ 3、用来断言 ========================================================
const identity = v => v

const words = "   Now is the time for all...  ".split(/\s|\b/)
words.filter(identity)          // ["Now", "is", "the", "time", "for", "all", "..."]
words.filter(Boolean)          // ["Now", "is", "the", "time", "for", "all", "..."]
