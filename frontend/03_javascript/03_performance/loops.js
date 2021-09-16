/**
 * 循环优化
 */
let obj = {};
let process = (item) => { item++; };
let array = [];

 // 1、for-in 优化
 let props = ['prop1', 'prop2'];    // 只遍历指定的属性
 let i = 0;
 let len = props.length;  // 缓存对象成员

 while (i < len) {
    process(obj[props[i]]);
 }


 // 2、倒序循环 - 减少了每次循环的条件判断（i < array.length）
 function reverseEach(array, process) {
    for (let i = array.length; i--;) {
        process(array[i]);
     }
 }

 // 3、达夫设备 - 余数处理 和 主循环
 function duffsDevice(array, process) {
    let len = array.length;
    let iterations = Math.floor(len / 8);
    let remainder = len % 8;

    // 处理余数 - 倒序
    while (remainder) {
        process(array[--remainder]);
    }
    
    // 处理主循环
    while (iterations) {
        process(array[--len]);
        process(array[--len]);
        process(array[--len]);
        process(array[--len]);
        process(array[--len]);
        process(array[--len]);
        process(array[--len]);
        process(array[--len]);
        iterations--;
    }
 }

 // 基于函数的迭代 - forEach
 

 // 比较性能 正序循环、倒序循环、forEach循环、达夫模式

 let arr = Array(500).fill(1);
 function addItem(item) {
    item += 1;
 }

 function comparePerformance(arr) {
     // 正序
    console.time('normal');
    for (var i = 0, len = arr.length; i < len; i++) {
        addItem(arr[i]);
    }
    console.timeEnd('normal');

    // 倒序
    console.time('reverse');
    for (var i = arr.length; i--;) {
        addItem(arr[i]);
    }
    console.timeEnd('reverse');

    // forEach循环
    console.time('foreach');
    arr.forEach((item) => {
        addItem(item);
    });
    console.timeEnd('foreach');

    // 达夫模式
    console.time('duff');
    duffsDevice(arr, addItem);
    console.timeEnd('duff');
 }