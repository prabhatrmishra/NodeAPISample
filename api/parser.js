var restify = require('restify');

module.exports = function(app) {
    app.use(restify.acceptParser(app.acceptable));
    app.use(restify.queryParser());
    app.use(restify.bodyParser());
};