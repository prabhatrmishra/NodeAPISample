var path = require('path');
var restify = require('restify');
var fs = require('fs');


var logger = require(path.join(__dirname, '..', 'util', 'logger'));

var config = require(path.join(__dirname, '..', 'config'));
config.HTTP_PORT = config.HTTP_PORT || 9100;
config.HTTPS_PORT = config.HTTPS_PORT || 9101;
const PORT = process.env.PORT || 5000




exports.start = function() {
    
    var httpServer = {};
    if(config.SSLOn) {
        httpServer = restify.createServer({
            name: 'Service_Server',
            version: config.version,
            //certificate: fs.readFileSync(config.cerFile),
            //key: fs.readFileSync(config.keyFile)
        });
    } else {
        httpServer = restify.createServer({
            name: 'Service_Server',
            version: config.version
        });
    }
    
    var crossDomain = require(path.join(__dirname, '..', 'api', 'crossDomain'));
    crossDomain(httpServer);
    
    var parser = require(path.join(__dirname, '..', 'api', 'parser'));
    parser(httpServer);
    
    if(config.SSLOn) {
        httpServer.listen(PORT, function() {
            logger.info('Worker(HTTPS Server)', process.pid, 'started at', cPORT);
        });
    } else {
        httpServer.listen(PORT, function() {
            logger.info('Worker(HTTP Server)', process.pid, 'started at', PORT);
        });
    }

    // to connect with postgres db server 
    
    var postgresServer = require(path.join(__dirname, '..', 'api', 'dbServer'));
    //postgresServer.getpostgresdb();
    postgresServer(httpServer);
    // var redis = require(path.join(__dirname, 'initRedis'));
    // redis.connectRedis();
    
    var rulesApi = require(path.join(__dirname, '..', 'routes', 'rulesApi'));
    rulesApi(httpServer);
};
