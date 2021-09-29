#### 管理资源
>即通过 loader 来解析 `css/图片/csv/xml/字体` 等非 JS 模块，使其能方便引入

#### 管理输出
>即对输出进行定制化    
>`runtime 代码` 在模块交互时，连接模块所需的加载和解析逻辑
>`manifest 数据` 存储所有模块的详细要点，使得 runtime 能够查询模块标识符，检索出对应的模块   
```json
{
  "app.js": "app.bundle.js",
  "print.js": "print.bundle.js",
  "icon.jpg": "icon.jpg",
  "index.html": "index.html"
}
```

#### 搭建开发环境
1. `使用 Source Map`
2. `自动编译 & 自动刷新浏览器`
   1. watch 模式（只能自动编译）
   2. webpack-dev-server 提供简单的 web 服务器，并能够实时重新加载（live reloading）
   3. webpack-dev-middleware 是一个容器，可以把 webpack 处理后的文件传递给一个服务器，需要自行搭建服务器，使用更灵活
3. `模块热替换 HMR`  
   * 允许在运行时更新各种模块，而无需完全刷新
   * **流程**：检测文件修改 -> 生成更新补丁 -> 用 websoket 通知客户端 -> 客户端监听后拿到补丁，然后进行更新后的操作
   * webpack 只负责生成更新补丁并告知给客户端，具体的更新操作可以用 hmr 的 api 或 loader 来实现
     * style-loader 实现了对样式的更新
     * react-hot-loader 实现 react 的更新
   * 如果一个模块中没有实现 hmr 更新处理函数，更新就会冒泡
4. `API 代理`
   * `devServer.proxy` 
   * `配置 nginx 代理` 
5. `使用 Vagrant`
   * 实现在虚拟机(Virtual Machine)上运行开发环境
   * Vagrant: 用来快速 `创建和管理虚拟环境` 的工具
   * 使用
     * 1. 安装 VirtualBox、Nginx、Vagrant
     * 2. 配置 nginx、配置 webpack-dev-server
  
#### tree shaking
>移除 js 上下文中的未引用代码（dead-code）  
* 使用 ES2015 模块系统，因为其依赖 ES2015 的 `static-module-structure`，在编译阶段即可确定依赖关系，而非等到运行时
* 标记无副作用的模块（package.json 或者 rule）
  ```javascript
  // rule 配置
  module.exports = {
    module: {
      rules: [{
        // 对指定路径进行 tree shaking
        include: path.resolve(__dirname, './src/math.js'),
        sideEffects: false,
      }]
    }
  }
  ```
* 启用 mode=production，webpack 内部会启用一些插件及内部优化，清除 dead-code

#### 代码分离 Code Splitting
>可将代码分离到不同的 bundle 中，然后可以 `按需加载` 或 `并行加载` 这些文件，可以控制资源大小、资源加载优先级，极大影响加载时间   
>三种分离方式
* `入口起点`：使用 entry 配置手动分离
  * 问题1：如果入口 chunks 之间包含重复的模块，这些重复的模块会被打进各个 bundle 中
  * 问题2：不够灵活，不能将应用逻辑进行动态拆分代码
  ```javascript
  module.exports = {
    entry: {
      index: './src/index.js',
      another: './src/another-module.js'
    }
  }
  ```
* `防止重复`：使用 SplitChunksPlugin 去重和分离 chunk（CommonChunkPlugin 已经在 webpack4 中移除）
  * SplitChunksPlugin 插件允许提取 chunks 间的公共依赖到已有的入口 chunk 中，或者一个新生成的 chunk 中
  * MiniCssExtractPlugin 可以将 css 代码分离（webpack4 中已不推荐用 ExtractTextWebpackPlugin 分离 css）
  ```javascript
  module.exports = {
    optimization: {
      // 分离公共依赖
      splitChunks: {
        chunks: 'all',  // 指定 chunk 类型，或者使用 function 进行过滤
        minSize: 0,     // 注意该配置默认值为 30kb，若公共依赖少于这个值则不会被分离（考虑到新增一个请求造成的消耗，故默认值设为 30kb）
      },
      // 分离 webpack 的 runtime
      runtimeChunk: {
        name: 'runtime'
      }
    }
  }
  ```
