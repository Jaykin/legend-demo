/*
* Node API
* */
const webpack = require('webpack');
const path = require('path');

const compiler = webpack({
    entry: path.resolve(__dirname, '../assest/src/01_node.js'),
    output: {
        path: path.resolve(__dirname, '../assest/dist'),
        filename: '01_node.bundle.js'
    },
    mode: 'development',
}, (err, stats) => {
    // 启动构建 - 方式一：传入回调函数
    if (err) {
        // 错误一：致命的配置错误
        console.error(err.stack || err);
        if (err.details) {
            console.error(err.details);
        }
        return;
    }
    
    const info = stats.toJson();

    if (stats.hasErrors()) {
        // 错误二：编译错误
        console.error(info.errors);
        return;
    }

    if (stats.hasWarnings()) {
        // 错误三：编译警告
        console.warn(info.warnings);
        return;
    }

    console.log('Build Complete.');
});

// 启动构建 - 方式二：手动调用 run（不支持多个并发编译）
// compiler.run((err, stats) => {
//     console.log('compiling!');
// });

// 启动构建 - 方式三：手动调用 watch（不支持多个并发编译）
// const watching = compiler.watch({
    // watchOptions https://www.webpackjs.com/configuration/watch/#watchoptions
// }, (err, stats) => {
//     console.log('compiling!');
// });


