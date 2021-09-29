/**
 * micro-task：（微任务）Promise、process.nextTick
 * macro-task：（宏任务）整体代码、setTimeout、setInterval
 * 
*/

function runTask01() {
    setTimeout(_ => {
        console.log('setTimeout');
    }, 0);
    
    new Promise((resolve, reject) => {
        console.log('promise');
        resolve();
    }).then(_ => {
        console.log('fulfilled');
    });
    
    console.log('main script');
}

function runTask02() {
    console.log(1);

    setTimeout(() => {
        console.log(2);
        process.nextTick(() => {
            console.log(3);
        });

        new Promise(resolve => {
            console.log(4);
            resolve();
        }).then(() => {
            console.log(5);
        })
    });

    process.nextTick(() => {
        console.log(6);
    });

    new Promise(resolve => {
        console.log(7);
        resolve();
    }).then(() => {
        console.log(8);
    });

    setTimeout(() => {
        console.log(9);

        process.nextTick(() => {
            console.log(10);
        });

        new Promise(resolve => {
            console.log(11);
            resolve();
        }).then(() => {
            console.log(12);
        })
    })
}

runTask02();