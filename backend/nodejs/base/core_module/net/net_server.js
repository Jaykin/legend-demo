// tcp 服务端

const net = require('net');

const server = net.createServer((serverSocket) => {
    // connection handle
    console.log(`connection handle 主机：${serverSocket.localAddress} 端口：${serverSocket.localPort}`);
    showConnectionCount(server);

    serverSocket.on('data', (data) => {
        // 请求数据 handle
        console.log('server accept data: ' + data);
        // 响应数据
        serverSocket.write('Hello Client!', 'utf8');
    }).on('end', () => {
        // 断开连接 handle
        console.log('server end!');
    });
}).listen({
    port: 2222,
    host: 'localhost'
}, () => {
    console.log(`服务器已启动 主机: localhost，端口：2222`);
}).on('error', (err) => {
    console.log(err);
});

// 获取连接数
function showConnectionCount(server) {
    server.getConnections((err, count) => {
        if (err === null) {
            console.log(`最大连接数：${server.maxConnections}, 当前连接数：${count}`);
        }
    });
}