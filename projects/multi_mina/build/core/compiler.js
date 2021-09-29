/**
 * 单平台编译
*/
const path = require('path');
const gulp = require('gulp');
const through = require('through2');
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
// plugins
const jsonFormat = require('gulp-json-format');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const del = require('del');
const ifdefPlugin = require('./pulgins/ifdefPlugin');
const transformExtPlugin = require('./pulgins/transformExtPlugin');
const transformGlobalPlugin = require('./pulgins/transformGlobalPlugin');
const transformTmplPlugin = require('./pulgins/transformTmplPlugin');
const transformStylePlugin = require('./pulgins/transformStylePlugin');
const apiProxyPlugin = require('./pulgins/apiProxyPlugin');
// babel
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const t = require('@babel/types');

const { deepAssign, cloneJsonObj, purgeCaches } = require('./util');
const { namespace } = require('./constant');

class Compiler {
    constructor(options) {
        this.config = require(`../platforms/${options.platform}/compile.config.js`); // 当前编译配置
        this.sourcePath = options.sourcePath;          // 当前项目的绝对路径
        this.distFolder = options.distFolder;          // 打包后的目录
        this.platform = options.platform;              // 当前打包平台
        this.srcPlatform = options.srcPlatform;        // 源平台（暂时只支持 wx）
        this.srcConfig = require(`../platforms/${options.srcPlatform}/compile.config.js`); // 源平台编译配置
        this.file = null;                              // 当前编译的 file
        this.fileType = '';
        this.createCompileTask();
    }

    // 创建 gulp 编译任务
    createCompileTask() {
        const clean = (cb) => this.cleanFile(cb);
        const script = () => this.transformScript();
        const xml = () => this.transformTmpl();
        const style = () => this.transformStyle();
        const json = () => this.transformJson();
        const image = () => this.transformImage();
        // const geRuntimeConfig = () => this.genarateRuntimeConfig();
        const geApiProxy = () => this.genarateApiProxy();
        // 修改 taskName
        clean.displayName = `${this.platform}:clean`;
        script.displayName = `${this.platform}:script`;
        xml.displayName = `${this.platform}:xml`;
        style.displayName = `${this.platform}:style`;
        json.displayName = `${this.platform}:json`;
        image.displayName = `${this.platform}:image`;
        // geRuntimeConfig.displayName = `${this.platform}:ge-runtime-config`;
        geApiProxy.displayName = `${this.platform}:ge-api-proxy`;

        this.runner = gulp.series(
            clean,
            gulp.parallel(
                script,
                xml,
                style,
                json,
                image,
            ),
            // geRuntimeConfig,
            geApiProxy,
        );
    }

