# 小程序框架

## 1. 概述
### 1.1 小程序简介
```
1. 小程序是一种全新的连接用户与服务的方式，它可以在微信内被便捷地获取和传播，同时具有出色的使用体验
2. 为了解决移动网页遇到的体验不良的问题：首次白屏、页面切换的生硬、点击的迟滞感
3. 其次提供了更强大的原生能力、易用安全的微信数据开放、高效和简单的开发 
```

## 2. 运行环境/宿主环境
>渲染（WXML + WXSS）、脚本（JavaScript）运行在不同的线程中   
>一个小程序存在多个界面，所以渲染层存在多个 webview 线程（`这也是路由限制为 10 层的原因，过多的线程管理会耗费太多资源`），但只有一个 JS 线程（`这也是 setTimeout 会跨页面运行的原因`）    
>逻辑层运行在 JSCore 中，无完整的浏览器对象，故缺少相关的 DOM API 和 BOM API，同 Node.js 的环境也不相同，故 npm 包也无法运行     

运行环境|逻辑层|渲染层
---|:--:|:--
IOS|JavaScriptCore|WKWebView
Android|X5 JSCore|X5浏览器
开发工具|NWJS|Chrome WebView

### 2.1 渲染层和逻辑层
1. 通信模型
   * 渲染层 和 逻辑层 经微信客户端(Native)做中转进行通信
   * 逻辑层的网络请求由 Native 转发
2. 数据驱动
   * WXML 结构实际上就是一颗 DOM 树，通过一个 JS 对象可以表达出这颗 DOM 树，然后根据这个描述再渲染出真正的 DOM 树
   * WXML 上绑定数据模型，逻辑层通过 setData 将数据传到渲染层，再用 JS 对象描述这个新的 DOM，接着跟之前的 DOM 树比较的到变化的部分，再更新真正的 DOM 树（`这也是 setData 不要频繁调用的原因，因为每次 setData 就设计线程通信，比较耗费资源`）

### 2.2 程序与页面
1. App 的生命周期
   * 初次进入小程序的时候，微信客户端初始化好宿主环境
   * 同时从网络下载或者从本地缓存中拿到小程序的代码包，把它注入到宿主环境
   * 初始化完毕后，微信客户端就会给App实例派发onLaunch事件
   * 进入小程序之后，用户可以点击右上角的关闭，或者按手机设备的Home键离开小程序，此时小程序并没有被直接销毁，而是进入后台状态，客户端会给App实例派发onHide事件
   * 当再次回到微信或者再次打开小程序时，微信客户端会把“后台”的小程序唤醒，我们把这种情况称为“小程序进入前台状态”，客户端会给App实例派发onShow事件
   * `【App的生命周期是由微信客户端根据用户操作主动触发的。为了避免程序上的混乱，我们不应该从其他代码里主动调用App实例的生命周期函数】`
2. Page 的生命周期
   * Tabbar页面初始化之后不会被销毁

### 2.3 组件
>组件是小程序的基本组成单元，包括微信提供的基础组件和自定义组件

### 2.4 API
>宿主环境提供了丰富的API，可以很方便调起微信提供的能力   
>有部分API会拉起微信的原生界面，此时会触发Page的onHide方法，当用户从原生界面返回到小程序时，会触发Page的onShow方法

### 2.5 事件
>将用户在渲染层的行为反馈、组件的部分状态反馈抽象为渲染层传递给逻辑层的事件

### 2.6 兼容
>小程序的宿主环境一直在迭代更新，提供更多的能力给开发者去完成更多的事情，所以你的小程序会运行在不同版本的宿主环境下，需要做些兼容处理

## 3. 代码组成
>实体为 App、Page、Component 等，这些实体又由`【配置代码 JSON】` `【模板代码 WXML】` `【样式代码 WXSS】` `【逻辑代码 JS】`来描述   
* JSON 配置：是静态配置，需遵循 json 文件的语法
* WXML 模板（WeiXin Markup Language）
  ```
  是小程序框架设计的一套标签语言，结合小程序的基础组件、事件系统，可以构建出页面的结构
  还提供单向数据绑定、一些渲染指令、模板引用等能力
  ```
