/*
*
* 脚本运行时间过长问题
*
* */

    // 1.0 普通运行
var array = [1, 2, 3];

for (var i = 0; i < array.length; i++) {
        // 假设该process运行时间很长
    process(array[i]);
}


    // 2.0 数组分块处理
function process(item) {
    console.log(item);
}

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

chunk([1, 2, 3, 4], 1000, process).then(() => {
    console.log('array chunk done...');
});