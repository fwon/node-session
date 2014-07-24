var log4js = require('log4js');

log4js.configure({
    appenders: [
        { type: 'console' },
        {
            type: 'file',
            filename: 'logs/access.log',
            maxLogSize: 1024,
            backups: 3,
            category: 'normal',
            pattern: "-yyyy-MM-dd",
            alwaysIncludePattern: false
        }
    ],
    replaceConsole: true
});

exports.logger=function(name){
    var logger = log4js.getLogger(name);
    logger.setLevel('INFO');
    return logger;
};
exports.log4js = log4js;