* WXSS 样式（WeiXin Style Sheets）
  ```
  是一套用于小程序的样式语言，用于描述WXML的组件样式，也就是视觉上的效果，类似 CSS，WXSS 对 CSS 做了一些补充以及修改

  尺寸单位（rpx）
    用来适配不同宽度的屏幕
    小程序内部会以 375 物理像素为基准（1rpx=1px），对 rpx 做一次 px 换算
    如：iphone6 的屏幕宽度为 375px，设备像素比为 2，那就有 750 个物理像素，那么 1rpx = 375 / 750 px = 0.5px

  支持样式引入、动态内联样式

  选择器
    优先级与权重同 css  
    支持的选择器：类选择器、id选择器、元素选择器、伪元素选择器、后代选择器

  小程序要求兼容到iOS8以下版本
    需要开启样式自动补全
  ```
* JavaScript
  ```
  开发业务逻辑以及调用小程序的 API 来完成业务需求

  不同于浏览器、Node.js 的实现
    ECMAScript + 小程序框架 + 小程序 API

  执行环境
    现用的最多的是 ECMAScript 5 和 ECMAScript 6 标准
    三大平台对 ECMAScript 6 标准的实现有差异，故可使用 ECMAScript 5 标准

  支持模块化

  执行顺序
    1. 执行入口文件 app.js，其中的模块根据 require 的先后顺序执行
    2. 执行 app.json 中定义的 pages 的脚本（按配置顺序执行）
  ```

## 4. 基础库
>小程序的基础库是 JavaScript 编写的，渲染层WebView层注入的称为WebView基础库，逻辑层注入的称为AppService基础库   
### 4.1 基础库载入时机
>启动小程序后先载入基础库，接着再载入业务代码，小程序的基础库不会被打包在某个小程序的代码包里边，它会被提前内置在微信客户端

### 4.2 异常捕获
>WebView侧使用window.onerror方案进行捕捉异常   
>在逻辑层AppService侧通过把App实例和Page实例的各个生命周期等方法包裹在try-catch里进行捕捉异常（`这也是 Promise 的错误无法捕获的原因`）

### 4.3 基础库更新
>小程序的很多能力需要微信客户端来支撑，微信客户端都是携带上一个稳定版的基础库发布的，等到微信客户端正式发布后，会开始灰度新的基础库(12h)，灰度结束后，用户设备上就会有新版本的基础库    
>灰度推送完成后，我们会发布新能力的文档，此时我们也会关注微信开发者社区的Bug反馈，根据情况再决定是否要推送Patch版本进行一些Bug的修复

## 5. 原理
### 5.1编译原理
>即将四大文件转为 webview 中能运行的代码

### 5.2 rpx 原理
>屏幕宽度适配

### 5.3 双线程模型
>渲染层、逻辑层在不同的线程运行
1. 技术选型
   * `使用 Hybrid 技术，界面主要由 Web 技术渲染，大量的接口提供丰富的客户端原生能力`
   * 每个页面使用不同的 webview 去渲染，避免单个 webview 的任务过于繁重，从而影响性能和体验
   * 界面渲染定义一套内置组件，提供一些基础和通用的能力，其中一些较复杂的组件是用原生渲染的（为了更好的体验和性能）
2. 管控与安全
   * 提供一个沙箱环境来运行开发者的 JavaScript 代码，这个沙箱环境不能有任何浏览器相关接口，只提供纯 JavaScript 的解释执行环境
   * 虽然 ServiceWorker、WebWorker 符合需求，但是小程序是一个多 webview 结构，并不好去用某个WebView中的ServiceWorker去管理所有的小程序页面
   * 使用客户端系统的 JavaScript 解释引擎（`iOS:内置的 JavaScriptCore,安卓:腾讯x5内核提供的JsCore环境`），执行有关小程序业务逻辑的代码，而界面渲染相关的任务全都在WebView线程里执行，通过逻辑层代码去控制渲染哪些界面
