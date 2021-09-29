/**
 * 控制器
*/
const fs = require('fs');

/**
 * 添加路由
*/
function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

/**
 * 添加控制器
*/
function addControllers(router, dir) {
    var files = fs.readdirSync(`${__dirname}/${dir}`);
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    for (var f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require(`${__dirname}/${dir}/${f}`);
        addMapping(router, mapping);
    }
}

/**
 * 统一输出
*/
module.exports = function (dir) {
    const controllersDir = dir || 'controllers';
    const router = require('koa-router')();

    addControllers(router, controllersDir);
    return router.routes();
}