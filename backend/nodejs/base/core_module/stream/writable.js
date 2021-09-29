// 可写流
const { Writable } = require('stream');

class MyWritableStream extends Writable {
    constructor(options) {
        const superOptions = {};
        super(superOptions); // 调用父类构造函数
    }
}