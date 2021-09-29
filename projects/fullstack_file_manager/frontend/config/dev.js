const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./base');

let config = {
    entry: {
        lib: ['react', 'react-dom', 'jquery', 'webuploader', 'webpack-hot-middleware/client']
    },

    output:{
        filename: 'bundle.js'
    },

    devtool: "cheap-eval-source-map",

    plugins:[
        new webpack.HotModuleReplacementPlugin(),                    // 启用HMR
        new webpack.optimize.CommonsChunkPlugin({ name: 'lib', filename: 'lib.js' }),
        new HtmlWebpackPlugin({
            favicon: 'src/assets/images/favicon.ico',
            template: 'src/index.html'
        })
    ]
}

module.exports = webpackMerge(baseConfig, config);