3. 天生异步
   * 因为双线程模型，`意味着任何数据传递都是线程间的通信，也就是都会有一定的延时`
   * 异步会使得渲染、逻辑层的运行时序复杂一些，框架会处理好，开发者只需关注生命周期即可

### 5.4 组件系统
>小程序的视图是在WebView里渲染的，在传统 HTMl 上，小程序设计了一套组件框架 `Exparser`，基于该框架，内置了一些基础组件；还有自定义组件的能力，以实现代码复用
1. Exparser 框架
   * 是微信小程序的组件组织框架，内置在基础库中
   * 小程序内的所有组件，都由 Exparser 组织管理
   * Exparser 的组件模型与 WebComponents 标准中的 ShadowDOM 高度相似
2. 内置组件
   * 基于Exparser框架，内置的一套组件
3. 自定义组件
   * 自定义组件是开发者可以自行扩充的组件，实现代码复用
   * 运行原理
     * 在使用自定义组件的小程序页面中，Exparser将接管所有的自定义`组件注册与实例化`
     * 每个页面有一个与之对应的组件，称为`“页面根组件”`，由 Page 定义
     * 初始化页面时，Exparser 会创建出页面根组件的一个实例
     1. `组件注册`：小程序启动时，构造器会将开发者设置的properties、data、methods等定义段，`写入Exparser的组件注册表`，被其它组件引用时，就可以根据这些注册信息来`创建自定义组件的实例`
     2. 根据组件注册信息，从组件原型上创建出组件节点的JS对象，即组件的this
     3. 将组件注册信息中的data 复制一份，作为组件数据，即this.data
     4. 将这份数据结合组件WXML，据此创建出Shadow Tree，由于Shadow Tree中可能引用有其他组件，因而这会`递归触发其他组件创建过程`
     5. 将ShadowTree拼接到Composed Tree上，并生成一些缓存数据用于优化组件更新性能
     6. 触发组件的created生命周期函数
     7. 如果不是页面根组件，需要根据组件节点上的属性定义，来设置组件的属性值
     8. 当组件实例被展示在页面上时，触发组件的attached 生命周期函数，如果Shadw Tree中有其他组件，也`逐个触发它们的生命周期函数`
4. 组件间通信
   * 全局事件管理
   * 父 -> 子：wxml 属性传值、selectComponent、relations
   * 子 -> 父：内部事件系统
