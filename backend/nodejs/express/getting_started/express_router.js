/**
 * Created by Administrator on 2016/11/2.
 */


    const express = require('express');
    const app = express();



    // 对网站首页的访问返回 "Hello World!" 字样
    app.get('/', function (req, res) {
        res.send('Hello World!');
    });

    // 网站首页接受 POST 请求
    app.post('/', function (req, res) {
        res.send('这是POST请求');
    });

    // /user 节点接受 PUT 请求
    app.put('/user', function (req, res) {
        res.send('这是PUT请求--/user');
    });

    // /user 节点接受 DELETE 请求
    app.delete('/user', function (req, res) {
        res.send('Got a DELETE request at /user');
    });

    var server = app.listen(3000, function () {
        console.log('express服务器开启成功："localhost:3000"');
    })