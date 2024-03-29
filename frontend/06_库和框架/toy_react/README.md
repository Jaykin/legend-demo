### 概述
- 构建用户界面，解脱 DOM 操作的 view 层框架
### 核心技术
- **JSX**
  - 概述
    - 是 JavaScript 的扩展语法糖，类似模板语言但功能更丰富
    - 为了 (html + css) in js，充分利用 js 的能力以自定义的方式（底层是传统的dom操作）来控制 html + css
  - 语法
    - 描述 dom 结构
      - 同 html 标签语法 + 支持自定义标签(组件)
      - 标签属性
        - key 用驼峰命名
        - class => className
      - 子标签
        - 支持 js 对象（React 统一的元素对象）
    - {}：可包含 JS 表达式
    - ""：包含字符串字面量
  - 编译
    - 由 @babel/preset-react 进行编译
    - 标签解析
      - 会被解析为普通的函数调用（React.createElment），然后计算出一个 js 对象（描述 dom）
        - React.createElment 接收参数
          - type：标签名字符串(string)、React 组件类型(类/函数)
          - [props]: 标签属性k-v
          - [...children]: 子元素集合
      - 子标签
    - 怎么用 js 对象来描述 dom？
      - dom 类型（标签名称）
      - dom 属性（attrs）
        - 简单类型（string/number/boolean），包括 className、style
        - js 脚本类型（事件绑定）
          - 事件名使用驼峰
          - 使用合成事件对象
      - dom 子节点
  - 渲染
    - 初始渲染：经过编译及 React.createElement 后会生成用于描述 dom 的 js 对象(React元素/vdom)，然后使用 dom API 来构建出 dom 节点，接着挂载到指定的真实 dom 节点上
    - 更新渲染：重新生成 newVdom，然后比较 oldVdom，得到需要修改的地方，然后使用 dom api 来更新变化的地方
- **组件化**
  - 概述
    - 部分机制类似 html 元素，基于基本的 html 元素，扩展出具有更丰富功能的元素
    - 可组合、可嵌套
  - 组件分类：自定义组件 + HTML 原生 Element（可做自定义包装）
  - 组件定义
    - 概述
      - 类似函数，接收任意的入参（props），返回用于描述页面展示内容的 React元素
      - React 会将以小写字母开头的组件视为原生 DOM 标签
    - 分类
      - 函数组件
        - 即接收 props 参数，返回 React元素的函数
      - class 组件
        - 即继承 React.Component 的类
    - 组件数据
      - props
        - 只读，外部传入
      - state
        - 写读，存储组件自身状态
    - 组件生命周期
      - 挂载（mount）：componentDidMount，组件第一次被渲染到 dom
      - 卸载（unmount）：componentWillUnmount，组件 dom 被删除
  - 组件渲染
    - 单个渲染
    - 子组件渲染
    - 条件渲染
    - 列表渲染
  - 组件复用
    - 组合 && props（可接收任意类型），不需使用组件继承
- **Virtual DOM**
  - 概述
    - 用 JS 对象来描述 DOM 结构
  - 创建
  - 更新