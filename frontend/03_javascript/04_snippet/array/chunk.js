// 分块处理
function chunk(array, time, process) {
    var context = this;

    return new Promise((resolve, reject) => {
        setTimeout(function () {
            var item = array.shift();

            process.call(this || null, item);

            if (array.length > 0) {
                setTimeout(arguments.callee, time)
            } else {
                resolve()
            }
        }, time);
    })
}

// test
chunk([1, 2, 3, 4], 1000, process).then(() => {
    console.log('array chunk done...');
});