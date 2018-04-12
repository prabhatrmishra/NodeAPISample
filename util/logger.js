var winston = require('winston');
var path = require('path');

var config = require(path.join(__dirname, '..', 'config'));

winston.emitErrs = true;

module.exports = new winston.Logger({
    transports: getInstances(),
    exitOnError: false
});

function getInstances() {
    var loggerInstances = [];
    
    loggerInstances.push(
        new winston.transports.Console({
            timestamp: true,
            level: 'silly',
            //json: true,
            colorize: true,
            //prettyPrint: true,
            humanReadableUnhandledException: true
        })
    );
    
    if(config.logFilePath) {
        loggerInstances.push(
            new winston.transports.File({
                filename: config.logFilePath,
                timestamp: true,
                level: 'debug',
                json: true,
                maxsize: 104857600,
                maxFiles: 10,
                zippedArchive: true
            })
        );
    }
    
    return loggerInstances;
}