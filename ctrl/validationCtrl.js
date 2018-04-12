var path = require('path');
var restify = require('restify');
var config = require(path.join(__dirname, '..', 'config'));

exports.validateUserHeader = function(req, res, next) {
    if(!req.headers.username || req.headers.username === '' || !config.xApiKey[req.headers.username]) {
        console.log('userName :: ',req.headers.username);
        return next(new restify.InvalidArgumentError({
            message: 'Invalid User',
            metadata: req.params
        }));
    }
    else {
        next();
    }
};
