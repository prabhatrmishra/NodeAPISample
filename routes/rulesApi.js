var path = require('path');



module.exports =  function(app) {
    var productsApis = require(path.join(__dirname, '..', 'Products', 'productsAPI'))(app);
    var orderApis = require(path.join(__dirname, '..', 'Orders', 'OrdersAPI'))(app);
}