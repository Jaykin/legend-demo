// 工作进程
const process = require('process');
const http = require('http');

const httpServer = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(`子进程 ${process.pid} 处理了请求...`);
});

// 监听进程通信的信息
let worker;
process.on('message', (msg, tcpServer) => {
    if (msg === 'server') {
        worker = tcpServer;
        worker.on('connection', (socket) => {
            httpServer.emit('connection', socket);
        });
    }
});

// 监听进程未捕获的错误
process.on('uncaughtException', () => {
    // 停止接收新连接，等连接都结束后退出
    worker.close(() => process.exit(1));
});