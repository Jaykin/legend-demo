// 主进程
const process = require('process');
const { fork } = require('child_process');
const cpus = require('os').cpus();
const server = require('net').createServer().listen(1337); // TCP 服务

let workers = {}; // 子进程列表

function createWorker() {
    const worker = fork('./worker.js');

    // 重启退出的进程
    worker.on('exit', () => {
        delete workers[worker.pid];
        createWorker();
    })

    // 传递 server 句柄到子进程
    worker.send('server', server);

    // 记录子进程列表
    workers[worker.pid] = worker;

    console.log(`子进程 ${worker.pid} 已启动...`);
}

console.log(`主进程 ${process.pid} 已启动...`);

// 创建工作子进程（是否应该 cpus - 1，主进程也需要）
cpus.forEach(() => createWorker());

// 关闭 server，可阻止其接收新的连接并保持现有的连接
server.close(); // 子进程会根据传过去的句柄还原 server 对象，所以这里仅关闭了主进程的 server

// 主进程退出时，kill 掉子进程
process.on('exit', () => {
    for (let pid in workers) {
        workers[pid].kill(); // 发送 SIGTERM 给子进程
    }
});
