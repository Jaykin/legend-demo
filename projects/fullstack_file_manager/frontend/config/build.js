import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpackMerge from 'webpack-merge';

import baseConfig from './base';

let config = {
    entry: {
        lib: ['./node_modules/react', './node_modules/react-dom', './src/util/jquery.js', './src/util/webuploader.js']
    },

    output: {
        filename: 'js/[name]-[hash].js'
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin('lib','js/[name]-[hash].js'),
        new HtmlWebpackPlugin({
            favicon:'./src/assets/images/favicon.ico',
            template:'./src/index.html',
            minify:{
                collapseBooleanAttributes:true,
                collapseWhitespace:true,
                removeComments:true,
                minifyCSS:true,
                minifyJS:true
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: false
        })
    ]
}

export default webpackMerge(baseConfig, config);
