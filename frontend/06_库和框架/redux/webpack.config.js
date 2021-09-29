/**
 * Created by Administrator on 2017/2/8.
 */
module.exports = {
    entry: './todo-redux/index.js',
    //entry: './subreddit-redux/index.js',
    output: {
        //filename: './subreddit-redux/build/bundle.js'
        filename: './todo-redux/build/bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                "presets": ["es2015","react"]
            }
        }]
    },
    devServer: {
        historyApiFallback: true,
    }
}