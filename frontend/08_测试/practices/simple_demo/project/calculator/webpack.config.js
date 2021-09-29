const path = require('path');
const baseConfig = {
    entry: './lib/app.js',
    
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [{
            test: /\.jsx?$/,
            include: [path.resolve(__dirname, 'lib')],
            use: 'babel-loader'
        }]
    }
}
let config = baseConfig;

if (process.env.NODE_ENV === "development") {
    config = Object.assign(baseConfig, {
        devServer: {
            contentBase: path.resolve(__dirname, 'public'),
            publicPath: '/',
            host: '0.0.0.0',
            port: 8888,
            watchContentBase: true
        },
    
        devtool: 'sourcemap'
    })
}

module.exports = config;