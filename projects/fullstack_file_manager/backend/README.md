# 安装部系统文档 #

- 目录结构
- 使用技术
- 常用命令
- 注意事项

## 目录解构 ##
- app
    - api 接口
    - assets 静态资源
    - errcode 错误码模块
    - lib 放一些 uitls
    - middleware 自己写的一些 express 中间件
    - model 数据库访问的模型
    - pulbic 放一些帮助测试的页面代码。内测正式式环境不会有
    - app.js 项目入口
    - config.js 根据环境变量获取配置
    - db.js 数据库连接。
    - db2.js sequelize（orm） 的数据库连接
    - env.js 环境变量模块（包含一些帮助方法）
    - log.js 日志配置部分
- config
    - developement.json 开发的时候使用
    - production.json 给运维部署的时候参考的配置文件
    - uniittest.json 跑单元测试的时候用的
    - 注意::这里运维会根据上面的文件，在正式环境中使用 config.json 文件。所以请不要自己建一个，导致覆盖了线上的 config.json
- log
    - 略。各种日志
- task
    - 任务，目前有只有发布到 svn 的脚本。
- test
    - api_test.js  api 测试
    - model_test.js  数据库模型测试
- bin
    - 注意里面的东西不要动。运维把部署脚本放在这个目录下。每次通过瓦力部署之后，都会跑这里的脚本更新/重启项目。


## 使用技术 ##
- 服务器：node, express
- 数据库：mysql,对应 orm 为 sequelize
- 进程管理：pm2, 对应进程日志模块 pm2-logrotate
- 测试：mocha, chai
- 其他:
    - 重度使用 promise，后期计划使用 generator 来转成同步写法。


## 常用命令 ##
- 开发：npm run dev
- 测试：
    - npm run test 单元测试 / npm run test -- -g api -i 除 api 意外的测试都跑一遍。
    - npm run test-server, npm run test-api  接口测试
    - npm run coverage / 跑一遍单元测试 & 生成测试覆盖率报告
- 发布：
    - npm run deploy-a 发布到测试目录下的 svn
    - npm run deploy-r 发布到正式目录下的 svn


## 注意事项 ##
- 学习 sequelize 的使用
- 学习 promise 的使用，项目中大量使用到 promise 来处理异步问题。
- 学习 mysql 的相关知识：基本的增删改查，事务等，写出合理的 sql 查询语句。