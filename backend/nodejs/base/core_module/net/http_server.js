// http server
const http = require('http');

const server = http.createServer()
    .on('connection', () => {
        console.log('http.Server connection handle');
    })
    .on('request', (req, res) => {
        console.log('http.Server request handle');

        req.on('data', (chunk) => {
                console.log(`request chunk: ${chunk}`);
            })
            .on('end', () => {
                console.log(`request chunk done`);
                // 响应
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.write('this is server!', 'uft8');
                res.end();
            });
    })
    .on('close', () => {
        console.log('http.Server close handle');
    })
    .on('error', () => {
        console.log('http.Server error<net.Server> handle');
    })
    .on('clientError', (err) => {
        console.log('http.Server clientError handle');
        console.log(err);
        console.log(err.rawPacket.toString());
    });

// 同 net.Server 的 listen
server.listen(8080, 'localhost', () => {
    // listening handle
    console.log('server listening handle');
});