// 创建纯客户端应用程序
const createApp = require('./app.js');
let { app, router } = createApp({});

router.onReady(() => {
    app.$mount('#app');
});