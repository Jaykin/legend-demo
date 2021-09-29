/**
 * No.1  let 命令
 */
var arr = [];

for (let i = 0; i < 10; i++) {
  arr[i] = function() {
    return i;
  };
}

console.log(arr[4]());

        /**
         * 暂时性死区
         * 
        */
        // 块级作用域
var tmp = "123";

if (true) {
  //tmp = "321";                      // >>ReferenceError: tmp is not defined
  let tmp;
}

        // 全局作用域
var tpm = true;
//console.log(typeof testTmp);        // >>ReferenceError: tmp is not defined
console.log(typeof aaa);            // >>undefined
let testTmp;


/**
 * No.2 块级作用域
 * 
*/
        // IIFE的写法 来构建作用域
(function () {
    var tmp = 'local';
})();        

        // 块级作用域写法
{
    let tmp = 'local';
}        

        // do 表达式  (提案：未支持)
// let x = do {
//     let t = 2;
//     t * t + 1;
// }        

// console.log(x);          // >>5


/**
 * global shim
 * 
*/
    // 方法一
const global = (typeof window !== 'undefined'
    ? window
    : (typeof process === 'object' && typeof require === 'function' && typeof global === 'object')
        ? global
        : this
);

    // 方法二
var getGlobal = function () {
    if (typeof self !== 'undefined') return self;
    if (typeof window !== 'undefined') return window;
    if (typeof global !== 'undefined') return global;
    throw new Error('unable to locate global object!');
}    

    // 方法三 使用system库
require('system.global/shim')();    