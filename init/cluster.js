//var cluster = require('cluster');
var numCpus = require('os').cpus().length;
var path = require('path');

var server = require(path.join(__dirname, 'server'));
/*
var logger = require(path.join(__dirname, '..', 'util', 'logger'));

if(cluster.isMaster) {
    logger.info('Master', process.pid, 'is running');
    
    for(let i = 0; i < 1; i++) {
        cluster.fork();
    }
    
    cluster.on('exit', function(worker, code, signal) {
        if(signal) {
            logger.warn('Worker', worker.pid, 'was killed with signal', signal);
        }
        else if(code !== 0) {
            logger.warn('Worker', worker.pid, 'exited with code', code);
        }
        else {
            logger.warn('Worker', worker.pid, 'died');
        }
        cluster.fork();
    });

}
else if(cluster.isWorker) {
}
*/



    server.start();
