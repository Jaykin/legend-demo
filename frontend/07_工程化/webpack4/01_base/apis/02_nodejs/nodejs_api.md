### Node.js API

#### webpack(config[, callback])
>返回 Compiler 实例

#### compiler（Compiler 实例）
>仅支持一个并发编译，多个并发编译会损坏输出文件
* compiler.run(callback) 触发编译，完成之后，执行指定的 callback
* compiler.watch(watchOptions, handler) 触发编译，完成后会监听变更，返回一个 Watching 实例

#### MultiCompiler
>当配置是数组时，需要在单个 compiler 中执行多个配置，其不会并行执行，每个配置都只会在前一个配置处理结束后，才进行处理   
并行处理的话，可以使用 parallel-webpack

#### watching（Watching 实例）
* watching.close(callback) 结束监听
* watching.invalidate() 使当前编译循环无效，不会停止监视进程

#### stats 对象
>用于获取编译过程中的有用信息，包括 **错误和警告**、**计时信息**、**module 和 chunk 信息**
* stats.hasErrors() 检查编译期是否有错误
* stats.hasWarnings() 检查编译期是否有警告
* stats.toJson(options) 以 JSON 对象的形式返回编译信息，options 同 stats 配置项的取值
* stats.toString(options) 以格式化的字符串形式返回编译信息，options 同上

#### 自定义文件系统
>默认情况下，webpack 使用普通文件系统来读取文件并将文件写入磁盘。但是，还可以使用不同类型的文件系统（内存(memory), webDAV 等）来更改输入或输出行为，可以改变 inputFileSystem 或 outputFileSystem 来实现
```javascript
const MemoryFS = require("memory-fs");  // 会将文件写入内存中，而不是磁盘上
const webpack = require("webpack");

const fs = new MemoryFS();
const compiler = webpack({ /* options*/ });

compiler.outputFileSystem = fs;
compiler.run((err, stats) => {
  // 之后读取输出：
  const content = fs.readFileSync("...");
});
```