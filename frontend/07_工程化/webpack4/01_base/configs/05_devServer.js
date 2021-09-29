const path = require('path');
const webpack = require('webpack');

let contextDir = path.resolve(__dirname, 'src');
let outputPath = path.resolve(__dirname, './dist');

let configOptions1 = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    entry: {
        module: './entry.js'
    },
    output: {
        path: outputPath,
        filename: '[name].output.js',
    },
    // devServer
    devServer: {
        
    }
};

// 执行构建
console.log('Building...');
webpack(configOptions1).run((err, stats) => {
    if (err || stats.hasErrors()) {
        console.log(stats);
        return;
    }

    console.log('Build Success!');
});