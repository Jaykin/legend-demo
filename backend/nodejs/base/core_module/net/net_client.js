// tcp 客户端

const net = require('net');

const socket1 = net.createConnection({
    port: 2222,
    host: 'localhost',
    timeout: 10000  // 10S 
}, () => {
    // connect handle
    console.log(`socket1 已建立连接 主机：${socket1.localAddress} 端口：${socket1.localPort}`);

    // 发送请求数据
    socket1.write('Hello Server!', 'utf8');
}).on('data', (data) => {
    // 响应数据 handle
    console.log('client accept data: ' + data);
}).on('end', () => {
    // 断开连接 handle
    console.log('client end!');
}).on('error', (err) => {
    // 错误 handle
    console.error(err);
});

const socket2 = net.createConnection({
    port: 2222,
    host: 'localhost',
    timeout: 10000  // 10S 
}, () => {
    // connect handle
    console.log(`socket2 已建立连接 主机：${socket2.localAddress} 端口：${socket2.localPort}`);
});