5. `组件渲染流程`
   * Tree
      ```html
      <App>
        <PageA>
          <cmp-d>
          </cmp-d>
        </PageA>
        <PageB>
          <cmp-a>
            <cmp-b>
              <cmp-c>
              </cmp-c>
            </cmp-b>
          </cmp-a>
        </PageB>
      </App>
      ```
   * 流程
      ```
      App Before/After 调用 App 之前/之后
      Page Before/After 调用 Page 之前/之后
      Component Before/After 调用 Component 之前/之后

      页面按名称进行字符串排序后依次注册
      组件注册流程是？貌似有点混乱
      ```
     1. 宿主环境初始化（SDK 准备、代码包准备等）
     2. App 初始化
        - 执行 App 注册前的逻辑（顺序执行）
        - App() 注册小程序
        - 分别触发 App onLaunch、App: onShow
        - 执行 App 注册后的逻辑
     3. 注册所有组件
        - 执行注册前的逻辑 -> 调用 Component() 注册 -> 执行注册后的逻辑
        - 按组件树从上到下依次注册（并不触发生命周期）TODO 待确定
     4. 注册所有页面
        - 执行注册前的逻辑 -> 调用 Page() 注册 -> 执行注册后的逻辑
        - 按页面名称依次注册
     5. 创建当前页面的组件
        - 组件初始化(A->B-C)：created -> observers -> observer
        - 组件渲染：cmpA attached -> cmpB attached -> cmpC attached
     6. 触发页面、组件 ready 生命周期
        - Page onLoad
        - Component Page show：cmpA -> cmpB -> cmpC
        - Page onShow
        - Component ready：cmpA -> cmpB -> cmpC
        - Page onReady
      ```
      App Before 0
      App onLaunch 2ms
      App onShow 2ms
      App After 1ms
      Component A Before 2ms
      Component A After 24ms
      Component B Before 0ms
      Component B After 1ms
      Component C Before 0ms
      Component C After 1ms
      Page pageA Before 1ms
      Register: pages/pageA/pageA（注册页面 pageA）
      Page pageA After 3ms
      Component D Before 1ms
      Component D After 0ms
      Page pageB Before 1ms
      Register: pages/pageB/pageB（注册页面 pageB）
      Page pageB After 1ms
      On app route: pages/pageB/pageB（展示的当前页面）
      cmpA created 110ms
      cmpA observers 4ms
      cmpA observer 1ms
      cmpB created 1ms
      cmpB observers 1ms
      cmpB observer 1ms
      cmpC created 1ms
      cmpC observers 1ms
      cmpC observer 0ms
      cmpA attached 10ms
      cmpB attached 1ms
      cmpC attached 0ms
      Update view with init data（逻辑层 data 传递至渲染层）
      Page pageB onLoad 4ms
      cmpA Page show 2ms
      cmpB Page show 0ms
      cmpC Page show 1ms
      Page pageB onShow 1ms
      cmpA ready 23ms
      cmpB ready 0ms
      cmpC ready 1ms
      Page pageB onReady 2ms
      ```

### 5.5 原生组件
>内置组件中，有一些组件不完全在 ExParser 的渲染体系下，而是由客户端原生参与组件渲染，就是原生组件
1. 运行机制
   ```
   原生组件在 webview 层的渲染任务很简单，只需渲染一个占位元素，之后客户端在这个占位元素上叠一层原生界面即可
   因此，原生组件的层级会比其他普通组件高（如：input/textarea，注意处理弹窗的层级情况） 

   1. 组件被创建，组件属性依次赋值
   2. 组件插入 DOM 中，内核计算布局，读取组件的坐标值、宽高
   3. 组件通知客户端，在相同的位置上，插入一块原生区域，之后客户端就在这块区域渲染界面
   4. 当组件的位置、宽高变化时，组件会通知客户端做相应调整
   ```
2. 优势
   * `扩展 web 的能力`。如：input/textarea，有更好的控制键盘的能力
   * `体验更好，同时减少 webview 的渲染工作`。如：map 这类比较复杂的组件，适合交给更高效的客户端原生处理
   * `绕过 setData、数据通信、重渲染流程，使渲染性能更好`。如：canvas，可直接使用一套丰富的绘图接口进行绘制
3. 渲染限制
   * 一些 css 样式无法应用于原生组件，如：不能使用 overflow:hidden 来裁剪原生组件的显示区域，不能让原生组件产生旋转
   * 原生组件的层级正无穷大，可以考虑使用cover-view和cover-image组件，这两个组件也是原生组件，同样是脱离WebView的渲染流程外，而原生组件之间的层级就可以按照一定的规则控制

### 5.6 小程序与客户端通信
>涉及 webview <-> native、jscore <-> native
1. 视图层组件
   ```
   原生组件需要客户端原生提供的能力，则涉及视图层与客户端的交互通信

   IOS：使用 WKWebView 的 messageHandlers 特性
   Android：往 webview 的 window 对象注入一个原生方法，最终封装成 WeiXinJSBridge 的兼容层，提供调用(invoke)、监听(on)两种方法
   ```
2. 逻辑层接口
   ```
   IOS：往 JavaScripCore 框架注入一个全局的原生方法
   Android：同渲染层
   ```

