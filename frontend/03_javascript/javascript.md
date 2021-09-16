# JavaScript

## JavaScript 引擎
>专门处理 JS 脚本的虚拟机
* `V8` Google Chrome、安卓
* `SpiderMonkey` 网景公司
* `JSCore` JavaScriptCore，Apple Safari、ios（封装在 WKWebView 中的叫 Nitro）
  * webkit 内核（渲染引擎+JS引擎+其他）默认的 JS 引擎，V8 也是基于其开发的
  * android 和 ios 的 webview 控件均使用 webkit
* `Chakra` JScript 引擎，微软