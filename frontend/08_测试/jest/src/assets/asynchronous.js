/**
 * Created by Administrator on 2017/2/3.
 */
//  1.0 callback
const fetechDataCallback = (callback) => {
    const data = 'hello asyncCallback!';
    setTimeout(() => {
        callback(data);
    }, 1000);
}

// 2.0 promise
const fetechDataPromise = () => {
    const resolveData = 'success asyncPromise!';
    const rejectData = 'fail asyncPromise!';
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            //resolve(resolveData);
            reject(rejectData);
        }, 1000);
    });
}

export { fetechDataCallback, fetechDataPromise };
