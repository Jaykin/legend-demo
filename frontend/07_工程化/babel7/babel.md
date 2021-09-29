# Babel
>https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/user-handbook.md

## 概述
>**Babel 是一个 JS 编译器**    
是一个工具链，`用于将 ES2015+ 版本的代码转换为向后兼容的 JS 代码（语法转换），将 JSX/TS/Flow 等转换为原生 JS（语法转换），使用 polyfill 在目标环境中添加缺失的特性`，以便能够在当前或旧版浏览器或其他环境中正常运行   

>**插件化**   
Babel 是构建在插件化机制上的，使用现有的或自己编写的插件可以组成一个转换管道，进行代码编译  
使用 [generator-babel-plugin](https://github.com/babel/generator-babel-plugin) 可以创建插件模板    

>**可调试**     
支持 Source Map，可方便调试编译后的代码    

>**代码规范**     
尽可能的遵循 ECMAScript 标准，提供选项来对标准和性能进行权衡    
尽可能用最少的代码并且不n依赖太大量的运行环境

## CLI
>自带一个内置的 CLI 命令行工具，可通过命令行编译文件

## 配置
### babel.config.js
>位于项目根目录，返回一个配置对象

### .babelrc
>位于项目根目录，一个 JSON 文件

### .babelrc.js
>位于项目根目录，配置同 .babelrc，不过可以使用 JS 编写

### package.json
>提供 `babel` key，用来承载配置信息

### 使用 CLI 的参数指定配置

### 使用 @babel/core 的 API 传入配置
```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-arrow-functions"]
});
```

### 插件 plugin
>插件：用来转换代码，每种新语法都有相应的插件进行转换     
* `转换插件`
  * 用于转换你的代码，转换插件将启用相应的语法插件
* `语法插件`
  * 这些插件只允许 Babel 解析特定类型的语法（而不是转换）
* `插件路径`
  * npm 包：指定包名称，如果名称前缀是 `babel-plugin`，可以将其省略
  * 本地文件：指定相对/绝对路径
  ```json
  {
      "plugins": [
          "myPlugin",
          "babel-plugin-myPlugin",

          "@org/babel-plugin-name",
          "@org/name",

          "./asdf/plugin",
      ]
  }
  ```
* `插件顺序`
  * 插件在 Presets 前执行
  * 插件顺序从前往后
  * Preset 的顺序是从后往前
* `插件参数，与名称组成一个数组`
  ```json
  {
      "plugins": [
          [
              "transform-async-to-module-method",
              {
                  "module": "bluebird"
              }
          ]
      ]
  }
  ```
* `插件开发`
  * https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md

### 预设 preset
>预设：每个插件只负责单个或部分转换任务，预设即是一组预先设定的插件，即插件的组合
* `官方 Presets`
  * `@babel/preset-env` 根据指定的目标环境来进行必要的代码转换
  * `@babel/preset-flow` 转换 Flow 代码
  * `@babel/preset-typescript` 转换 TS 代码
  * `@babel/preset-react` 转换 React 的 JSX 代码
* `实验性质的 Presets（Stage-x）`
  * `@babel/preset-stage-0` 设想（Strawman），只是一个想法，可能有 Babel插件
  * `@babel/preset-stage-1` 建议（Proposal）
  * `@babel/preset-stage-2` 草案（Draft）：初始规范
  * `@babel/preset-stage-3` 候选（Candidate）：完成规范并在浏览器上初步实现
  * `@babel/preset-stage-4` 完成（Finished）：将添加到下一个年度版本发布中
* `创建 Preset` 导出一份配置即可，其中包含其他 preset 或 插件
  ```javascript
  module.exprots = function () {
      return {
          presets: [
              require("@babel/preset-env"),
          ],
          plugins: [
                [require("@babel/plugin-proposal-class-properties"), { loose: true }],
                require("@babel/plugin-proposal-object-rest-spread"),
          ],
      }
  }
  ```
* `preset 路径`
  * npm 包：指定包名称，如果名称前缀是 `babel-preset`，可以将其省略
  * 本地文件：指定相对/绝对路径
  ```json
  {
    "presets": [
        "myPreset",
        "babel-preset-myPreset",

        "@org/babel-preset-name",
        "@org/name",

        "./myProject/myPreset"
    ]
  }
  ```
* `preset 顺序` 从后往前执行
* `preset 参数` 与名称组成一个数组
  ```json
  {
    "presets": [
        ["@babel/preset-env", {
            "loose": true,
            "modules": false
        }]
    ]
  }
  ```

## 工具包
### @babel/core

### @babel/cli

### @babel/preset-env

### @babel/polyfill
>用来模拟完整的 ES2015+ 环境
* 使用方式 1：在所有代码之前加载
* 使用方式 2（推荐）：使用 @babel/preset-env 将 useBuiltIns 参数设为 'usage'，其会根据定义的目标环境，自动为你加载 `必需的 polyfill`

### @babel/plugin-transform-runtime

### @babel/register

### @babel/standalone