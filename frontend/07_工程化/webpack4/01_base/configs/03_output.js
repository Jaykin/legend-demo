/**
 * 输出
 */
const path = require('path');
const webpack = require('webpack');

let contextDir = path.resolve(__dirname, 'src');
let outputPath = path.resolve(__dirname, './dist');

/** output.libraryTarget **/
let configOptions1 = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    entry: {
        'main1': './entry.js'
    },
    output: {
        path: outputPath,
        filename: '[id].[hash].[name].output.js',
        // hashFunction: 'md5',
        libraryTarget: 'umd',
        library: {
            root: 'MyLib',
            amd: 'my-lib',
            commonjs: 'my-common-lib'
        },
        // library: 'MyLib'
    }
};

// 执行构建
console.log('Building...');
webpack(configOptions1).run((err, stats) => {
    if (err || stats.hasErrors()) {
        console.log(stats);
        return;
    }

    console.log('Build Success!');
});