const _  = require('lodash');
const jwt = require('jsonwebtoken');
const { jwtSettings } = require('../config');
const CODE = require('../errcode/code');
const { resResolve } = require('../errcode/index');

// const { users, secret } = jwtSettings;

const blackList = require('../middleware/jwtBlackList');

// 更加安全的策略，应该是，每个用户都有自己的一个 secret, 而且每次登录的时候都会刷新。
// 这样的话，旧 token 就无法认证成功。
// 另外，将 blackList 保存到数据里面，然后另外再跑一个进程，或者是任务，定期去处理掉过期的 token
// 放在内存里面，一旦应用重启，blackList 的信息就丢失了。
module.exports = function (app) {
    // app.post('/api/auth/login', (req, res) =>  {
    //     const { name, password } = req.body;

    //     console.log(req.body);

    //     const hasUser = _.some(users, user =>  user.name === name  && user.password === password);

    //     if (hasUser) {
    //         const token = jwt.sign({
    //             data:{
    //                 name,
    //                 createAt:Date.now()
    //             }
    //         }, secret, { expiresIn: '1 days' });
    //         res.send(resResolve(0, {
    //             name,
    //             token
    //         }));
    //     } else {
    //         res.send(resResolve(CODE.AUTH_USER_NOT_FOUND));
    //     }
    // });

    // app.post('/api/auth/logout', (req, res) => {
    //     const decoded = req._auth_;
    //     const token = req._token_;

    //     if (!blackList.has(decoded.data.createAt)) {
    //         blackList.set(decoded.data.createAt, token);
    //     }
    //     res.send(resResolve(0));
    // });
};

