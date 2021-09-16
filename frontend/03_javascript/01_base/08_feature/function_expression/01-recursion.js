/*
* 递归
* JS 运行环境的调用栈均有大小限制，所以递归的次数会被此限制
* */
    // 1
function factorial(num){
    if (num <= 1){
        return 1;
    } else {
        return num * factorial(num-1);
    }
}

var anthorFactorial = factorial;
factorial = null;
console.log(anthorFactorial(10));        // 会报错！因为factorial已经不是一个函数了


// 2
function factorial(num){
    if (num <= 1){
        return 1;
    } else {
        return num * arguments.callee(num-1);
    }
}

var anthorFactorial = factorial;
factorial = null;
console.log(anthorFactorial(10));


// 3 有名字的函数表达式
var factorial = function foo(num) {
    'use strict'
    if (num <= 1){
        return 1;
    } else {
        return num * foo(num-1);
        //console.dir(foo);
    }
}

var anthorFactorial = factorial;
//console.dir(foo);       // 报错：foo未定义
factorial = null;
console.log(anthorFactorial(10));
