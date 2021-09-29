
const webpack = require('webpack');
const path = require('path');

// plugins
const HookPlugin = require('./plugins/01_hook_plugin');

const compiler = webpack({
    entry: {
        main: path.resolve(__dirname, './assest/src/test.js'),
    },
    output: {
        path: path.resolve(__dirname, './assest/dist'),
        filename: '[name].bundle.js'
    },
    mode: 'development',
    plugins: [
        new HookPlugin()
    ],
    // watch: true,
}, (err, stats) => {
    if (err || stats.hasErrors()) {
        console.log('Build Failed!');
    }
});