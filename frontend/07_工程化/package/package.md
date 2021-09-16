### 包管理

#### npm
>Node.js 的包管理工具   
* 【英文】https://docs.npmjs.com/
* 【中文】https://www.npmjs.cn/
* 【npx】方便在命令行运行 npm 的命令包
  * 会去 `node_modules/.bin` 查找命令，没找到会去系统环境变量里找，如果找不到，会进行临时安装，使用后会删除
  * http://www.ruanyifeng.com/blog/2019/02/npx.html
  ```bash
  # 'webpack' 不是内部或外部命令，也不是可运行的程序或批处理文件
  webpack -v
  # 使用 npm run-script，会直接调用 node_module/.bin 内部的脚本
  npm run dev
  # 使用 .bin
  ./node_module/.bin/webpack -v
  # 使用 npx
  npx webpack -v
  ``` 
* 【npm-check】方便的进行版本更新
  * https://www.npmjs.com/package/npm-check

#### yarn

#### bower

#### 参考
* https://segmentfault.com/a/1190000014716713
