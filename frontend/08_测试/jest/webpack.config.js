module.exports = {
    entry: './src/index.js',
    output: {
        filename: './src/bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }]
    }
}
