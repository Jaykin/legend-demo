const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 构建时的统计信息
const stats = 'errors-only';

module.exports = {
    name: '07_advanced_entry_config',
    context: path.resolve(__dirname, './src'),
    entry: {
        home: ['./home/home.js', './home/home.css'],
        account: ['./account/account.js', './account/account.css'],
    },
    output: {
        path: path.resolve(__dirname, './dist'),    // 对应一个绝对路径
        filename: '[name]/[name].js',
        chunkFilename: '[name]/[name].js',      // 非入口 entry
    },
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        index: 'home/home.html',
        open: true,
        stats,
    },

    devtool: false,
    mode: 'development',
    stats,

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',
                    'css-loader',
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        // home 页
        new HtmlWebpackPlugin({
            title: 'Home',
            chunks: ['home', 'runtime'],
            filename: 'home/home.html',
        }),
        // account 页
        new HtmlWebpackPlugin({
            title: 'Account',
            chunks: ['account', 'runtime'],
            filename: 'account/account.html',
        }),
        // 处理 css 分离
        new MiniCssExtractPlugin({
            filename: '[name]/[name].css',
        }),
    ],
    optimization: {
        runtimeChunk: {
            name: 'runtime',
        }
    },
}