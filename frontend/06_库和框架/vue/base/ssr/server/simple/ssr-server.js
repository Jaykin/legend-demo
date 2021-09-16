const fs = require('fs');

const Vue = require('vue');
const { url } = require('inspector');
const server = require('express')();

// 创建 vue 实例
function createApp(context) {
    return new Vue({
        data: {
            url: context.url
        },
        template: `
            <div>
                <div>Hello, SSR!</div>
                <div>访问的 URL 是： {{ url }}</div>
            </div>
        `
    });
}

// 创建 renderer
const renderer = require('vue-server-renderer').createRenderer({
    template: fs.readFileSync('../index.tmpl.html', 'utf8')
});

// 创建服务
server.get('*', (req, res) => {
    // 创建 Vue 实例
    const app = createApp(req);

    // app => html
    const context = {
        title: 'vue-ssr',
        metas: `
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="keyword" content="vue,ssr">
            <meta name="description" content="vue srr demo">
        `
    };
    renderer.renderToString(app, context)
        .then((html) => {
            res.end(html);
        }).catch((err) => {
            res.status(500).end(err.toString());
        });
});
server.listen(8080, () => {
    console.log(`server 127.0.0.1:8080`);
});