/**
 * Created by Administrator on 2017/2/3.
 */
import { fetechDataCallback, fetechDataPromise } from '../src/assets/asynchronous';

test('async callback', (done) => {
    function callback(data) {
        expect(data).toBe('hello asyncCallback!');
        done();                             // 调用done来结束异步代码
    }

    fetechDataCallback(callback);
});

test('async promise', () => {
    return fetechDataPromise().then((data) => {             // 必须返回promise，否则测试会在异步代码执行完之前结束
        expect(data).toBe('success asyncPromise!');
    }, (data) => {
        expect(data).toBe('fail asyncPromise!');
    });
});