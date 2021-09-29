
const Rx = require('rxjs/Rx');

function quickStart() {
    // 通过Promise发射数据 1
    const source = Rx.Observable.fromPromise(new Promise(resolve => resolve(1)));

    // 为发射的数据执行操作 加10
    const example = source.map(val => val + 10);

    // 订阅 并 执行
    const subscription = example.subscribe(val => console.log(val));
}

// quickStart();

/**
 * 
 * 
*/
function example() {
    const source = Rx.Observable.create(observer => {
        console.log('01 - 创建序列源');
        console.log('02 - 发射新数据');
        observer.next('Jay');
        setTimeout(() => {
            console.log('02 - 发射新数据');
            observer.next('Vivian');
        }, 1000);
    });
    const source1 = source.map(val => {
        console.log('03 - 对数据进行转换');
        return `Hello，${val}!`;
    });
    const subscription = source1.subscribe(val => console.log(`04 - 执行并得到最终的数据：${val}`))

    // 使得观察者立即响应数据变更，而没有经过转换的环节
    subscription.next('BaoBao');
}
example();