// ========================== 替换原生模块 ==========================
// module.exports = {a:1};
// require.cache['path'] = module;
// const path = require('path');
// console.log(path);  // {a:1}


// ========================== require.resolve ==========================
// const mPath = require.resolve('./moduleA.js', {
//     paths: [
//         '/Users/ming/Desktop/workspace/legend-demo/backend/nodejs/base/basic/modules',
//         '/Users/ming/Desktop/workspace/legend-demo/backend/nodejs/base/basic'
//     ]
// });
// console.log(mPath);

// console.log(require.resolve.paths('path'));     // null，原生模块

// console.log(require.resolve.paths('npm'));     // 第三方模块


// ========================== Module 对象 ==========================
const { builtinModules } = require('module');   // 获取内置模块名称列表
console.log(builtinModules);