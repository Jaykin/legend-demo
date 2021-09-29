// HookPlugin 测试 hooks
const webpack = require('webpack');

class HookPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        /**
         * ============================ 1.0 准备阶段 ==========================================================
        */
        // entry 配置项处理过之后（SyncBailHook）
        compiler.hooks.entryOption.tap('entry', (entry) => {
            console.log('entryOption');
        });

        // 正常模式启动构建，调用 compiler.run() 启动构建，此时 options 已解析完成（AsyncSeriesHook）
        compiler.hooks.run.tapAsync('run', (compiler, callback) => {
            console.log('run');
            callback();
        });

        // 监听模式启动构建，该模式下 run 不会触发（AsyncSeriesHook）
        compiler.hooks.watchRun.tapAsync('watchRun', (compiler, callback) => {
            console.log('watchRun');
            callback();
        });

        // NormalModuleFactory 创建之后（SyncHook）
        compiler.hooks.normalModuleFactory.tap("normalModuleFactory", (nmf) => {
            console.log('normalModuleFactory');
            // 解析前
            nmf.hooks.beforeResolve.tapAsync("nmf-beforeResolve", (result, callback) => {
                // return callback();  // callback 第二个参数为 undefined 时会终止 module 解析
                console.log('nmf-beforeResolve');
                return callback(null, result);
            });
            // 解析，使用 https://github.com/ternjs/acorn 解析 JS
            nmf.hooks.parser
                .for("javascript/auto")     // 注意指定文件类型
                .tap('nmf-parser', (parser, parserOptions) => {
                // hook into AST 节点，可自定义解析过程
                // parser.hooks.someHook.tap();
                parser.hooks.statement
                    .tap('nmf-parser::statement', (exp) => {
                        console.log('nmf-parser::statement', exp);
                    });
                console.log('nmf-parser');
            });
            // 解析后
            nmf.hooks.afterResolve.tap("nmf-afterResolve", () => {
                console.log('nmf-afterResolve');
            });
        });

        // ContextModuleFactory 创建之后（SyncHook）
        compiler.hooks.contextModuleFactory.tap("contextModuleFactory", (cmf) => {
            console.log('contextModuleFactory');
        });

        // 一个新的编译(compilation)创建之后, hook into compiler（SyncHook）
        compiler.hooks.compile.tap('compile', (compilationParams) => {
            // 可获取两个核心对象：NormalModuleFactory、ContextModuleFactory
            // NormalModuleFactory: compilationParams.normalModuleFactory，用来创建 NormalModule 实例
            // ContextModuleFactory: compilationParams.ContextModuleFactory，用来创建 ContextModule 实例
            console.log('compile');
        });

        // compilation 事件之前执行（SyncHook）
        compiler.hooks.thisCompilation.tap('thisCompilation', (compilation) => {
            // 该 hook 不会被子编译器复制
            // console.log('compilation', JSON.stringify(Object.keys(compilation), null, 2));
            console.log('thisCompilation');
        });

        // 创建 compilation 之后，compilation 包含一次构建过程中所有的数据（SyncHook）
        compiler.hooks.compilation.tap('compilation', (compilation) => {
            // 该 hook 会被子编译器复制
            console.log('compilation');
        });

        /**
         * ============================== 2.0 module 和 chunks 生成阶段 ==========================================================
         * 解析依赖的所有 modules，再根据 modules 生成 chunk
         * module 解析（即 entry 设置的入口模块）：创建实例、loaders 应用、依赖收集
         * chunk 生成：找到 chunk 包含的 modules
        */
        compiler.hooks.thisCompilation.tap('thisCompilation02', (compilation) => {
            // 所有模块都完成构建，可能有模块会重新构建（SyncHook）
            compilation.hooks.finishModules.tap('finishModules', (modules) => {
                const source = modules[0]._source.source();    // 获取 module 源码
                console.log('finishModules', modules[0]);
            });
            // 停止接收新模块时触发（封存阶段），这里能准确拿到所有 modules（SyncHook）
            compilation.hooks.seal.tap('seal', () => {
                console.log('seal');
            })
        });

        // 上一阶段完成后（AsyncParallelHook）
        compiler.hooks.make.tap('make', (compilation) => {
            console.log('make');
        });

        /** compilation
         * 生成 chunk（无 hook）
         * 1. webpack 先将 entry 中对应的 module 都生成一个新的 chunk
         * 2. 遍历 module 的依赖列表，将依赖的 module 也加入到 chunk 中
         * 3. 如果一个依赖 module 是动态引入的模块，那么就会根据这个 module 创建一个新的 chunk，继续遍历依赖
         * 4. 重复上面的过程，直至得到所有的 chunks
        */

        // 对 modules、chunks 进行优化操作，如：分配 id、排序等（compilation 中optimize 相关的 hook）

        /**
         * ============================== 3.0 文件生成阶段 ==========================================================
         * 根据 chunks 生成最终的文件（https://cloud.tencent.com/developer/article/1006354）
         * 1. 模板 hash 更新
         * 2. 模板渲染 chunk
         * 3. 生成文件
        */
        
        // 创建构建用的 hash （compilation 中 hash 相关的 hook）
        // 遍历 compilation.chunks，进行渲染(生成代码)，加上包装代码
        // 渲染完成后，compilation.assets 存储目标文件，可以通过修改 asset 来改变最终要生成的文件（compilation 中 asset 相关的 hook）
        // compilation 的 seal 结束

        // emit 生成资源到 output 目录之前（AsyncSeriesHook）
        compiler.hooks.emit.tapAsync('emit', (compilation, callback) => {
            // 可修改最终文件
            console.log('emit', compilation.chunks[0]);
            console.log('emit assets', compilation.assets);
            callback();
        });

        // 遍历 compilation.assets 生成所有文件
        // 然后触发 compiler 的 done，表示编译(compilation)完成（SyncHook）
    }
}

module.exports = HookPlugin;