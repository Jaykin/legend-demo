const VueRouter = require('vue-router');
const Vue = require('vue');

Vue.use(VueRouter);

module.exports = function createRouter() {
    return new VueRouter({
        mode: 'history',
        routes: [{
            path: '/',
            component: {
                template: `
                    <div>Home Page</div>
                `
            },
            name: 'home'
        }, {
            path: '/about',
            component: {
                template: `
                    <div>About Page</div>
                `
            },
            name: 'about'
        }, {
            path: '/404',
            component: {
                template: `
                    <div>404 Page</div>
                `
            },
            name: '404'
        }]
    })
}