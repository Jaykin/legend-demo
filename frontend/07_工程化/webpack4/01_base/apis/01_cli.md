### 命令行接口（Command Line Interface）

功能|语法|说明|示例
---|:--:|---:|---:
指定配置文件|`webpack --config webpack.config.js`|/|/
加载配置文件前预加载指定模块|`webpack --config-register <array>`|/|/
列出命令行所有可用的配置选项|`webpack --help` or `webpack -h`|/|/
环境选项|`webpack --env prod` or `webpack --env.prod --env.a=1 --env.a=11 --env.b=2`|当 webpack 配置对象导出为一个函数时，会接收到一个环境对象(字符串/数组/对象)|```module.exports = function(env, argv) {}```
模式|`webpack --mode <development|production>`|编译模式，不同的模式，webpack 会自动优化一些东西|/
打印编译进度的百分比值|`webapck --progress`|/|/
watch - 开启观察模式|`webpack --watch`|观察文件系统的变化|/
watch - 指定毫秒|`webpack --watch-aggregate-timeout <ms>`|指定一个毫秒数，在这个时间内，文件若发送了多次变化，会被合并|/
watch - 轮询|`webpack --watch-poll <ms>`|轮询观察文件变化的时间间隔（同时会打开轮询机制）|/
开启 HMR|`webpack --hot`|/|/
展示详细编译过程|`webpack --profile`|/|/