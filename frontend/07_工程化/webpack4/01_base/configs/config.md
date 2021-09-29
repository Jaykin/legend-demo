### 配置选项

#### 入口 & 上下文
>`入口 entry` 即 webpack 的启动点   
>`上下文 context` 即入口文件所处的目录的绝对路径，默认使用当前目录

#### 输出 output
>指示 webpack 如何输出、在哪里输出打包后的内容

#### 模块 module
>决定如何处理项目中不同类型的模块（js/css/img/ts 等等）

#### 解析 resolve
>设置模块如何被解析，即怎么找到模块所在路径

#### 优化 optimization
>webpack4 支持，提供一些优化选项

#### 插件 plugins
>用于以各种方式自定义 webpack 的构建过程，其附带了各种内置插件，通过 `webpack.[plugin-name]` 访问

#### devServer
>自定义开发环境，用于快速开发应用程序（搭建 http 服务），使用 webpack-dev-server 实现

#### devtool
>控制是否生成、如何生成 source map    
>示例 https://github.com/webpack/webpack/tree/master/examples/source-map

#### 构建目标 target
>内部使用一些插件，为多种环境提供构建编译，如果无可选择的目标，可设置为一个函数，然后使用自己指定的插件，来实现自己的构建目标    
>内部插件见 https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsApply.js
```javascript
module.exports = {
    target: (compiler) => {
        compiler.apply(
            new webpack.JsonpTemplatePlugin(options.output),
            new webpack.LoaderTargetPlugin("web")
        )
    }
}
```

#### watch & watchOptions
>启用 watch 模式 & 定制 watch 模式

#### 外部扩展 externals
>提供从输出的 bundle 中排除依赖的方法，防止将某些依赖打包到 bundle 中，而是在运行时再去从外部获取依赖（如 从 cdn 引入 jquery，而不打包进 bundle）

#### 性能 performance
>配置如何展示性能提示    
>https://github.com/webpack/webpack/issues/3216

#### node
>配置是否 polyfill 或 mock 某些 node.js 的全局变量或模块，这可以使最初为 node 环境编写的代码，在其他环境中运行   
```javascript
node: {
  console: false,
  global: true,
  process: true,
  __filename: "mock",
  __dirname: "mock",
  Buffer: true,
  setImmediate: true
  // 更多选项，请查看“其他 Node.js 核心库”
}
```

#### 统计信息 stats
>对于 webpack-dev-server，该属性放在 devServer 中   
>在使用 Node.js API 启动构建时，此选项无效