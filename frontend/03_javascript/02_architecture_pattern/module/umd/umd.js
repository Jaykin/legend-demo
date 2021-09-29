// 通用模块定义（Universal Module Definition）

;(function umd(root, moduleName, factory) {
    "use strict"; 
    if (typeof module === 'object' && typeof module.exports === 'object') {
        // commonjs
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // amd
        define(factory);
    } else if (typeof define === 'function' && define.cmd) {
        // cmd
        define(function(require, exports, module) {
            module.exports = factory();
        });
    } else if (typeof exports === 'object') {
        // es6 module
    } else {
        // 全局
        root[moduleName] = factory();
    }
})(typeof window !== "undefined" ? window : this, 'testModule', () => {
    // 模块代码
    return {
        a: 1,
    }
})