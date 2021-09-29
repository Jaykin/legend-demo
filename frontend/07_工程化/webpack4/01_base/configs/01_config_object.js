/**
 * 配置对象
 * 1、多语言
 * 2、多类型
 *      - 单个 object
 *      - 多个 object
 *      - 单个 function
 *      - 多个 function（v3.1.0+）
 *      - promise
 */
const path = require('path');

let entryPath = path.resolve(__dirname, './entry.js');
let outputPath = path.resolve(__dirname, './dist');
let outputFileName = 'output.js';

/** 多类型 - 单个 object **/
let singleConfigObject = {
    entry: entryPath,
    output: {
        path: outputPath,
        filename: outputFileName
    },
    mode: 'development'
}

/** 多类型 - 多个 object **/
let multiConfigObject = [
    // 1、输出一个变量
    {
        entry: entryPath,
        output: {
            path: outputPath,
            filename: 'output-var.js',
            libraryTarget: 'var'
        },
        mode: 'development'
    },
    // 2、
    {
        entry: entryPath,
        output: {
            path: outputPath,
            filename: 'output-assign.js',
            libraryTarget: 'assign'
        },
        mode: 'development'
    },
    // 3、
    {
        entry: entryPath,
        output: {
            path: outputPath,
            filename: 'output-this.js',
            libraryTarget: 'this'
        },
        mode: 'development'
    },
    // 4、
    {
        entry: entryPath,
        output: {
            path: __dirname,
            filename: 'output-window.js',
            libraryTarget: 'window'
        },
        mode: 'development'
    },
    // 5、
    {
        entry: entryPath,
        output: {
            path: outputPath,
            filename: 'output-global.js',
            libraryTarget: 'global'
        },
        mode: 'development'
    },
    // 6、输出 amd 模块
    {
        entry: entryPath,
        output: {
            path: outputPath,
            filename: 'output-amd.js',
            libraryTarget: 'amd'
        },
        mode: 'development'
    },
    // 7、输出 commonjs 模块
    {
        entry: entryPath,
        output: {
            path: outputPath,
            filename: 'output-commonjs.js',
            libraryTarget: 'commonjs'
        },
        mode: 'development'
    },
    // 8、输出 commonjs2 模块
    {
        entry: entryPath,
        output: {
            path: outputPath,
            filename: 'output-commonjs2.js',
            libraryTarget: 'commonjs2'
        },
        mode: 'development'
    }
]

/** 多类型 - 单个 function **/
let sigleConfigFunction = function (env, argv) {
    // 返回单个配置对象 或 多个配置对象
    return [{
        entry: entryPath,
        output: {
            path: outputPath,
            filename: 'output-1.js'
        },
        mode: env && env.production ? 'production' : 'development'
    }, {
        entry: entryPath,
        output: {
            path: outputPath,
            filename: 'output-2.js'
        },
        mode: env && env.production ? 'production' : 'development'
    }];
}

/** 多类型 - 多个 function（v3.1.0+） **/
let multiConfigFunction = [
    function (env, argv) {
        return {
            entry: entryPath,
            output: {
                path: outputPath,
                filename: 'output-1.js'
            }
        };
    },
    function (env, argv) {
        return {
            entry: entryPath,
            output: {
                path: outputPath,
                filename: 'output-2.js'
            }
        };
    }
]

/** 多类型 - promise **/
let configPromise = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve 配置对象
            resolve({
                entry: 'xxx'
            });
        }, 3000);
    });
}

module.exports = singleConfigObject;