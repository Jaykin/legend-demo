// 1、严格模式
function strictModeFunc() {
    'use strict';
    // 1.1 将过失错误转成异常
    unsafeVar = 1;          // ReferenceError

    // 1.2 简化变量的使用

    return 'use strict mode';
}