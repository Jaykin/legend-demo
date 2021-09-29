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
    module: {
        noParse: '',
        rules: [
            {
                // Rule 条件(condition)
                test: '',
                include: '',
                exclude: '',
                issuer: '',

                // Rule 结果(result)
                use: [
                    // UseEntry
                    {
                        loader: 'xxx',
                        options: {

                        }
                    }
                ],

                // Rule 嵌套(nested)
                oneOf: [{
                    resourceQuery: /inline/,
                    use: 'file-loader'
                }]
            }
        ]
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