* `动态导入 dynamic import`：通过模块的内联函数调用分离，如：import('xxx')、require.ensure('xxx')
  * 调用 import() 之处，被作为分离的模块的起点，被请求的模块和它引用的所有子模块，会分离到一个单独的 chunk 中
  * import() 依赖 promise，如果在低版本浏览器使用，记得预先 shim Promise 环境
  * import() 规范不允许控制模块的名称或其他属性，webpack 中可以通过注释来接收一些特殊的参数，而无需破坏规范
  ```javascript
  import(
    /* webpackChunkName: "my-chunk-name" */
    /* webpackMode: "lazy" */
    /* webpackInclude: /\.json$/ */
    /* webpackExclude: /\.noimport\.json$/ */
    /* webpackPrefetch: true */
    /* webpackPreload: true */
    'path/to/module'
  );
  ```
  * import('xxx') 需要提供路径来在编译阶段解析，如果提供的是一个动态表达式，则会将符合的所有模块都打包进新的 chunk 中   
  * 注释参数，可以多行注释，也可写在一行（需要用分号隔离）
    * `webpackChunkName` 指定新 chunk 的名称
    * `webpackMode` 指定解析动态导入的模块的模式
      * `lazy` 默认，为每个 import() 导入的模块，生成一个可延迟加载(lazy-loadable) chunk
      * `lazy-once` 生成一个可以满足所有 import() 调用的单个可延迟加载(lazy-loadable) chunk
      * `eager` 不会生成额外的 chunk，所有模块都被当前 chunk 引入，并且没有额外的网络请求。仍然会返回 Promise，但是是 resolved 状态
      * `weak` 尝试加载模块，如果该模块函数已经以其他方式加载，仍然会返回 Promise，但是只有在客户端上已经有该 chunk 时才成功解析。如果该模块不可用，Promise 将会是 rejected 状态，并且网络请求永远不会执行。对 `SSR` 非常有用
    * `webpackPrefetch` true，模块会在父 chunk 加载完后再在浏览器空闲时加载，模块会被父 chunk 在未来某个时刻使用
    * `webpackPreload` true，模块会与父 chunk 并行加载，模块可能被父 chunk 立即使用
    * `webpackIncludes` 一个正则，只有匹配的模块才会被打包
    * `webpackExcludes` 一个正则，只有匹配的不会被打包
    * `webpackIgnore` 设置为 true 时，表示禁止 import() 解析模块
>Prefetching/Preloading   
* prefetch/preload 原理
  * https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Link_prefetching_FAQ
  * https://segmentfault.com/a/1190000016949393
  * https://www.jianshu.com/p/7f58ddfc1392

>Bundle Analysis    
  该分析会输出详细的构建时间信息，能帮助优化构建

#### 缓存 Caching
>确保 webpack 编译生成的文件能被客户端缓存，而在文件内容变化后，客户端能够请求到新的文件
* 使用 output.filename 的占位符将文件名称和内容关联
  * `[name]` 模块名称
  * `[hash]` 构建相关的 hash，只要项目里有文件更改，该 hash 值就会改变，项目中该值都一致
  * `[chunkhash]` chunk 内容的 hash，注意默认会包含 webpack 的样板代码（runtime/manifest），会有版本差异
    * 就算 JS 和 CSS 分离，其值也相同，修改一处，JS 和 CSS 的哈希值都会变
    * 注意不要跟 HMR 一起使用，会报错
  * `[contenthash]`最终文件内容的哈希值，注意默认会包含 webpack 的样板代码（runtime/manifest），会有版本差异
    * 注意不要跟 HMR 一起使用，会报错
* 分离出 webpack 的模板代码（runtime）
* 处理模块标识符 module.id(默认是数字标识符，代表模块的解析顺序)
  * **模块标识符改变也会引起 bundle 的改变**，因为 bundle 中会使用 module.id，故相当于 bundle 的内容发生了变化
  * 使用 `optimization.moduleIds`，告诉 webpack，使用哪种算法来生成 module.id，
  ```javascript
  module.exports = {
    optimization: {
      moduleIds: 'hashed',  // 即模块路径的短哈希
    }
  }
  ```

