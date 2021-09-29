const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        'react-hot-loader/patch',
        // activate HMR for React
        'webpack-dev-server/client?http://192.168.3.103:8888',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        './src/index.js'
        // the entry point of our app
    ],
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist'),
        publicPath: '/'
        // necessary for HMR to know where to load the hot update chunks
    },
    context: resolve(__dirname, 'src'),
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        // 在服务端开启HMR功能
        contentBase: resolve(__dirname, 'dist'),
        // match the output path
        publicPath: '/',
        // match the output `publicPath`
        host: '192.168.3.103',
        port: 8888
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    'babel-loader',
                ],
                exclude: /node_modules/
            }
        ],
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // 全局开启HMR功能
        new webpack.NamedModulesPlugin(),
        // 当HMR更新时在浏览器的控制台打印更加可读的模块名称
    ],
};