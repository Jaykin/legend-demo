/**
* 解构赋值
*/


// 01 数组解构赋值
let [a, [b, c], d] = [1, [2, 3], 4];
console.log(a, b, c, d);                // >>1 2 3 4 

let [e = 'e', f] = [undefined, 2];
console.log(e, f);                      // >>e 2

let [x = 'x', y = x] = [null];          // >>null null
console.log(x, y);                


// 02 对象解构赋值
let { foo, bar, baz } = { foo: 'foo', bay: 'bay', bar: 'bar' };
console.log(foo, bar, baz);             // >>foo bar undefined

let { g: h } = {g: 'g'};
console.log(h);                         // >>g
//console.log(g);                         // >>g is not defined

let obj = {
    p: [
        'hello',
        { yy: 'world' }
    ]
};
let { p: [xx, { yy }] } = obj;
console.log(xx, yy);                    // >>hello world

let array = [1, 2, 3];
                // 这方括号是属性名表达式（用来计算属性名）
let { 0: first, [array.length - 1]: last } = array;
console.log(first, last);               //>>1 3


// 03 字符串解构赋值
const [s1, s2, s3] = 'JAY';
console.log(s1, s2, s3);                //>>J A Y

const { length: strLen } = 'VIVIAN';     
console.log(strLen);                    //>>6


// 04 数值和布尔值的解构赋值
let { toString, toFixed } = 12.33;
console.log(toString === Number.prototype.toString, toFixed === Number.prototype.toFixed);      // >>true true


// 05 函数参数的结构赋值
function add([x, y]) {
    return x + y;
}
console.log(add([1, 2]));         // >>3

let arrT = [[1, 2], [3, 4]].map(([a, b]) => a + b);
console.log(arrT);                // >>[3, 7]  


// 06 用途
    // 变换变量值
let x1 = 1;
let y1 = 2;

[x1, y1] = [y1, x1];
console.log(x1, y1);        // >>2 1

    // 取出函数返回的多个值
function example() {
    return {
        arr: [1, 2, 3],
        object: {
            foo1: 1,
            bar1: 2
        }
    }
}    

let { arr: [a1, b1, c1], object: { foo1, bar1} } = example();
console.log(a1, b1, c1, foo1, bar1);            // >>1 2 3 1 2
