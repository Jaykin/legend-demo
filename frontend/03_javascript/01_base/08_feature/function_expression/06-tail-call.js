/**
 * 尾调用：函数执行的最后一个步骤是返回另一个函数的调用（即在函数调用另一个函数时，本身是否可以被释放）
 * 尾递归：函数尾调用自身
 * 尾递归优化
 *      - 有些编译器/解释器会对尾递归进行优化，释放之前的栈帧
 *      - ES6 标准指出在严格模式下会开启，不过现在支持性较差，需要自己实现优化（循环）
 * https://segmentfault.com/a/1190000014277519
*/

// 查看当前环境支持的最大调用栈
function getMaximumCallStackSize() {
    let i = 0
    function recursiveFn () {
        i++
        recursiveFn()
    }
    try {
        recursiveFn()
    } catch (ex) {
        console.log(`我的最大调用栈 i = ${i} errorMsg = ${ex}`)
    }

    return i
}

// =================================== 尾调用 ===================================

// 非尾调用
function f(x) {
    var a = g(x);
    return a;
}

// 非尾调用
function f1(x) {
    return 3 + g(x);
}

// 尾调用
function f2(x) {
    if (x > 0) {
        return g(x);
    }
    return r(x);
}

// =================================== 尾递归 ===================================

// 普通递归
function sum(n) {
    if (n <= 1) return n;
    return n + sum(n - 1)
}

// 尾递归
function sum1(n, prevSum = 0) {
    if (n <= 1) return n + prevSum;
    return sum1(n - 1, n + prevSum);
}

function sum2(n, prevSum = 0) {
    if (n <= 1) return n + prevSum;
    return sum2.bind(null, n - 1, n + prevSum);
}

// 1、循环优化 - 蹦床函数（trampoline）
function trampoline(f) {
    while (f && typeof f === 'function') {
        f = f();
    }

    return f;
}
// trampoline(sum2(100000))

// 2、尾递归优化
function tco(f) {
    let value;  // 缓存每次调用后的结果
    let accumulated = []; // 缓存每次调用的参数
    let active = false; // 用来阻断递归

    return function accumulator() {
        accumulated.push(arguments); // 每次递归就保存传参，然后遍历传参即可将递归转为循环

        if (!active) {
            active = true; // 启动循环后每次递归就不会跑进来了，会返回 undefined
            while (accumulated.length) {
                value = f.apply(this, accumulated.shift());
            }
            active = false; // 这一步感觉没啥用，active 其实是一次性的
            return value;
        }
    }
}

const sum4 = tco((n, prevSum = 0) => {
    return n <= 1 ? n + prevSum : sum4(n - 1, n + prevSum)
})

sum4(100000)
