// 双工流
const { Duplex } = require('stream');

class MyDuplexStream extends Duplex {
    constructor(options) {
        const superOptions = {};
        super(superOptions); // 调用父类构造函数
    }
}