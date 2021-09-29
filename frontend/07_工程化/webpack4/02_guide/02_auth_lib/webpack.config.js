const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'webpack-numbers.js',
        // 暴露 Library
        libraryTarget: 'umd',   // 指定如何暴露
        library: 'webpackNumbers',    // 指定暴露的变量或属性
    },
    mode: 'none',
    // 外部化 lodash 库，这里定义的依赖称为 peerDependency，用户环境必须存在且可用
    externals: {
        lodash: {
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash',
            root: '_',
        }
    },
};