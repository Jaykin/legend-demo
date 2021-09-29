const jwt = require('jsonwebtoken');

const { resResolve } = require('../errcode/index');
const CODE = require('../errcode/code');
const { jwtSettings } = require('../config');
const blackList = require('../middleware/jwtBlackList');


module.exports = function (req, res, next) {
    const token = req.query.token || req.body.token;

    if (req.url === '/api/auth/login') {
        next();
        return;
    }

    if (!token) {
        // 106
        res.send(resResolve(CODE.AUTH_UNVALID));
        return;
    }

    jwt.verify(token, jwtSettings.secret, (err, decoded) => {
        if (err) {
            if (blackList.has(decoded.data.createAt)) {
                blackList.delete(decoded.data.createAt);
            }
            res.send(resResolve(CODE.AUTH_UNVALID));
        } else if (blackList.has(decoded.data.createAt)) {
            res.send(resResolve(CODE.AUTH_UNVALID));
        } else {
            req._auth_ = decoded;
            req._token_ = token;

            if (req.body.token) {
                delete req.body.token;
            } else if (req.query.token) {
                delete req.query.token;
            }

            next();
        }
    });
};

