## 概述
>PostCSS 是一个允许使用 JS 插件转换样式的工具，提供一些能力，可以基于它实现 lint、自定义语法等很多功能

>原理：**parse(AST) -> plugins(节点操作) -> stringify(生成)**
## 基础
### 核心模块
1. Tokenizer（lib/tokenize.es6）
   >又叫词法分析器(lexer)，接收 CSS 字符串，输出 tokens
2. Parser（lib/parse.es6,lib/parser.es6）
   >将 tokens 转为 AST
3. Processor（lib/processor.es6）
   >用来初始化插件和运行语法转换
4. Stringifier（lib/stringify.es6,lib/stringifier.es6）
   >将 AST 转换成 CSS 字符串

## 插件
>一个接收并转换解析器生成的 CSS 抽象语法树的函数，好的插件需要遵守一些规则（定义如何处理 CSS）

## 运行器
>runner 是一个通过用户自定义的插件列表来处理 CSS 的工具（管理插件的处理流程）

## 自定义语法
>可以转换任何语法的样式，不仅仅局限于 CSS
1. 解析器 Parser
    >将传入的字符串解析成节点树，string -> tokens -> AST   

    是一个函数，接收一个字符串和一个选项对象作为参数
    ```javascript
    const postcss = require('postcss');
    module.exports = (code, opt) => {
        const root = postcss.root();
        // 将 code 解析成节点并添加到 root 节点
        return root;
    }
    ```

2. 生成器 Stringifier
    >将节点树生成并输出字符串

3. 语法 Syntax
    >包含解析器和生成器   

    用一个普通对象来定义，包含 `parse` 和 `stringify` 函数   
    ```javascript
    module.exports = {
        parse: () => { /* 解析函数 */ },
        stringify: () => { /* 生成函数 */ }
    }
    ```

## 参考
* 【Github】https://github.com/postcss/postcss/blob/master/README-cn.md
* 【搜索插件】
    - https://github.com/postcss/postcss/blob/master/docs/plugins.md
    - https://www.postcss.parts/
* 【awesome-postcss】https://github.com/jdrgomes/awesome-postcss
* 【学习指南】https://webdesign.tutsplus.com/series/postcss-deep-dive--cms-889