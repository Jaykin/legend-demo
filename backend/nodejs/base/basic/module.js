// 模块系统

// console.log(require.main == module); // true
// console.log(require.main.filename);
// console.log(require.resolve('./timer')); // 解析模块的绝对路径


// 循环依赖
const a = require('./modules/moduleA.js');
const b = require('./modules/moduleB.js');
console.log('在 main 中，a.done=%j，b.done=%j', a.done, b.done);
    // moduleB 开始
    // 在 b 中，a.done = undefined
    // moduleB 结束
    // moduleA 开始
    // 在 a 中，b.done = true
    // moduleA 结束
    // 在 main 中，a.done=true，b.done=true