#### 创建 library
>即用 webpack 打包库，与应用程序的打包有些不同
1. 外部化同样的库（peerDependency）
  ```javascript
  module.exports = {
    externals: {
      lodash: {
          // 描述外部 library 所有可用的访问方式
          commonjs: 'lodash',
          commonjs2: 'lodash',
          amd: 'lodash',
          root: '_',
      }
    },
  }
  ```
2. 外部化的限制：无法排除只引入部分文件的 lib，如：`import A from 'lib/one';import B from 'lib/two';`，需要在 `externals` 中逐个排除
  ```javascript
  module.exports = {
    externals: [
      'lib/one',
      'lib/two',
      // 使用正则
      /^library\/.+$/,
    ]
  }
  ```
3. 暴露 Library
```javascript
module.exports = {
  output: {
    libraryTarget: 'umd',
    library: 'libName'
  }
}
```
#### 使用环境变量
>在命令行中指定 `--env` 选项来为 `webpack.config.js` 传入环境变量，需要配置到处为函数才能接受 `env 参数`   
* 命令行
  ```bash
  webpack --env.NODE_ENV=local --env.production
  ```
* 配置文件
  ```javascript
  module.exports = function (env, argv) {
    // env.NODE_ENV === 'local'
    // env.production === true
  }
  ```
* 示例
  CLI|结果
  ---|:--:
  `webpack --env prod`|"prod"
  `webpack --env.prod`|{ prod: true }
  `webpack --env.prod=1`|{ prod: 1 }
  `webpack --env.prod=foo`|{ prod: "foo" }
  `webpack --env.prod --env.min`|{ prod: true, min: true }
  `webpack --env.prod --env min`|[{ prod: true }, "min"]
  `webpack --env.prod=foo --env.prod=bar`|{prod: [ "foo", "bar" ]}

#### 生产环境构建
>使用最佳实践，将应用程序构建至生产环境中   
* 配置
  * `开发环境` 和 `生产环境` 的 `差异配置分离`，公共配置通用，使用 webpack-merge 合并配置
* NPM Scripts
  * 开发环境使用 webpack-dev-server
  * 生产环境用 webpack
  ```json
  {
    "scripts": {
      "start": "webpack-dev-server --open --config webpack.dev.js",
      "build": "webpack --config webpack.prod.js"
    }
  }
  ```
* 指定模式
  * 支持 `development` 和 `production`，webpack 针对不同的模式会进行不同的内部优化
* 代码压缩 Minification
  * 当指定模式为 production 时，内部默认使用 `TesterWebpackPlugin` 进行代码压缩
  * 若想使用其他压缩插件（`babel-minify-webpack-plugin`、`closure-webpack-plugin`），可以设置 `optimization.minimizer` 配置项
* Source Mapping
  * 开发环境希望更快速的 source map，需要添加到 bundle 中以增加体积为代价（如：`inline-source-map`）
  * 生产环境则需要更精准的 source map，需要从 bundle 中分离并独立存在，不影响正常业务（如：`source-map`），会生成一个 `.map` 的文件
* Minimize CSS
  * 默认不会压缩 CSS，需要使用 `optimize-css-assets-webpack-plugin` 插件
  * 配置 minimizer 时，注意也要配置 JS 压缩插件，否则默认的 JS 压缩会被覆盖
  ```javascript
  module.exports = {
    optimization: {
        minimizer: [
          new TerserJSPlugin({}), // JS 压缩
          new OptimizeCSSAssetsPlugin({}), // CSS 压缩
        ]
    }
  }
  ```

#### 懒加载 Lazy Loading
>也叫 `按需加载 on demand`，是一种很好的优化网页或应用的方式   
>原理：先将代码在一些逻辑断点处分离开，然后在代码块中完成某些操作后，引用另外一些新的代码块时才去加载，这样就加快了应用的初始加载速度，减轻了总体体积（因为可能有些代码不会被加载）
```javascript
// 懒加载 ./print 模块，注意 import() 引入模块后，必须使用 .default，这才是实际的模块对象
button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
  var print = module.default;
  print();
});
```

