


        /*
        *
        * 缓存ajax数据(异步数据)
        *
        *
        * */


        var fetchSomething = function () {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve({
                        a: 1,
                        b: 2
                    });
                }, 1000);
            })
        }

        var proxyCacheFetch = (function () {
            var cache = {};

            return function (page, cb) {
                if (page in cache) {
                    cb && cb(cache[page]);
                } else {
                    fetchSomething(page).then(function (data) {
                        cb && cb(cache[page] = data);
                    }).catch(function () {
                        throw new Error('fetch failed!');
                    });
                }
            }
        })();

        console.log(new Date, '开始fetch');
        proxyCacheFetch(1, function (data) {
            console.log(new Date, '结束fetch');
            console.dir(data);
        });


        console.log(new Date, '开始fetch');
        proxyCacheFetch(1, function (data) {
            console.log(new Date, '结束fetch');
            console.dir(data);
        });