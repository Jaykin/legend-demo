
    var server = require('./http');
    var route = require('./router');
    var handlers = require('./handlers');

    // 开启http服务
    server.start(route, handlers);