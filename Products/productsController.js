var path = require('path');
var restify = require('restify');
var Request = require('request');
var http = require("http");
var productDAL = require('./productsDAL.js');
var productDTO = require('./Product.js');
var productService = require('./productsService.js');


exports.createProduct = function(req,res,next)
{
    let productStat = {};
    let product = {};
    
    console.log("In createProduct Controller ...")
    const addJson = req.body;  
    product = productDTO.product;
    productService.setProduct(addJson);

    productDAL.createProduct(product).then(function(result1){
        if(result1.success == true){
            let productId = result1.data.rows[0].product_id
            productStat = productService.setProductStat(product, productId);
            productDAL.createProductStat(productStat).then(function(result2){
                if(result2.success == true){
                    res.status(200);
                }
                else{
                    res.status(400);
                }
            })
        }
        else{
            res.status(400) ; 
        }
        res.send(result1)
        return next();
    });
} 



exports.readALlData = function(req,res,next)
{
    console.log("I am in readALlData Controller ...");
    productDAL.readALlData().then(function (result) {  
        if(result.success == true){
            res.status(200)
        }
        else{
            res.status(400) ; 
        }
        res.send(result)
        return next();
       
    });       
}

exports.fetchProdDisplay = function(req,res,next)
{
    let productDisplayList = [];
    console.log("I am in fetchProdDisplay Controller ...");
    productDAL.fetchProductOrder().then(function (result) {
        if(result.success == true){
                    console.log(result.data);
                    productDisplayList =  productService.setOrderDisplayData(result.data);
                    res.status(200)
                    res.send(productDisplayList)
                    return next();   
                }
                else{
                    // Order The resumt
                
                    res.status(400)
                    res.send(productDisplayList)
                    return next();
                }
            });
}   
    

/* exports.fetchProdDisplay = function(req,res,next)
{
    let productDisplayList = [];
    console.log("I am in fetchProdDisplay Controller ...");
    productDAL.readALlData().then(function (result1) {
        if(result1.success == true){
            productDAL.fetchProductOrder().then(function (result2) {
                console.log("Result Returned --->",result2 )  
                if(result2.success == false){
                    res.status(400)
                    res.send(result2)
                    return next();   
                }
                else{
                    // Order The resumt
                   productDisplayList =  productService.setOrderDisplayData(result1.data, result2.data);
                    res.status(200)
                    res.send(productDisplayList)
                    return next();
                }
            });
        }   
    
    });
} */



exports.updateStatpredictionNo = function(req,res,next){


    console.log("In updateStatpredictionNo  Controller ...")
    const updateJson = req.body;   
    console.log("update Json ------>", updateJson)

    productDAL.updateProductStat(updateJson).then(function(result){
        if(result.success == true){
            res.status(200)
        }
        else{
            res.status(400) ; 
        }
        res.send(result)
        return next();
       
    });

}


