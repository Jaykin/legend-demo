// http client
const http = require('http');

const request = http.request({
    host: 'localhost',
    port: '8080',
    path: '/test',
    method: 'GET',
    timeout: 10000,
    headers: {
        'Content-Type': 'text/plain'
    }
}).on('socket', (socket) => {
    console.log('http.ClientRequest socket handle');
}).on('response', (response) => {
    console.log('http.ClientRequest response handle');

    response.on('data', (chunk) => {
            console.log(`response chunk: ${chunk}`);
        })
        .on('end', () => {
            console.log(`response chunk done`);
        });
}).on('error', (err) => {
    console.log('http.ClientRequest error handle');
    console.error(err);
});

request.write('this is http client!', 'utf8');
request.end();