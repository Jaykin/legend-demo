

        /*
        * 这是http模块
        *
        * */

        var http = require('http');
        var url = require('url');

        function createService(route, handlers) {
            var server = http.createServer(function (req, res) {
                //
                var urlObj = url.parse(req.url);
                var pathname = urlObj.pathname;
                var method = req.method;

                console.log('log---accept request to '+ pathname +' for ' + method);

                route(pathname, method, handlers, res, req);

                //var reqPostData = '';
                //req.on('data', function (chunk) {
                //    reqPostData += chunk;
                //});
                //req.on('end', function () {
                //    route(pathname, method, handlers, res, reqPostData);
                //})
            });

            server.listen('9999', '192.168.3.103', function () {
                console.log('http服务开启成功：http://192.168.3.103:9999');
            })
        }

        module.exports = {
            start: createService
        }