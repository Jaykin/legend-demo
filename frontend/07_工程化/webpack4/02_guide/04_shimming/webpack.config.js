const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dist = path.resolve(__dirname, 'dist');

module.exports = {
    entry: {
        global: path.resolve(__dirname, './src/globals.js'),
        main: path.resolve(__dirname, './src/index.js')
    },
    output: {
        filename: '[name].bundle.js',
        path: dist
    },
    mode: 'development',
    devServer: {
        contentBase: dist
    },
    module: {
        rules: [
            // {
            //     test: /[\\/]node_modules[\\/]/,
            //     sideEffects: false,                  // TODO tree shaking 未成功
            // },
            // 细粒度 shimming，保证在非浏览器环境下，覆写 this
            {
                test: path.resolve(__dirname, '/src/index.js'),
                use: 'imports-loader?this=>window',
            },
            // 全局 exports
            {
                test: path.resolve(__dirname, './src/globals.js'),
                use: 'exports-loader?file,parse=helpers.parse'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Shimming',
        }),
        new webpack.ProvidePlugin({
            // _: 'lodash'
            _join: ['lodash', 'join']
        }),
    ]
};