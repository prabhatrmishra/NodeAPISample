var path = require('path');
var restify = require('restify');
var Request = require('request');
var http = require("http");
var ordersDAL = require('./OrdersDAL.js');
var ordersService = require('./OrdersService.js');
var OrderDTO = require('./Order.js');



exports.createOrder = function(req,res,next)
{
 
    addJson = req.body;
    var order = OrderDTO.order;
    console.log(addJson);
    console.log("In createOrder Controller ...");
    
    order  = ordersService.setOrder(addJson, order);
    ordersDAL.createOrder(order).then(function(result){
       
        if(result.success == true){
            console.log(result);
            res.status(200);
        }
        else{
            res.status(400) ; 
        }
        res.send(result)
        return next();
    })       
}




exports.createBulkOrders = function(req,res,next)
{
    orders = [];
    let order = {}
    ordersList = req.body.orderslist;
    console.log("In createOrder Controller ...",ordersList);
    for(i in ordersList)  {
        
        order  = ordersService.setOrder(ordersList[i]);
        orders.push(order);
    }

    ordersDAL.insertBulkOrders(orders).then(function(result){
        console.log(result)
        if(result.success == true){
            res.status(200)
        }
        else{
            res.status(400) ; 
        }
        res.send(result)
        return next();
    })       
}
exports.updateOrderStatus = function(req,res,next)
{
    console.log("In updateOrderStatus Controller ...");
    updateJson = req.body;
    console.log("------updateJson",updateJson)
    var orderId = Number(updateJson.orderId);
    var productId = Number(updateJson.productId);
    var quantity = Number(updateJson.quantity);

    ordersDAL.updateOrderStatus(orderId,productId,quantity).then(function (result) {
        console.log("Result Returned --->",result )  
        if(result.status === true){
            res.status(200)
        }
        else{
            res.status(202) ; 
        }
        res.send(result)
        return next();
       
    });       

}


    
