/**
 * Created by Administrator on 2016/11/3.
 */

// check out https://github.com/tj/node-pwd

/**
 * Module dependencies.
 */

var crypto = require('crypto');

/**
 * Bytesize.
 */

var len = 128;

/**
 * Iterations. ~300ms
 */

var iterations = 12000;

/**
 * Hashes a password with optional `salt`, otherwise
 * generate a salt for `pass` and invoke `fn(err, salt, hash)`.
 *
 * @param {String} password to hash 需要被hash的密码
 * @param {String} optional salt
 * @param {Function} callback
 * @api public
 */

exports.hash = function (pwd, salt, fn) {
    if (3 == arguments.length) {
        crypto.pbkdf2(pwd, salt, iterations, len, function(err, hash){
            /* 该函数的功能：
                    返回密钥
               pwd：口令
            *  salt: 盐值
            *  iterations：迭代次数
            *  len：到处密钥的指定字节长度(正整数)
            *
            * */
            //console.log(hash);
            fn(err, hash.toString('base64'));
        });
    } else {
            //未定义盐值
        fn = salt;
        crypto.randomBytes(len, function(err, salt){
                // 生成密码学强度的伪随机数据，即salt （私钥）
                // length为返回的数据的长度
            if (err) return fn(err);
            // console.log(salt);     //这里生成的 salt 为buffer对象
            salt = salt.toString('base64'); //指定编码方式为base64
            crypto.pbkdf2(pwd, salt, iterations, len, function(err, hash){
                if (err) return fn(err);
                fn(null, salt, hash.toString('base64'));
            });
        });
    }
};