    // 监听源文件变动，针对文件重新编译，减少编译时间
    onSourceChanged(event, path, done) {
        if (event === 'add' || event === 'change') {
            // 新增文件、修改文件
            const destPath = path.replace(/.*\/weixin_small_program\//, '');
            const lastIndex = path.lastIndexOf('.');
            const suffix = path.substring(lastIndex + 1);
            if (['js', 'wxs'].indexOf(suffix) > -1) {
                return this.transformScript(destPath);
            } else if (suffix === 'wxml') {
                return this.transformTmpl(destPath);
            } else if (suffix === 'json') {
                return this.transformJson(destPath);
            } else if (suffix === 'wxss') {
                return this.transformStyle(destPath);
            } else { // 默认处理图片
                return this.transformImage(destPath);
            }
        } else if (event === 'unlink') {
            // 删除文件
            return del(path.replace(new RegExp(`.*\\/${this.sourcePath}`), `${this.distFolder}`), done);
        }
    }

    // 监听运行时配置
    // onBuildRuntimeConfigChanged() {
    //     this.genarateRuntimeConfig();
    // }

    // app.json 的配置过滤和整理
    transformAppJson(data) {
        const json = JSON.parse(data);
        // 若有子包配置
        if (json.subPackages) {
            const subArr = [];
            json.subPackages = json.subPackages.filter(pack => {
                const root = pack.root.replace(/^\//, '');
                if (this.filterPage(root)) { // 过滤掉当前整个子包
                    return false;
                }
                pack.pages = pack.pages.filter(page => {
                    let route = root + page;
                    if (!root.endsWith('/') && !page.startsWith('/')) { // 补充缺少/
                        route = root + '/' + page;
                    } else if (root.endsWith('/') && page.startsWith('/')) { // 去除多余的/
                        route = root.replace(/\/$/, page);
                    }
                    if (this.filterPage(route)) {
                        return false;
                    }
                    subArr.push(route);
                    return true;
                });
                return pack.pages.length ? true : false;
            });
            // 如果平台不支持分包，将app.json中的子包合并到主包
            if (!this.config.isSupportSubpackage) {
                json.pages = json.pages.concat(subArr);
                delete json.subPackages;
            }
        }
        // 过滤掉不需要页面
        json.pages = json.pages.filter(item => !this.filterPage(item));
        return JSON.stringify(json);
    }

    // 处理脚本
    transformScript(path) {
        // 判断路径是否需要被过滤不进行打包编译
        if (path && this.filterPage(path)) {
            return;
        }
        const destPath = (path && [path]) || [`${this.sourcePath}/**/*.js`, `${this.sourcePath}/**/*.wxs`];
        const srcPath = path ? destPath : destPath.concat(this.filterFile({ suffix: 'js', }));
        const distFilePath = this.assemblePath(path);
        const _this = this;
        return gulp.src(srcPath)
            .pipe(ifdefPlugin(_this))
            .pipe(transformGlobalPlugin(_this))
            .pipe(apiProxyPlugin(_this))
            .pipe(gulp.dest(distFilePath));
    }

    // 处理模板
    transformTmpl(path) {
        // 判断路径是否需要被过滤不进行打包编译
        if (path && this.filterPage(path)) {
            return;
        }
        const destPath = (path && [path]) || [`${this.sourcePath}/**/*.wxml`];
        const srcPath = path ? destPath : destPath.concat(this.filterFile({ suffix: 'wxml', }));
        const distFilePath = this.assemblePath(path);
        const _this = this;
        return gulp.src(srcPath)
            .pipe(ifdefPlugin(_this))
            .pipe(transformExtPlugin(_this))
            .pipe(transformTmplPlugin(_this))
            .pipe(gulp.dest(distFilePath));
    }

    // 处理 json 配置
    transformJson(path) {
        // 判断路径是否需要被过滤不进行打包编译
        if (path && this.filterPage(path)) {
            return;
        }
        const destPath = (path && [path]) || [`${this.sourcePath}/**/*.json`];
        const srcPath = destPath.concat(this.filterFile({ suffix: 'json', }));
        const distFilePath = this.assemblePath(path);
        const _this = this;
        return gulp.src(srcPath)
            .pipe(ifdefPlugin(_this))
            .pipe(through.obj(function(file, encode, cb) {
                let data = file.contents.toString();
                // app.json的配置过滤和整理
                if (file.path.indexOf('app.json') > -1) {
                    data = _this.transformAppJson(data);
                }
                // 再次转为Buffer对象，并赋值给文件内容
                file.contents = Buffer.from(data);
                // 以下是例行公事
                this.push(file);
                cb();
            }))
            .pipe(jsonFormat(4)) // 格式化，缩进4个空格
            .pipe(gulp.dest(distFilePath)); // 则最后生成的文件路径为 dist/zepto.js
    }

    // 处理样式
    transformStyle(path) {
        // 判断路径是否需要被过滤不进行打包编译
        if (path && this.filterPage(path)) {
            return;
        }
        const destPath = (path && [path]) || [`${this.sourcePath}/**/*.wxss`];
        const srcPath = destPath.concat(this.filterFile({ suffix: 'wxss', }));
        const distFilePath = this.assemblePath(path);
        const _this = this;
        return gulp.src(srcPath)
            .pipe(ifdefPlugin(_this))
            .pipe(transformStylePlugin(_this))
            .pipe(autoprefixer({
                overrideBrowserslist: ['iOS > 7'],
                cascade: false, // 是否美化属性值
                remove: false,
            }))
            .pipe(transformExtPlugin(_this))
            .pipe(gulp.dest(distFilePath));
    }

    // 处理图片
    transformImage(path) {
        const destPath = (path && [path]) || [`${this.sourcePath}/**/*.png`, `${this.sourcePath}/**/*.jpg`, `${this.sourcePath}/**/*.jpeg`];
        const distFilePath = this.assemblePath(path);
        return gulp.src(destPath)
            .pipe(gulp.dest(distFilePath));
    }

    // 清除目标目录
    cleanFile(cb) {
        const { projectConfig = 'project.config.json' } = this.config;
        // 项目文件不能删除，因为该文件是打开工具时自动生成的，改动打包后，文件被删除小程序无法重新编译，需要重启开发工具重新生成该文件
        return del([`${this.distFolder}/**/*`, `!${this.distFolder}/${projectConfig}`], cb);
    }

    // 生成运行时配置（TODO: 后续可废弃）
    genarateRuntimeConfig() {
        const _this = this;
        return gulp.src(`build/platforms/${this.platform}/runtime.config.js`)
            .pipe(through.obj(function (file, encode, cb) {
                const p1 = '../platforms/runtime.config';
                const p2 = `../platforms/${_this.platform}/runtime.config`;
                const defConfig = require(p1);
                let srcConfig = require(p2);
                let tarConfig = {};
                let code = '';

                // 清除 require 的缓存
                purgeCaches([p1, p2]);

                if (!_this.config.isMultiChildMode) {
                    tarConfig = deepAssign(cloneJsonObj(defConfig), srcConfig);
                    code = `module.exports = ${JSON.stringify(tarConfig, null, 4)}`;
                } else {
                    srcConfig = srcConfig.CONFIGS;
                    Object.keys(srcConfig).forEach((k) => {
                        if (k !== 'base') {
                            tarConfig[k] = deepAssign(cloneJsonObj(defConfig), deepAssign(cloneJsonObj(srcConfig.base), srcConfig[k]));
                        }
                    });
                    const ast = parser.parse(file.contents.toString());
                    traverse(ast, {
                        ObjectExpression(path) {
                            if (t.isVariableDeclarator(path.parent) && path.parent.id.name === 'CONFIGS') {
                                path.replaceWithSourceString(JSON.stringify(tarConfig, null, 4));
                                path.stop();
                            }
                        },
                        AssignmentExpression(path) {
                            const node = path.node;
                            if (node.left && node.left.object && node.left.object.name === 'exports') {
                                if (node.left.property.name === 'CONFIGS') {
                                    path.remove();
                                } else if (node.left.property.name === 'default') {
                                    path.replaceWith(t.assignmentExpression('=', t.memberExpression(t.identifier('module'), t.identifier('exports')), t.cloneNode(node.right)));
                                }
                            }
                        }
                    });
                    code = generator(ast, {
                        compact: false,
                    }).code;
                }

                file.contents = Buffer.from(code);
                this.push(file);
                cb();
            }))
            .pipe(rename('index.js'))
            .pipe(gulp.dest(`${this.distFolder}/config/`));
    }

    // 生成 api proxy 脚本
    genarateApiProxy() {
        const entryPath = path.resolve(process.cwd(), `build/platforms/${this.platform}/proxys/index.js`);
        const chunkName = `__${namespace}_proxy__`;
        const config = {
            entry: {
                [chunkName]: entryPath
            },
            output: {
                filename: '[name].js',
                libraryTarget: 'umd'
            },
            mode: 'development',
            devtool: false,
        };
        return gulp.src(entryPath)
            .pipe(gulpWebpack(config, webpack))
            .pipe(gulp.dest(`dist/${this.platform}/`));
    }

    /**
     * 判断某个页面是否需要不进行打包编译
     * @param {string} path 文件路径
     */
    filterPage(path) {
        let isFilter = false;
        this.config.pageUnsupport && this.config.pageUnsupport.forEach(item => {
            if (path.indexOf(item) > -1) {
                isFilter = true;
            }
        });
        return isFilter;
    }

    /**
     * 过滤不进行打包编译的文件
     * @param {Object} param.suffix 文件后缀
     */
    filterFile({ suffix }) {
        const arr = [];
        this.config.pageUnsupport && this.config.pageUnsupport.forEach(item => {
            if (item.endsWith('.js') || item.endsWith('.wxs') || item.endsWith('.json') || item.endsWith('.wxml') || item.endsWith('.wxss')) {
                arr.push(`!${this.sourcePath}/**/${item}`);
            } else {
                arr.push(`!${this.sourcePath}/${item}/**/*.${suffix}`);
                if (suffix === 'js') {
                    arr.push(`!${this.sourcePath}/${item}/**/*.wxs`);
                }
            }
        });
        return arr;
    }

    // 组装路径
    assemblePath(path) {
        let distFilePath = this.distFolder;
        if (path) {
            const tmpPath = path.replace(new RegExp(this.sourcePath), `${this.distFolder}`);
            const index = tmpPath.lastIndexOf('/');
            distFilePath = tmpPath.substring(0, index);
        }
        return distFilePath;
    }
}

module.exports = Compiler;