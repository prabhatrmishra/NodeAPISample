var path = require('path');
var restify = require('restify');

exports.verifyServer = function(req, res, next) {
    var verify = { message : 'Rest Server Started'}
    res.status(200);
    res.send(verify);
    return next();
};