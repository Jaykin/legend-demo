

        var p01 = new Promise(function(){});
        var p02 = p01.then();

        /*
        * Promise语法及基本原理研究
        * */
        var promise = new Promise(function (resolve, reject) {
            setTimeout(function () {
                console.log('async action');
                resolve('fulfilled');
            }, 0);
        });

        console.log('sync 01');

        var p2 = promise.then(function (data) {
            console.log(data);
            //throw new Error('链式调用被截断');
            return 'p2 value'
        }, function (err) {
            console.log('rejected');
            console.dir(err);
        }).then(function (data) {
            console.log(data);
        }, function (err) {
            console.dir(err);
        });

        console.log('sync 02');


        //1.0 Promise.all（iterable）

        var p1 = Promise.resolve(3);
        var p2 = 1337;
        var p3 = new Promise((resolve, reject) => {
            setTimeout(resolve, 100, "foo");
        })/*.then(function (data) {
                return data + 'foo';
            });*/

        Promise.all([p1, p2, p3]).then(values => {
            console.log(values);        // [3, 1337, "foo"]
        });

        Promise.all([]).then(values => {
            console.log(values);    // []   立即执行
        })


        //2.0 Promise.race(iterable)
        var p1 = new Promise(function(resolve, reject) {
            setTimeout(resolve, 500, "one");
        });
        var p2 = new Promise(function(resolve, reject) {
            setTimeout(resolve, 100, "two");
        });

        Promise.race([p1, p2]).then(function(value) {
            console.log(value); // "two"
            // 两个都完成，但 p2 更快
        });

        var p3 = new Promise(function(resolve, reject) {
            setTimeout(resolve, 100, "three");
        });
        var p4 = new Promise(function(resolve, reject) {
            setTimeout(reject, 500, "four");
        });

        Promise.race([p3, p4]).then(function(value) {
            console.log(value); // "three"
            // p3 更快，所以它完成了
        }, function(reason) {
            // 未被调用
        });

        var p5 = new Promise(function(resolve, reject) {
            setTimeout(resolve, 500, "five");
        });
        var p6 = new Promise(function(resolve, reject) {
            setTimeout(reject, 100, "six");
        });

        Promise.race([p5, p6]).then(function(value) {
            // 未被调用
        }, function(reason) {
            console.log(reason); // "six"
            // p6 更快，所以它失败了
        });


        // 3.0 Promise.reject(reason)
        Promise.reject("Testing static reject").then(function(reason) {
            // 未被调用
        }, function(reason) {
            console.log(reason); // "测试静态拒绝"
        });

        Promise.reject(new Error("fail")).then(function(error) {
            // 未被调用
        }, function(error) {
            console.log(error); // 堆栈跟踪
        });


        // 4.0 Promise.resolve(value)

        var p = Promise.resolve([1,2,3]);
        p.then(function(v) {
            console.log(v[0]); // 1
        });

        var original = Promise.resolve(true);
        var cast = Promise.resolve(original);
        cast.then(function(v) {
            console.log(v); // true
        });

                // resolve一个thenable对象
        var p1 = Promise.resolve({
            then: function (onFulfill, onReject) {
                onFulfill('fuifilled!');
            }
        });
        console.log(p1 instanceof Promise) // true, 这是一个Promise对象
        p1.then(function(v) {
            console.log(v); // 输出"fulfilled!"
        }, function(e) {
            // 不会被调用
        });

        var thenable = { then: function(resolve) {
            throw new TypeError("Throwing");
            resolve("Resolving");
        }};

        var p2 = Promise.resolve(thenable);
        p2.then(function(v) {
            // 不会被调用
        }, function(e) {
            console.log(e); // TypeError: Throwing
        });


        // 5.0 Promise.prototype.then

        var mp01 = new Promise(function (resolve, reject) {
            setTimeout(resolve, 1000, 'fulfilled!');
        });

        //mp01.then().then(function (data) {
        //    console.log(data);      // fulfilled!
        //});

        mp01.then(function (data) {
            console.log(data, 1);
            return new Promise(function (resolve) {
                setTimeout(resolve, 2000, 'pro-pro-fulfilled!')
            }).then(function (data) {
                    setTimeout(function () {
                        console.log(data, 3);
                    }, 3000);
                    return data;
                })
        }).then(function (data) {
            console.log(data, 2);
        });



        var mp02 = new Promise(function (resolve, reject) {
            setTimeout(resolve, 1000, 'fulfilled!');
        });

        mp02.then(function (data) {
            console.log(data);      // fulfilled!
            return data + data;
        });

        mp02.then(function (data) {
            console.log(data);      // fulfilled!
        });



