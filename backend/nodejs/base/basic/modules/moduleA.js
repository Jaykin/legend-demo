const mB = require('./moduleB');

console.log('moduleA 开始');
console.log('在 a 中，b.done = %j', mB.done);
console.log('moduleA 结束');

exports.done = true;