
    /*
    *
    * 路由模块
    *
    * */

    function route(pathname, method, handlers, res, req) {
        console.log('log--a request for ' + pathname + ' and ' + method);

        if (typeof handlers[pathname] === 'function') {
            handlers[pathname](res, req);
        } else {
            console.log('no request handler found for ' + pathname);
            res.writeHeader('200', 'maybe success', {
                'Content-Type': 'text/html'
            });

            res.write('<h2>404 Not Found ! </h2>');

            res.end();
        }
    }

    module.exports = route;