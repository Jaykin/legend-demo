/**
 * promise-retry模块
 * 
*/

const pretry = require('promise-retry');

function asyncFunc(number) {
    const err = {
        errcode: 106,
        errmsg: '未登录'
    }

    return new Promise((resolve, reject) => {
        setTimeout(_ => {
            console.log('async hello');

            number == 2 ? resolve('this is fulfilled ...') : reject(err);
        }, 1000)
    })
}

pretry((retry, number) => {
    console.log('attempt number: ', number);

    return asyncFunc(number).catch(err => {
        err.errcode == 106 && retry(err)
    })
}, { 
    retries: 2 
}).then(value => {
    console.log('fulfilled: ', value)
}).catch(err => {
    console.log('rejected: ', err)
})