/**
 * 异步队列处理
 * @param {Array} fns - 返回promise的函数列表
 * @param {Number} count - 并发数目
*/

export default function queue(fns, count) {
    return new Promise((resolve, reject) => {
        let a = fns.slice(0, count);
        let b = fns.slice(count);
        let len = fns.length;           // 需执行的函数列表长度
        let runs = 0;                   // 
        let next = (resolve, reject) => {
            let fn = b.shift();

            if (!fn) return;

            return fn().then(() => {
                runs += 1;

                if (runs === 1) return resolve();

                return next()
            }, reject)
        }

        if (len === 0) return resolve();
        
        for (let fn of a) {
            fn().then(() => {
                runs += 1;

                if (runs === 1) return resolve();

                return next(resolve, reject);
            }, reject)
        }
    })
}