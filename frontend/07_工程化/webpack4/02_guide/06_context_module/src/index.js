// 自动创建上下文模块
const utilName = 'a';
const moduleA = require(`./utils/${utilName}.js`);
console.dir(moduleA);
moduleA.whoAmI();

// 自定义上下文模块
const cmpCtx = require.context('./components', true, /\.js$/);

console.dir(cmpCtx);
console.log(` %ccontext.id : ${cmpCtx.id}`, 'color: #fff;background: green;');
console.log(` %ccontext.keys : ${cmpCtx.keys()}`, 'color: #fff;background: green;');

// 1、使用上下文获取模块
cmpCtx(cmpCtx.keys()[0]).whoAmI();
// 2、使用 __webpack_require__ 获取模块
const cmpPath = cmpCtx.resolve(cmpCtx.keys()[0]);
console.log(cmpPath);
__webpack_require__(cmpPath).whoAmI();
