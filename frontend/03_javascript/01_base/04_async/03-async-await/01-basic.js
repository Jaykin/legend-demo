/**
 * async/await
*/

async function timeout(time) {
   return new Promise(resolve => setTimeout(_ => resolve('hello'), time))
}

async function test01() {
    // resolved promise
    return await 123;
    return await Promise.resolve('123');

    // rejected promise
    await Promise.reject('error');
}

function run001() {
    test01().then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
}

// run001();


/**
 * 异步rejected不中断async函数
*/
async function test002() {
    // throw new Error('Error');
    try {
        await Promise.reject('Error');
    } catch(err) {

    }
    const ret = await Promise.resolve('hello nihao');
    console.log(ret);   // hello nihao
    
    return await Promise.resolve('hello');
}

function run002() {
    test002().then(res => console.log(res))
             .catch(err => console.log(err))
}

// run002();