/**
 * Created by Administrator on 2016/10/31.
 */

    //
    'use strict';
    setTimeout(function () {
        console.log('--------setTimeout--------0---');
    }, 0);

    setImmediate(function () {
        console.log('--------setImmediate--------------');
    });

    let a = 9;

    module.exports = {
        a:1,
        b:2
    }
