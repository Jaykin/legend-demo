/**
 * 入口与上下文
 */
const path = require('path');
const webpack = require('webpack');

let contextDir = path.resolve(__dirname, 'src');
let outputPath = path.resolve(__dirname, './dist');

/** context **/
let configOptions1 = {
    context: path.resolve(__dirname, 'src'),
    entry: './entry.js',
    output: {
        path: outputPath,
        filename: 'output.js'
    },
    mode: 'development'
}

/** 动态入口 **/
let configOptions2 = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    entry() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('./entry.js');
            }, 3000);
        });
    },
    output: {
        path: outputPath,
        filename: 'output2.js'
    },
}

// 执行构建
console.log('Building...');
webpack(configOptions2).run((err, stats) => {
    if (err || stats.hasErrors()) {
        console.log(stats);
        return;
    }

    console.log('Build Success!');
});