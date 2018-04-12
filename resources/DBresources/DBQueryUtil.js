const path = require('path');
var config = require('./DBConfig.js');

var dbConn = {
   
       ConnectDevDbString :
        config.production.url + config.production.database.user +':' 
        + config.production.database.password
     +  '@' +  config.production.server.host + ':'
      + config.production.server.port + '/' +  
       config.production.database.dbName
      + '?ssl=true',
        }; 
    
     /*   ConnectDevDbString : 
                            config.development.url + config.development.database.user +':' + 
                            config.development.database.password  + '@'
                            +  config.development.server.host + ':' 
                            + config.development.server.port +
                             '/' +   config.development.database.dbName,
    
    };
     */
       module.exports =dbConn;