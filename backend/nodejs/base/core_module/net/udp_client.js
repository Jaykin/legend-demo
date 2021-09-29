// udp 客户端

const dgram = require('dgram');
const message = Buffer.from('Hello, this is udp client!');

const client = dgram.createSocket('udp4', (msg, rinfo) => {
    // message handle
    console.log(`from server, msg: ${msg.toString()}`);
});

client.bind(41235, () => {
    // listening handle
}).send(message, 0, message.length, 41234, 'localhost', (err, bytes) => {
    // client.close();
});