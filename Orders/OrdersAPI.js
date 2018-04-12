var path = require('path');
var rulesCtrl = require(path.join(__dirname, '..', 'ctrl', 'rulesCtrl'));
var validationCtrl = require(path.join(__dirname, '..', 'ctrl', 'validationCtrl'));
var orderCtrl = require('./OrdersController.js');




module.exports = function(app) {
   
    // verify 
    app.get('/api/verify/',
        rulesCtrl.verifyServer);

    //Create Order
    app.post('/api/order/create',
       // validationCtrl.validateUserHeader,
        orderCtrl.createOrder);

    //Create Order
    app.post('/api/order/bulkcreate',
   // validationCtrl.validateUserHeader,
    orderCtrl.createBulkOrders);

    //update Order Status  
    app.put('/api/order/update',
       // validationCtrl.validateUserHeader,
        orderCtrl.updateOrderStatus);
 
};