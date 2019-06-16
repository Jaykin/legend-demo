/**
 * retry 模块
 * --针对失败操作设置自定义重试策略
*/

const retry = require('retry');

function failingAsyncOperation(input, cb) {
    return setImmediate(cb.bind(null, new Error('A fatal error ')))
}

function attemptAsyncOperation(someInput, cb) {
    const opts = {
        retries: 2,
        factor: 2,
        minTimeout: 1 * 1000,
        maxTimeout: 2 * 1000,
        randomize: true
    }
    const operation = retry.operation(opts);

    operation.attempt(currentAttempt => {
        failingAsyncOperation(someInput, function(err, result) {
            if (err && err.message === 'A fatal error') {
                operation.stop();
                return cb(err);
            }
    
            if (operation.retry(err)) {
                return;
            }
    
            cb(operation.mainError(), operation.errors(), result);
        });
    })
}

attemptAsyncOperation('test input', (err, errors, result) => {
    console.warn('err: ');
    console.log(err);

    console.warn('result: ');
    console.log(result);
});

