const express = require('express');
const webpack = require('webpack');
// const path = require('path');
const colors = require( "colors");

const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

const isDev = process.env.NODE_ENV === 'development' ? true : false;
const webpackConfig = require(isDev ? './dev.js' : './build.js');
const compiler = webpack(webpackConfig);
const app = express();

const log = text => {
    console.log(colors.rainbow(text));
}

if (isDev) {
    // 开发环境下开启Node服务器
    const port = process.env.PORT || 3000;

    log('----------------------------building for dev---------------------------------\n');
    log('本地服务器地址为 localhost:' + port);

    app.use(webpackDevMiddleware(compiler, { stats: webpackConfig.stats }));
    app.use(webpackHotMiddleware(compiler));
    app.listen(port);
} else {
    /**
     * 生产环境执行编译并进行错误处理
     * */
    log('------------------------------building for prod-------------------------------\n');
    compiler.run((err, stats) => {
        if (err) {
            // 检查致命错误
            console.log('webpack打包出现严重错误⤵️');
            console.error(err.stack || err);

            if (err.details) {
                console.error(err.details);
            }

            return;
        }

        const info = stats.toJson();

        if (stats.hasErrors()) {
            // 检查编译期是否有错误
            console.log('❗️ ERROR: Webpack打包时遇到以下错误⤵️');
            console.error(info.errors);
        } else if (stats.hasWarnings()) {
            // 检查编译期是否有警告
            console.log('❕ WARNING: Webpack打包时出现以下警告⤵️');
            console.warn(info.warnings);
        } else {
            console.log('✅ Webpack打包完成！');
        }
    });
}
