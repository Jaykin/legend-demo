# 微信小程序

## 框架 & 原理
>小程序框架 & 原理介绍 framework.md

## 运行时
>运行环境说明
* 运行环境：IOS、Android、IDE
* JS 支持情况
  * 不能使用 eval、new Function
  * ES6 API 支持情况
* 运行机制
  * 前台/后台状态
  * 冷启动/热启动/销毁
  * 更新机制

## 组件 component.md
### 内置组件

### 自定义组件

## API
>小程序能力集合

## 插件 plugin.md
>插件是对一组 js 接口、自定义组件或页面的封装，用于嵌入到小程序中使用

## 周边工具
1. 微信开发者工具
2. 命令行/Http 调用
>可指示工具进行登录、预览、上传等操作
3. 小程序自动化
>通过外部脚本操控小程序，实现小程序自动化测试

## 扩展能力
>提高小程序开发效率、质量等
1. UI 组件库
2. 封装的功能组件
    - recycle-view
3. 工具类库
4. 插件服务
5. 框架扩展
>扩展框架不拥有的能力
6. 统一构建环境
    - 脚手架
7. 多端开发
8. 热更新
   * 小程序禁止了 new Function、eval 的使用，可以用 JS 写一个 JS 解释器
9. npm 支持/第三方组件

## 云开发
>无需搭建服务器，使用云端能力，弱化后端和运维概念

## 服务端
>微信后端服务

## 开发模式
1. 第三方平台代开发
   * https://developers.weixin.qq.com/doc/oplatform/Third-party_Platforms/Third_party_platform_appid.html
2. 小程序插件开发
3. 企业微信小程序开发
4. PC 小程序开发

## 优化

## 参考
* 【官网】https://developers.weixin.qq.com/miniprogram/dev/framework/
