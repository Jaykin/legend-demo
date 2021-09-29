// udp 服务端

const dgram = require('dgram');

const server = dgram.createSocket('udp4'); // udp4、udp6

server.on('message', (msg, rinfo) => {
    if (msg) {
        console.log("server got: " + msg + " from " + rinfo.address + ":" + rinfo.port); 
        let message = 'this is Server!';
        server.send(message, 0, message.length, 41235, 'localhost');
    }
}).on('listening', () => {
    const address = server.address();
    console.log("server listening " + address.address + ":" + address.port); 
}).bind(41234);