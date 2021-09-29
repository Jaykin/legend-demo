### 模块变量 & 模块方法

#### 模块方法
* ES6
  * `import`
  * `export`
  * `import()` 返回 Promise，动态的加载模块，被请求的模块和它引用的子模块，会被分离到一个单独的 chunk 中
* CommonJS
  * `require(dep: String)`
  * `require.resolve(dep: String)` 同步获取模块的 ID（webpack 中模块 ID 是数字，nodejs 中是文件名）
  * `require.cache(moduleId)` 多出引用同一个模块，最终只会产生一次模块执行和输出，其会在运行时中保存一个缓存，该方法即用来获取指定的缓存
    ```javascript
    // 删除模块缓存
    delete require.cache(module.id)
    ```
  * `require.ensure()` webpack 特有，动态加载模块，可用 import() 替代
* AMD
  * `define()`
  * `require()`
* 标签模块（Labeled Modules）
* webpack 特有方法
  * `require.context()`
  * `require.include()`
  * `require.resolveWeak()`

#### 模块变量
* NodeJS
  * `module.loaded` false 表示该模块正在执行，true 表示同步执行已经完成
  * `global`
  * `process`
  * `__dirname`
  * `__filename`
* CommonJS
  * `module.id` 当前模块的 ID
    ```javascript
    module.id === require.resolve('./file.js')
    ````
  * `module.exports`
  * `exports`
* webpack 特有
  * `module.hot` 表示 HMR 是否已启用
  * `__resourceQuery ` 当前模块的 query，如果 require 时使用了查询字符串，那么该变量在该模块中即可访问
    ```javascript
    require('file.js?test');
    // file.js
    __resourceQuery === '?test'
    ```
  * `__webpack_public_path__` 等同于 output.publicPath 配置选项
  * `__webpack_require__(moduleId)` 原始 require 函数
  * `__webpack_chunk_load__(chunkId, callback)` 内部 chunk 载入函数
  * `__webpack_modules__` 访问所有模块的内部对象，key 为 moduleId
  * `__webpack_hash__`
  * `__non_webpack_require__`
  * `DEBUG` 同配置选项中的 debug 