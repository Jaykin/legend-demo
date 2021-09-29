/**
 * 面向切面编程 AOP
 * 
 * 原理：在目标方法前后加入代码，主要使用 call/apply 来劫持，实现方式根据场景来设计
 * 目的：将一些跟核心业务逻辑模块无关的功能抽离出来，如：日志、埋点、异常处理。
 *       可保证业务代码纯净、高内聚，方便复用抽离的功能模块
 * 优点：抽离非核心业务模块并复用，降低耦合，提高代码的可维护性、可重用性
 * 缺点：
 * 应用：
 *      - 计算函数执行时间
 *      - 表单提交前的验证
 *      - 怎么抽离防御性代码？代码检查
*/

// 前置通知（即函数执行前）
Function.prototype._before = function (func) {
    const _self = this;

    return function () {
        func.apply(_self, arguments);
        return _self.apply(_self, arguments);
    }
}

// 后置通知（即函数执行后）
Function.prototype._after = function (func) {
    const _self = this;
    return function () {
        const ret = _self.apply(_self, arguments);
        func.apply(_self, arguments);
        return ret;
    }
}

// 环绕通知（提取当前函数的执行权，交给另一个函数，由用户自己决定什么时候执行）
Function.prototype._around = function (func) {
    const _self = this; // 源函数

    // 执行函数
    return function () {
        return func.apply(this, [createInvoke(_self, arguments)]);
    }
}

function createInvoke(sourceMethod, args) {
    let isApply = false;
    let result = void 0;

    return {
        invoke: function (sourceThis) {
            if (isApply) {
                // 调用过则不重复调用
                console.log('Warning: 不能重复调用');
                return;
            }

            isApply = true;
            result = sourceMethod.apply(sourceThis || sourceMethod, args);
            return result;
        },
        getResult: function () {
            return result;
        }
    }
}

// demo1
function sayHello(name) {
    console.log(`Hello, ${name} !`);
}

sayHello = sayHello
    ._before(function (name) {
        console.log(`Say Hello To ${name} Before!`);
    })
    ._after(function (name) {
        console.log(`Say Hello To ${name} After!`);
    });

// sayHello('Jay');

// demo2
function validate(bool) {
    console.log('1. 表单校验');
    return bool;
}

function submit(bool) {
    console.log('3. 表单提交');
    return { submit: bool };
}

submit = submit._around(function (fn) {
    if (validate(true)) {
        console.log('2. 表单校验通过');
        const rst = fn.invoke(this);
        console.log(fn.getResult() === rst);
        fn.invoke(this);
    } else {
        console.log('2. 表单校验不通过');
    }
});

submit(true);