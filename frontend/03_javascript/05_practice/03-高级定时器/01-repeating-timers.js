/*
*
* 重复的定时器
*
* */

    // 1.0 普通实现
setInterval(function () {
    // ...
}, 200);

    // 2.0 链式模式实现
var interval = 200;
setTimeout(function () {
    setTimeout(arguments.callee, interval);
}, interval);


// setInterval异常情况模拟
function sleep(ms) {
    var startTime = +new Date;

    while (+new Date < startTime + ms) {

    }

    console.log('wake up...', new Date);
}

console.log('start timer...', new Date);
setInterval(function () {
    console.log('timer...', new Date);
    sleep(2000);
}, 1000);

console.log('start sleep...', new Date);
sleep(3000);