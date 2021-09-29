
function sleep(ms) {
    const startTime = +new Date;

    while (+new Date < startTime + ms) {
    }
}

// 数组分块处理
function chunk(array, time, process) {
    let i = 0;
    const len = array.length;
    const delayFn = () => {
        const item = array[i];

        process(item);
        if (i < len) {
            i++;
            setTimeout(delayFn, time);
        } else {
            resolve(array);
        }
    }

    return new Promise((resolve, reject) => {
        setTimeout(delayFn, time);
    });
}

function process(item) {
    sleep(2000);
    console.log('process', item);
}

// 未分块时
// [1, 2, 3, 4].forEach(process);
// console.log(11111);

chunk([1, 2, 3, 4], 500, process).then((array) => {
    console.log('array done!');
});
console.log(11111);