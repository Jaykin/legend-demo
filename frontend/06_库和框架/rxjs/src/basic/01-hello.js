
const Rx = require('rxjs/Rx');

function getType(data) {
    return Object.prototype.toString.call(data);
}

/**
 * observable   数据流（被观察者）
 * observer     观察者
 * subscription 上述两者的关联关系
*/
let observable = Rx.Observable.create(observer => {
    try {
        console.log('observer start...');
        observer.next(1);
        observer.next(2);
        observer.complete();
        observer.next(3);
    } catch(err) {
        observer.error(err)
    }
});

let observerFunc = data => console.log(data);
let observerObj = {
    next: function(data) {
        console.log(data)
    },
    complete: function () {
        console.log('observer complete...')
    },
    error: function (err) {
        console.error(err) 
    }
}

// observable.subscribe(observerFunc);
let subscription = observable.subscribe(observerObj);

// setTimeout(() => {
//     subscription.unsubscribe();
// }, 1000);