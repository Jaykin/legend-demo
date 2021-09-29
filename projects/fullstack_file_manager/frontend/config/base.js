const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin('common.css');
const extractLESS = new ExtractTextPlugin('less.css');

const getAp = p => path.resolve(__dirname, p);    // 获取绝对路径

let config = {
    entry:{
        app: getAp('../src/index.js')
    },

    output:{
        path: getAp('../dist')        // 必须是一个绝对路径
    },

    resolve: {
        modules: [getAp('../node_modules')],
        alias: {
            'utils': getAp('../src/components/_utils/'),
            'components': getAp('../src/components/')
        }
    },

    stats: {
        assets: false,
        hash: false,
        version: false,
        timings: false,
        colors: true,
        chunks: false,
        chunkModules: false,
        modules: false,
        children: false
    },

    module: {
        rules: [{
            test: /\.jsx?$/,
            include: [getAp('../src')],
            use: 'babel-loader'
        }, {
            test: /\.css$/,
            use: extractCSS.extract('css-loader')
        }, {
            test: /\.less$/,
            use: extractLESS.extract(['css-loader', 'less-loader'])
        }]
    },

    plugins: [
        extractCSS,
        extractLESS,
    ]
}

module.exports = config;
