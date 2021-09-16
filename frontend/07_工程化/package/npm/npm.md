#### 概述
>软件注册机构，由三个不同的部分组成
1. `网站` - 用来 `查找代码包`、`设置个人资料`、`管理你的包` 等
2. `命令行界面 CLI` - 从终端运行，开发人员与 npm 进行交互
3. `注册表` - 一个大型公共数据库，存储 JavaScript 包及元数据    

>注册网站账户，用来管理自己的包
* https://www.npmjs.com/
* https://www.npmjs.com/settings/jak_kin/packages
* a1b2.3C4d5e

>npm Orgs
* `npm 组织` 允许团队贡献者读写和发布公共包和私有包，公共包的操作是免费的，私有包则需要付费

>npm Enterprise
* `npm 企业` 提供私有注册表，以便在内部开发未公开共享的包

#### Packages and modules 包和模块
##### 1、概述
###### 1.1 包是什么
>包是一个文件或目录，由 package.json 文件来描述   
* 包的格式
  * a) 包含由 package.json 文件描述的程序的文件夹
  * b) 包含（a）的 taz 压缩文件
  * c) 一个 URL，能解析至（b）
  * d) 发布在注册表中的 [name]@[version]，并符合（c）
  * e) 指向（d）的 [name]@[tag]
  * f) （e）中有包含 latest 标签的 [name]
  * g) git 地址，克隆的内容是（a）
###### 1.2 模块是什么
>模块是一个文件或目录，放置在 node_modules 目录下，而且其能被 Node.js 的 require() 函数加载
* 模块的格式
  * a) 包含一个有 main 字段的 package.json 文件的目录
  * b) 包含一个 index.js 文件的目录
  * c) 一个 JS 文件
* 不是所有的模块都是包
* 不是所有的包都是模块（比如 cli 包，并不提供 main 字段）
###### 1.3 作用域 scopes
>用来将相关的包组合在一起，为其提供命名空间，避免包名冲突  
>作用域是 @ 和 斜杠之间的字符串，如：@[scope]/[package-name]
###### 1.4 公共包 public package
>用户或组织成员能创建和发布，然后任何人都可以下载使用  
>`unscoped` 存储在全局的公共注册表，使用包名即可在 package.json 中引用   
>`scoped` 属于个人或组织，必须通过域名来引用，如 @username/package-name、@org-name/package-name
###### 1.5 私有包 private package
>私有包允许你使用 npm 注册表来托管私有代码，npm 版本需要大于 2.7.0，而且需要是付费用户   
>私有包都是 scoped，所有作用域包默认都是私有的，可以更改为公共的
##### 贡献包
##### 更新和管理发布的包
##### 获取包
##### 代码安全

#### CLI

#### 使用指南
##### 1、配置
##### 1.1、npmrc
>npm 从命令行、环境变量、npmrc 文件获取配置项   
* `npm config` 命令可以修改个人或全局的 npmrc 配置文件
* 配置项：https://docs.npmjs.com/misc/config
##### 1.2、package-lock.json
>该文件会自动生成，他描述了包的依赖树
##### 1.3、npm-shrinkwrap.json
>同 package-lock.json 一样可以锁版本，不同的是其会跟着包发布

#### 参考
* 【英文文档】https://docs.npmjs.com/
* 【中文文档】
  * https://www.npmjs.cn/
  * https://cloud.tencent.com/developer/doc/1282
* 【内容交付网络】https://unpkg.com/