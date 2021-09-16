# 严格模式 Strict Mode

## 概述
* `严格模式` 是采用具有 `限制性的 JavaScript 变体` 的一种方式，从而使代码显示地脱离 `马虎模式/懒散模式/sloppy 模式`
* 开启严格模式意味着一些语法的变化，一些运行时行为的变化
* 不支持（IE10 以下）和支持的浏览器在执行严格模式代码会采用不同的行为，使用前需要对 `运行环境进行特性测试` 来验证对严格模式的支持情况
* 严格模式的代码和非严格模式的代码可以共存，因此可以渐进式的使用
* 严格模式修复了一些导致 JS 引擎难以执行优化的缺陷，有时相同的代码，会比非严格模式运行的更快

## 严格模式的变化
>严格模式改变了语法及运行时的行为
### 1. 将之前被接受的过失错误认为是异常
JS 基于使新人更易上手，有时候会给本来错误操作赋予新的 `不报错的语义（non-error）`，这会为以后留下更大的问题，严格模式则 把这些失误当成错误   
* 无法再意外创建全局变量
    ```javascript
    'use strict'

    // 未声明的变量
    // 非严格：默认创建一个全局变量
    // 严格：抛出 ReferenceError
    undefinedVar = 1;
    ```
* 会使引起静默失败的赋值操作抛出异常（之前不会产生作用，也不会有错误反馈）
  ```javascript
  'use strict'

  // 给不可写变量或属性赋值
  NaN = 1;  // 不可写的变量，抛出 TypeError

  var obj1 = {};
  Object.defineProperty(obj1, 'x', { value: 2, writable: false });
  obj1.x = 9;   // 不可写属性，抛出 TypeError

  // 给只读属性赋值
  var obj2 = {
      get x() { return 2; }
  };
  obj2.x = 5;   // 只读属性，抛出 TypeError
  
  // 给不可扩展的新对象赋值
  var fixed = {};
  Object.preventExtensions(fixed);
  fixed.newProp = 1;    // 抛出 TypeError
  ```

* 试图删除不可删除的属性时会抛出异常（之前不会产生任何效果）
  ```javascript
  'use strict';

  delete Object.prototype;  // 抛出 TypeError
  ```
* 要求一个对象内的属性名必须唯一（之前重名属性是允许的，最后重名的属性决定其属性值）
  ```javascript
  'use strict';

  var o = { p: 1, p: 2 }    // 抛出 SyntaxError
  ```
* 要求函数的参数名唯一（之前最后一个重名参数名会覆盖之前的重名参数，被覆盖的参数仍然能通过 arguments[i] 访问）
  ```javascript
  // 非严格模式
  function sum(a, a, c) {
      console.log(arguments[0]);    // 第一个 a
      return a + a + c;
  }

  sum(1, 2);    // NaN
  sum(1, 2, 3); // 2 + 2 + 3 = 7

  // 严格模式
  function sumStrict(a, a, c) {     // 函数声明时报错 SyntaxError
      'use strict';
      return a + a + c;
  }
  sumStrict(1, 2);  // 函数未定义，报 ReferenceError
  ```
* 禁止八进制数字语法
* 禁止设置原始值（primitive）的属性（之前会忽略）
  ```javascript
  void function () {
      'use strict';

      false.true = '';          // TypeError
      (14).sailing = 'home';    // TypeError
      "with".you = 'fa';        // TypeError
  }()
  ```

### 2. 简化变量的使用
* 禁用 with 语句
* eval 不再为上层作用域引入新变量
  ```javascript
  // 非严格模式
    var b;
    void function () {
        var env = { b: 1 };
        b = 2;
        console.log('function b', b);
        with(env) {
            var b = 3;
            console.log('with b', b);
        }
    }()
    console.log('global b', b);
    // function b 2
    // with b 3
    // global b undefined   (说明全局 b 未被赋值，因为 with 里将 var b 引入到了上层函数中)

  // 严格模式
  ```
* 禁止删除声明的变量

### 3. 让 eval、arguments 变的简单

### 4. 让 JS 更安全

### 5. 为未来的 ECMAScript 版本做准备

## 使用严格模式
>严格模式可以 `应用到整个应用和个别函数`
### 1. 为脚本开启严格模式
过渡期最好在函数维度使用严格模式，避免合并非严格模式代码和严格模式代码时出现一些无法预料的问题
```javascript
// 在所有语句前放一个特定语句 "use strict" or 'use strict'
'use strict';
var a = 1;
```

### 2. 为函数开启严格模式
```javascript
function useStrict() {
    'use strict';
    return 1;
}

function noStrict() {
    return 1;
}
```

## 切换至严格模式
* 逐渐迁移，可分别改变文件，或者函数级的粒度迁移

# 参考
* 【MDN】https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode