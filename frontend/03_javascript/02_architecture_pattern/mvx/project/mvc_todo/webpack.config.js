
var path = require('path');

module.exports = {
    entry: './src/index.js',

    output: {
        path: path.join(__dirname, 'src/public'),
        filename: 'mvc.js'
    },

    devServer: {
        contentBase: path.join(__dirname, 'src/public'),
        publicPath: '/',
        port: 8888,
        watchContentBase: true
    }
}