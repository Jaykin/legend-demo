// 转换流
const { Transform } = require('stream');

class MyTransformStream extends Transform {
    constructor(options) {
        const superOptions = {};
        super(superOptions); // 调用父类构造函数
    }
}