## 6. 性能优化
### 6.1 启动
  * 代码包下载：尽量精简代码（删除无效、提高代码复用、资源外联）
  * 分包加载
  * 代码包加载
    ```
    小程序代码包被下载（或从缓存中读取）完成后，代码会被加载到相应的线程中执行。
    此时，所有 app.js、页面所在的 js 文件及其他被 require 的 JS 文件会被自动执行一次，基础库会完成所有页面的注册。
    如果一个页面被多次创建，并不会使得这个页面所在的JS文件被执行多次，而仅仅是根据初始数据多生成了一个页面实例（this），在页面JS文件中直接定义的变量，在所有这个页面的实例间是共享的（如：多商详页）。
    ```

### 6.2 页面层级准备 & 初始化
  ```
  在视图层内，小程序的每个页面都独立运行在一个页面层级上，对于每一个新的页面层级，视图层都需要进行一些额外的准备工作。
  在小程序启动前，微信会提前准备好一个页面层级用于展示小程序的首页，之外，每当一个页面层级被用于渲染页面，微信都会提前开始准备一个新的页面层级，使得下一次能尽快展示一个新的页面。

  对于wx.redirectTo，这个调用不会打开一个新的页面层级，而是将当前页面层级重新初始化
  ```
  跳转这段时间是否可以被利用，做些操作！
  * 第一阶段：启动 webview
  * 第二阶段：webview 中初始化基础库
  * 第三阶段：注入小程序 WXML 结构和 WXSS 样式（这一阶段在小程序启动前无法执行的）
  * 逻辑层传输初始数据至渲染层（注意控制数据大小，传输时间与数据量大体上呈现正相关关系）
  * 渲染层接收数据后进行初始化渲染
  * 初始渲染完后通知逻辑层 onReady
  
### 6.3 数据通信
>逻辑层向视图层发送页面数据、视图层向逻辑层反馈用户事件
  * `初始数据通信`：即页面的初始数据传递
  * `更新数据通信`：即调用 setData 后的数据传递
    * 在数据传输时，逻辑层会执行一次JSON.stringify来去除掉setData数据中不可传输的部分，同时，还会将setData所设置的数据字段与data合并，之后将数据发送给视图层
    * 优化点
      1. `减少通信频率`：不要过于频繁调用setData，应考虑将多次setData合并成一次setData调用
      2. `减少通信数据量`：与界面渲染无关的数据最好不要设置在data中，可以考虑设置在page对象的其他字段下
  * `用户事件通信`：视图层会接受用户事件，若事件绑定了事件回调函数，会将信息反馈给逻辑层，没绑则不会。延迟时间与传输的数据量正相关
    * 优化点
      1. 去掉不必要的事件绑定（WXML中的bind和catch），从而减少通信的数据量和次数
      2. 事件绑定时需要传输target和currentTarget的dataset，因而不要在节点的data前缀属性中放置过大的数据

### 6.4 视图层渲染
  * `初始渲染`：收到初始数据时需要执行初始渲染
    * 将初始数据套用在对应的WXML片段上生成节点树，根据节点树包含的各个节点，在界面上依次创建出各个组件
    * 在这整个流程中，时间开销大体上与节点树中节点的总量成正比例关系
  * `重渲染`：每次收到更新数据时需要执行重渲染
    * 将data和setData数据套用在WXML片段上，得到一个新节点树
    * 将新节点树与当前节点树进行比较，得出需要更新的部分（会着重比较setData数据影响到的节点属性）
    * 将setData数据合并到data中，并用新节点树替换旧节点树，用于下一次重渲染
  * 优化点
    1. `减少WXML中节点的数量` 可以有效降低初始渲染和重渲染的时间开销
    2. 去掉不必要设置的数据(减少比较时间)、减少setData的数据量

### 6.5 原生组件通信
>一些原生组件支持使用context来更新组件，不同于setData，使用context来更新组件并不会涉及到重渲染过程，数据通信过程也不同   
>使用context时，数据从逻辑层传到native层后，直接传入组件中

## 7. 概念解析
* JsCore & 与原生通信
* WKWebView & 与原生通信