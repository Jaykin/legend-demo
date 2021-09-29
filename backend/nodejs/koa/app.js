// dependence
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

// vars
const app = new Koa();                                          // 创建koa应用对象
const isProduction = process.env.NODE_ENV === 'production';     // 环境标识 - 是否正式环境

// 注册中间件 - 记录响应时间
app.use(async (ctx, next) => {
    const start = new Date().getTime();
    await next();
    const ms = new Date().getTime() - start;
    console.log(`Time：${ms}ms`);
});

// 注册中间件 - 处理静态文件请求(仅开发环境使用,正式环境一般有专门的服务器处理-CDN)
if (!isProduction) {
    const staticFiles = require('./static-files');  // 静态文件处理
    app.use(staticFiles('/static/', `${__dirname}/static`));
}

// 注册中间件 - post请求参数解析
app.use(bodyParser());

// 注册中间件 - 集成模板引擎，使得后续中间件可以使用模板引擎的功能
const templating = require('./templating');     // 集成模板引擎
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

// 注册中间件 - 即处理各请求的controller
const controller = require('./controller');     // 控制器
app.use(controller());


// 开启web服务
app.listen(3000);
console.log('koa app started at localhost:3000!');

// 连接数据库
require('./db');
