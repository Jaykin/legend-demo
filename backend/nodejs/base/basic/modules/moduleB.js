const mA = require('./moduleA');

console.log('moduleB 开始');
console.log('在 b 中，a.done = %j', mA.done);
console.log('moduleB 结束');

exports.done = true;