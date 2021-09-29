// 可读流
const { Readable } = require('stream');

// 1、直接创建流对象
const myReadableStream = new Readable({
    // 对 stream._read() 方法的实现
    read(size) {
        console.log('【1】call readable._read() start...');
        console.log('【1】call readable._read() end...');
    },

    // 对 stream._destroy() 方法的实现
    destroy(err, callback) {
        console.log('【1】call readable._destroy() start...');
        console.log('【1】call readable._destroy() end...');
    }
});

// 2、继承基本流
class MyReadableStream extends Readable {
    constructor(options) {
        const superOptions = options;

        // 调用父类构造函数
        super(superOptions); 

        this._max = 3;
        this._index = 1;
    }

    // 对 stream._read() 方法的实现
    _read(size) {
        console.log('【2】call readable._read() start...');

        const i = this._index++;
        if (i > this._max) {
            this.push(null);
        } else {
            const str = String(i);
            const buf = Buffer.from(str, 'ascii');
            this.push(buf);
        }

        console.log('【2】call readable._read() end...');
    }

    // stream.destroy() 会调用
    _destroy(err, callback) {
        console.log('【2】call readable._destroy() start...');
        console.log('【2】call readable._destroy() end...');
    }
}


const readStream1 = new MyReadableStream();
readStream1.on('readable', function () {
    const cacheBuf = this.readableBuffer;
    if (cacheBuf.length >= this._max) {
        console.log('readable: ', this.read());
    }
});