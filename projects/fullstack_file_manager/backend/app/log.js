const env = require('./env');
const log4js = require('log4js');

log4js.configure({
    appenders:[
        { type:'console' },
        {
            type: 'dateFile',
            filename: 'log/access.log',
            pattern: '-yyyy-MM-dd.log',
            alwaysIncludePattern: false
        }
    ],
    replaceConsole:true
});


exports.logger = function (name) {
    const logger = log4js.getLogger(name);
    if (env.isDev()) {
        log4js.setGlobalLogLevel(log4js.levels.ALL);
    } else {
        log4js.setGlobalLogLevel(log4js.levels.INFO);
    }
    return logger;
};
