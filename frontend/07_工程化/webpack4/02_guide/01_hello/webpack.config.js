/**
 * 基础使用
*/
const path = require('path');
const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        app: path.resolve(__dirname, './src/index.js'),
        // another: path.resolve(__dirname, './src/another-module.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash:8].js',
        chunkFilename: '[name].[contenthash:8].js',  // 设置非入口 chunk 的名称
    },

    // 开发环境搭建
    // devtool: 'inline-source-map',   // 源码映射
    // watch: true,    // watch 模式，检测更新后自动编译
    devServer: {
        contentBase: './dist',
        open: true,    // 自动打开浏览器
        // hot: true,      // 开启 HMR，在试图重新加载整个页面前，会尝试使用 HMR 来更新
    },

    // mode: 'production',  // 可启用 SideEffectsFlagPlugin、UglifyJsPlugin 等插件，才能清除 dead-code
    mode: 'none',
    module: {
        // 忽略 lib，提高构建性能
        // noParse: /jquery|lodash/,
        rules: [{
            // 加载 css
            test: /\.css$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // publicPath: '',
                        hmr: process.env.NODE_ENV === 'development',    // 启用 HMR
                    }
                },
                'css-loader'
            ]
        }, {
            // 加载图片
            test:  /\.(png|svg|jpg|gif)$/,
            use: [
                {
                    loader: 'file-loader',  // 处理文件引用，并返回文件的 url
                    options: {
                        name: '[name].[ext]'
                    }
                },
                // 'image-webpack-loader', // 图片压缩优化
                // 'url-loader',   // 在文件低于指定大小时，返回一个 DataUrl
            ]
        }, {
            // 加载字体
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }
            ]
        }, {
            // 加载数据 - csv
            test: /\.(csv|tsv)$/,
            use: [
                'csv-loader'
            ]
        }, {
            // 加载数据 - xml
            test: /\.xml$/,
            use: [
                'xml-loader'
            ]
        }, {
            // 对指定路径进行 tree shaking
            include: path.resolve(__dirname, './src/math.js'),
            sideEffects: false,
        }]
    },
    plugins: [
        // 清除 output 目录
        new CleanWebpackPlugin(),
        // 定制模板
        new HtmlWebpackPlugin({
            title: 'Guide'
        }),
        // 输出 manifest
        new ManifestPlugin(),
        // HMR
        // new webpack.NamedModulesPlugin(),   // 会在 console 中输出更新的模块的相对路径（默认是输出 id）
        // new webpack.HotModuleReplacementPlugin(),
        // tree shaking
        // new webpack.optimize.SideEffectsFlagPlugin(),   // 打副作用标记
        // css splitting
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash:8].css',
            chunkFilename: 'style.[contenthash:8].css',
            ignoreOrder: false,     // Enable to remove warnings about conflicting order
        }),
    ],
    // code splitting
    optimization: {
        // 分离公共依赖
        splitChunks: {
            cacheGroups: {
                // 分离第三方库
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
                // 分离公共业务代码
                common: {
                    chunks: 'all',
                    minSize: 0,
                    minChunks: 2,
                    name: 'common'
                }
            }
            // chunks: 'all',     // 指定 chunk 类型，或用函数过滤
            // minSize: 0,        // 指定最小分离的尺寸，超过这个大小才会分离 chunk，默认 30000b 
            // automaticNameDelimiter: '_',
            // name: true,         // 指定分离的 chunk 名称
        },
        // 分离 webpack runtime 代码
        runtimeChunk: 'single',
        // 指定模块标识符 module.id 的算法
        moduleIds: 'hashed',
    },
}