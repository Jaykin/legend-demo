
const webpack = require('webpack');
const path = require('path');

const merge = require('webpack-merge');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = {
    entry: {
        main: path.resolve(__dirname, './assest/src/index.js'),
        // txt: path.resolve(__dirname, './assest/src/test.txt'),
        // css: path.resolve(__dirname, './assest/src/style/a.css'),
    },
    output: {
        path: path.resolve(__dirname, './assest/dist'),
        filename: '[name].bundle.js'
    },
    resolveLoader: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'loaders')
        ]
    },
    mode: 'development',
    plugins: [
        new CleanWebpackPlugin()
    ],
}
const config1 = merge(baseConfig, {
    module: {
        rules: [
            {
                test: /\.txt$/,
                use: [{
                    loader: '03_txt_loader',
                    options: {
                        name: 'Jay'
                    }
                }]
            }, {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                }, 'css-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './assest/src/index.html')
        })
    ]
});
const config2 = merge.strategy({
    'resolveLoader.modules': 'replace'
})(baseConfig, {
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: '01_sync_loader',
                options: {
                    a: 1
                }
            }, {
                loader: '02_async_loader',
                options: {
                    repeat: 2
                }
            }],
        }, {
            test: /\.css$/,
            use: [
                'style-loader?a=1', 
                'css-loader?b=2'
            ]
        }],
    },
    resolveLoader: {
        modules: [path.resolve(__dirname, 'loaders')]
    },
});

// 启动编译
const compiler = webpack(config2, (err, stats) => {
    if (err || stats.hasErrors()) {
        console.log('Build Failed!', err && err.stack || stats.toJson().errors);
    }
});

console.log(compiler);