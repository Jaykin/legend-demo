// 创建服务端应用程序
const createApp = require('./app.js');

const getData = function () {
    return new Promise((resolve, reject) => {
        resolve('这是异步数据...');
    });
}

module.exports = function (context) {
    return new Promise(async (resolve, reject) => {
        let url = context.url;  
        context.propsData = 'props data';
        context.asyncData = await getData();

        const { app, router } = createApp(context);

        router.push(url);
        router.onReady(() => {
            let matchedComponents = router.getMatchedComponents();

            if (!matchedComponents.length) {
                router.replace('/404'); // 转跳 404
            }

            resolve(app);
        });
    });
}