#### 预置依赖 shimming
>场景一：使用了产生全局变量的库，这会污染全局环境，shimming 后，会将全局变量作为普通模块使用
* shimming 全局变量
  * 使用 `webpack.ProvidePlugin`，进行自动加载模块，而不必使用 "import" 或 "require"
    ```javascript
    // 当 identifier 被当作未赋值的变量时，module 就会自动被加载，并且 identifier 会被这个 module 输出的内容所赋值，模块的 property 用于支持命名导出
    // webpack.ProvidePlugin 语法
    new webpack.ProvidePlugin({
      _: 'lodash'
    })

    // 可以配合 tree shaking 减少代码体积（能否自动检查出 property，然后自动引入？）
    new webpack.ProvidePlugin({
      _join: ['lodash', 'join']
    })
    ```  
* 细粒度 shimming（处理遗留的包）
  * 一些传统的模块依赖的 this 指向的是 window 对象，当在 CommonJS 环境下时，this 指向的是 module.exports
  * 使用 `imports-loader` 来覆写 this
  ```javascript
  module.exports = {
    module: {
      rules: [{
        test: path.resolve(__dirname, './src/index.js'),
        use: 'imports-loader?this=>window',
      }]
    }
  }
  ```
* 全局 Exports（处理遗留的包）
  * 某个库创建出一个全局变量，它期望用户使用这个变量，但并没有输出为模块
  * 如果想在项目中以模块的形式引入它，则需要使用 `exports-loader` 将定义的全局变量作为模块来导出
  ```javascript
  module.exports = {
    module: {
      rules: [{
        test: path.resolve(__dirname, './src/globals.js'),
        use: 'exports-loader?file,parse=helpers.parse'
      }]
    }
  }
  ```
>场景二：按需加载 polyfills，提供给需要修补的浏览器（patch）
* 方式一：将所有要用到的 polyfill 分离至独立的 chunk，网页 head标签 中加脚本判断浏览器是否为现代浏览器，否则动态加载脚本
  ```javascript
  var modernBrowser = (
    'fetch' in window &&
    'assign' in Object
  );

  if (!modernBrowser) {
    var scriptElement = document.createElement('script');
    scriptElement.async = false;
    scriptElement.src = '/polyfills.bundle.js';
    document.head.appendChild(scriptElement);
  }
  ```
