var path = require('path');
var rulesCtrl = require(path.join(__dirname, '..', 'ctrl', 'rulesCtrl'));
var validationCtrl = require(path.join(__dirname, '..', 'ctrl', 'validationCtrl'));
var productCtrl = require('./productsController.js');




module.exports = function(app) {
   

    app.get('/api/verify/',
        rulesCtrl.verifyServer);

    // readALlData
    app.get('/api/product/getAll',
     //   validationCtrl.validateUserHeader,
        productCtrl.readALlData);

        //createProduct
    app.post('/api/product/create',
       // validationCtrl.validateUserHeader,
        productCtrl.createProduct);

     // readSumData
     app.get('/api/product/getDisplayData',
    // validationCtrl.validateUserHeader,
     productCtrl.fetchProdDisplay);


       // update Product Stat
       app.put('/api/productStats/update',
       // validationCtrl.validateUserHeader,
        productCtrl.updateStatpredictionNo);
};