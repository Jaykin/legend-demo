const path = require('path');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, './dist'),
        filename: "index.js"
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: [
                        "@babel/preset-env", 
                        [
                            "@babel/preset-react",
                            {
                                pragma: "ToyReact.createElement" // default pragma is React.createElement
                            }
                        ]
                    ]
                }
            }
        ]
    }
}