* 方式二：使用 `@babel/preset-env`
  * `@babel/preset-env`
    * 允许使用最新的 JS 语法，而无需管理目标环境需要进行的语法转换，并且会尽可能的减少包体
    * 需要借助 `browserlist`、`compat-table`（ES5/6/7 的兼容性表格）、`electron-to-chromium` 等开源项目提供的数据来确定任何版本的目标环境需要进行什么语法转换
  * `browserlist` 集成
    * 提供一个共享的关于目标浏览器 或者 NodeJS 的版本配置，使得不同的前端工具一起使用
    * 使用 [CanIUse](https://caniuse.com/) 的数据来查询指定条件的目标环境的情况
    * 在 `package.json` 中设置
    ```json
    {
      "browserslist": [
        "last 1 version",
        "> 1%"
      ]
    }
    ```
    * 提供 `.browserslistrc` 配置文件
    ```txt
    # Browsers that we support
    last 1 version
    > 1%
    maintained node versions
    not dead
    ```
* 方式三：使用 node 配置项，用于对 Node.js 进行 polyfill

#### 渐进式 Web 应用程序 Progressive Web Application（PWA）
>是一种可以提供类似于原生应用体验的 web 应用    
>pwa 能做很多事，在 `离线` 时应用程序仍然能够继续运行功能，通过 `service worker` 实现，基于 `web worker`     
>`service worker` 本质上充当 web 应用程序和浏览器之间的代理服务器，也可在网络可用时作为浏览器和网络间的代理，目的是能够创建有效的离线体验，拦截网络请求并基于网络是否可用以及更新的资源是否驻留在服务器上来采取适当的动作
* 离线功能
  * 使用 `workbox-webpack-plugin` 插件
    * 生成 `service-worker.js`，是 worker 代码
    * 生成 `precache-manifest.xxx.js`，缓存清单，给 service-worker 使用
  * 注册 service worker
    * 查看浏览器配置是否开启：chrome://flags
    * 使用 https 或 http://localhost 等安全源
    * 源码中使用 `navigator.serviceWorker` 提供的 api 进行定制化操作

#### 构建性能
>改进构建/编译性能的实用技巧
##### 常规
>可用于 development 和 production
* 使用最新的 webpack 版本，其内部会进行性能优化。使用最新的 NodeJS、npm 等也能保证性能
* 将 loaders 应用于最少必要的模块，可使用 include 配置
  ```javascript
  module.exports = {
    test: /\.js$/,
    include: path.resolve(__dirname, "src"),
    loader: "babel-loader"
  }
  ```
* 提高启动速度：每个额外的 plugin/loader 都会有启动时间，尽量少使用不同的工具
* 提高解析速度
  * 尽量减少 resolve.modules, resolve.extensions, resolve.mainFiles, resolve.descriptionFiles 中类目的数量，因为他们会增加文件系统调用的次数
  * 如果你不使用 symlinks ，可以设置 resolve.symlinks: false (例如 npm link 或者 yarn link)
  * 如果你使用自定义解析 plugins ，并且没有指定 context 信息，可以设置 resolve.cacheWithContext: false
* Dlls
  * 使用 DllPlugin 将更改不频繁的代码进行单独编译（不需重复编译），可改善编译速度，同时也增加了构建过程的复杂性
* 减少编译的整体大小
  * 使用更少/更小的库
  * 使用 SplitChunksPlugin 插件，将公共模块分离成独立的 chunk，避免重复依赖
  * 删除未使用的代码
  * 仅编译当前在开发的代码
* worker pool
  * Node.js 是单线程的，可以使用 `thread-loader` 将耗资源的 loaders 操作交给拥有独立进程的 worker 处理
  * 注意不要使用太多的 worker，其有一定的启动开销，且 IPC（进程间通信） 非常耗资源
* 持久化缓存
  * 使用 `cache-loader`，将 loader 的处理结果缓存在磁盘上，使用 package.json 中的 postinstall 来清除缓存
  * 注意保存和读取缓存文件是有时间开销的，只对性能开销较大的 loader 使用，否则得不偿失
* progress plugin
  * 该插件只是在编译过程中提供自定义的报告，不会对性能优化有任何效果，可以考虑移除

##### Development
>用于开发环境的优化
* 增量编译
  * 使用 webpack 的 watch 模式，不要使用其他工具监听文件和调用 webpack
  * 对于某些系统，监听大量文件系统会导致大量的 CPU 或内存占用，可以用 `watchOptions.ignored` 忽略项目中不需要监听的文件
  * 若使用轮询模式的话，越多的文件会导致 CPU 负载增加，可以用 `watchOptions.poll` 增加轮询的间隔
* 在内存中编译
  * 通过在内存中进行代码编译和资源提供，而不是磁盘，可以提高编译性能
  * 工具
    * webpack-dev-server
    * webpack-hot-middleware
    * webpack-dev-middleware
* stats.toJson
  * webpack4 默认情况下，stats.toJson() 会输出大量的数据，尽量避免检索 stats 的数据
  * 一般增量编译会检索 stats，webpack-dev-server v3.1.3 之后对此进行了性能优化
* Devtool
  * 不同的设置会有性能差异
  * eval 具有最好的性能，但会映射到转换后的代码，而不是映射到原始代码，所以不能正确的显示行数
  * eval-source-map 初始化 source map 时比较慢，但是会在重新构建时提供比较快的速度，并且生成实际的文件
  * cheap-module-eval-source-map（大多数情况下适用于开发环境）
* 避免使用在生产才需要的工具：压缩/分离/hash 占位符 等
* 最小化入口 chunk（TODO）
* 避免额外的关于代码尺寸、加载等优化步骤
  ```javascript
  module.exports = {
    // ...
    optimization: {
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: false,
    },
  };
  ```
* output 避免设置 pathinfo
  * 默认是 false
* Node.js 版本 8.9.10 - 9.11.1
  * 这段版本内的 Map 和 Set 数据结构有性能回归，因为 webpack 大量使用这些结构，这会影响编译时间

##### Production
>用于生产的优化，注意代码质量在大多数情况下比构建性能更重要
* 多个编译时
  * parallel-webpack 允许将编译工作放在 worker 池中执行
  * cache-loader 可以在多个编译时
* Source Maps
  * 该功能很耗资源，不需要则可以不使用

##### 工具相关
>构建需要的其他工具依据自己的优化原则即可
* babel
  * 项目中的 preset/plugins 数量最小化

##### 参考
* https://segmentfault.com/a/1190000011138081
* https://segmentfault.com/a/1190000015883378
* https://www.jianshu.com/p/b9bf995f3712

#### 内容安全策略 Content Security Policies（CSP）
>是一个额外的安全层，用于检测并削弱某些特定类型的攻击，包括跨站脚本 (XSS) 和数据注入攻击等
>webpack 能为其加载的所有脚本添加 `nonce`，
* `nonce` 即 Number Once，在密码学中 nonce 是一个只被使用一次的任意或非重复的随机数值
* CSP 默认情况下不启用，在入口脚本中设置一个变量 `__webpack_nonce__='c29tZSBjb29sIHN0cmluZyB3aWxsIHBvcCB1cCAxMjM'`，可以启用
* https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP

#### 依赖管理
>若模块 request 含有表达式，由于 webpack 在编译时无法知道具体引入哪个模块，其会创建一个上下文模块    
>上下文模块包含符合表达式规则的所有模块的引用、一个 request => module id 的映射、一些运行时逻辑（用来在运行时获取对应的模块）   
>包含表达式的 request 会导致所有可能的模块都打包进同一个bundle
* 自定义上下文模块
  * `require.context(directory:String, includeSubdirs:Boolean, filter:RegExp)` 参数必须是字面量，返回一个 context 函数
    ```javascript
    const cmpCtx = require.context('./components', true, /\.js$/);
    ```
  * `context.keys()` 它返回一个数组，由所有可能被上下文模块处理的请求（基于上下文）
    ```javascript
    [
      './image/image.js',
      './view/view.js'
    ]
    ```
  * `context.id` 是上下文模块的模块 id
    ```javascript
    console.log(cmpCtx.id);   // ./guide/06_context_module/src/components sync recursive \.js$
    ```
  * `context.resolve()` 它返回请求被解析后得到的模块 id（基于上下文）
    ```javascript
    cmpCtx.resolve(cmpCtx.keys()[0]) === './guide/06_context_module/src/components/image/image.js'
    ```
  * `获取上下文中的模块`
    * `context(key)`
      * `cmpCtx(cmpCtx.keys()[0])`
    * `__webpack_require__(resolvedKey)`
      * `__webpack_require__(cmpCtx.resolve(cmpCtx.keys()[0]))`

  ```javascript
  var map = {
    "./a.js": "./guide/06_context_module/src/utils/a.js",
    "./b.js": "./guide/06_context_module/src/utils/b.js"
  };
  ```
* **问题：多个上下文模块的运行时代码存在 bundle 中，而非 runtime 中，而且会有多份，是否能够复用？**

#### 公共路径设置 Public Path
>用来为项目中所有的资源指定一个基础路径，即 `公共路径 publicPath`
* 构建时设置：使用环境变量
  ```javascript
  const PUBLIC_PATH = process.env.PUBLIC_PATH || '/';

  export default {
    output: {
      publicPath: PUBLIC_PATH,
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.PUBLIC_PATH': JSON.stringify(PUBLIC_PATH),
      })
    ]
  }
  ```
* 即时设置：在项目入口，为 `__webpack_public_path__` 赋值
  ```javascript
  __webpack_public_path__ = process.env.ASSET_PATH;
  ```

#### 集成
>webpack 是一个模块打包器（bundler），开发中的其他任务可能需要另外的工具来处理（如：lint/test/build 等）   
>各种构建任务一般需要一个任务管理器，webpack 也可以集成进去
* Npm Scripts
* Grunt
  * `grunt-webpack`
* Gulp
  * `webpack-stream` or `gulp-webpack`
* Mocha
  * `mocha-webpack`
* Karma
  * `karma-webpack`

#### 高阶入口
>可为 entry 设置由不同文件类型组成的数组，实现不同类型文件的单独 bundle，而不需要再 JS 中使用 import 来引入
```javascript
module.exports = {
  entry: {
    home: ['./home.js', './home.css'],
    account: ['./account.js', './account.css'],
  }
}
```

#### 脚手架 Scaffolding
>在项目刚开始时写复杂的 webapck 配置是不容易的，可以定制一个脚手架供用户使用
* https://webpack.js.org/guides/scaffolding/
