

    var sleep = function (ms) {
        var sTime = +new Date;
        while (+new Date < sTime + ms) {

        }
        console.log(new Date, 'sleep finished');
    }


// 1.0 对比setTimeout 和 promise的异步执行时机
    console.log(new Date, 'script start');

    setTimeout(() => {
        console.log(new Date, 'setTimeout');
    }, 0);

    Promise.resolve().then(() => {
        sleep(1000);
        console.log(new Date, 'promise resolve1');
    }).then(() => {
        console.log(new Date, 'promise resolve2');
    });

    console.log(new Date, 'script end');


// 2.0 microtasks 与 tasks对比

        // task
    console.log(new Date, 'script start');

    setTimeout(() => {
        // task
        console.log(new Date, 'setTimeout');
    }, 0);

    Promise.resolve().then(() => {
        // microtask
        console.log(new Date, 'promise resolve1');
    })

    console.log(new Date, 'script end');