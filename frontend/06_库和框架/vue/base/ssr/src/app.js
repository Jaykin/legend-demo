const Vue = require('vue');
const createRouter = require('./router/index.js');

module.exports = function createApp(context) {
    const router = createRouter();
    const app = new Vue({
        router: router,
        data: {
            message: 'Vue SSR!',
            propsData: context.propsData,
            asyncData: context.asyncData
        },
        template: `
            <div>
                <h1>{{ message }}</h1>
                <p>{{ propsData }}</p>
                <p>{{ asyncData }}</p>
                <ul>
                    <li>
                        <router-link to="/">home</router-link>
                    </li>
                    <li>
                        <router-link to="/about">about</router-link>
                    </li>
                    <li>
                        <router-link to="/person">404</router-link>
                    </li>
                </ul>
                <router-view></router-view>
            </div>
        `
    });

    return {
        app,
        router
    }
};