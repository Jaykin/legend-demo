/**
 * Created by Administrator on 2016/11/2.
 */

    'use strict';
    const express = require('express');
    const app = express();

        //静态资源管理
    app.use(express.static('public'));

    app.get('/', (req, res) => {
        res.sendFile('E:\\JAY\\workspace\\git\\learn-nodejs\\express\\routers\\router_customer.html');
    });

    app.get('/login', (req, res) => {
        res.send('这是GET请求，路由为/login');
    });

    app.post('/goods', (req, res) => {
        res.send('这是POST请求，路由为/goods');
    });

    app.put('/chat', (req, res) => {
        res.send('这是PUT请求，路由为/chat');
    });

    app.delete('/go', (req, res) => {
        res.send('这是DELETE请求，路由为/go');
    });

    app.listen(3000, () => {
        console.log('服务开启成功："localhost:3000"');
    });