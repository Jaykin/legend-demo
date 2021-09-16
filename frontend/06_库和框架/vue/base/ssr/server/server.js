const fs = require('fs');
const path = require('path');

const server = require('express')();
const createApp = require('../src/entry-server.js');
const renderer = require('vue-server-renderer').createRenderer({
    template: fs.readFileSync(path.join(__dirname, './index.tmpl.html'), 'utf8')
});

server.get('*', (req, res) => {
    const context = {
        url: req.url
    };

    createApp(context)
        .then((app) => {
            return renderer.renderToString(app, {
                title: 'vue-ssr',
                metas: `
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta name="keyword" content="vue,ssr">
                    <meta name="description" content="vue srr demo">
                `
            })
        }).then(html => {
            res.end(html)
        }).catch((err) => {
            console.log(err);
            // 302 重定向 Locatioin
            // res.status(302).header('Locatioin', 'http://127.0.0.1:8080/404').end();
            res.status(500).end(err.toString());
        });
});

server.listen(8080, () => {
    console.log(`server 127.0.0.1:8080`);
});