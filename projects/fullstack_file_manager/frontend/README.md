# 相关说明
 
### 项目构建：
- 1、开发环境：
    - npm run dev     
        开启node服务器，提供静态文件的访问。
        提供react组件热加载功能
- 2、生产环境：
    - npm run build
        生成build目录，可将内部代码copy至SVN发布。
        将代码压缩并对文件名MD5化处理

### 其他说明：
- 1、webpack配置文件：
       - webpack.config.js：用于打包生产环境代码
       - webpack.dev.config.js：用于打包开发环境的代码
- 2、antd源码修改：
       - 见docs目录
- 3、本地文件上传服务器：
       - 说明：server目录有本地搭建一个接受文件的简易服务器的代码，测试时可使用
       - 方式：进入目录后 npm start即可
- 4、目录说明：
       - docs：项目文档
       - server：服务器搭建
       - src：应用代码
       - test：Jasmine单元测试代码
       - build：构建好的生产环境代码
- 5、其他：
       - 项目地址：
       - 接口地址：
       - git地址：
       - svn地址：
       - 原型地址：
       - UI地址：
- 6、Tips：
       - 获取函数名称时由兼容问题