//const express = require('express');
const pg = require('pg');
const path = require('path');
var config = require(path.join(__dirname, '..', 'resources', 'DBresources','DBQueryUtil'));
const Query = require('pg').Query
const { Client } = require('pg').Client


var connectionString = config.ConnectDevDbString;
// working
exports.readALlData = function(){
  
    var results = [];
    var sum_quant_query = "SELECT sum(O.order_quantity ),P.product_id from public.order AS O, public.product AS P where O.is_active = true AND O.product_id = P.product_id group by p.product_id";
    var _query = 'SELECT * FROM public.product, public.product_stats  WHERE  (product.product_id = product_stats.product_id);';
    console.log("Query String ----->",_query);

    return new Promise(function(res, rej) {
      pg.connect(connectionString, function(err, client, done){
        client.query(_query, function(err, result) {
           if(err){
            console.log("Some Error occured",err)
             res({success: false, data: err});
           }
             for(var val of result.rows) {
             
               results.push(val)
             }
             console.log("success");
             res({"success": true, "data":results });
             done(); // don't forget this to have the client returned to the pool
           })

    })
  })
}

// working
exports.createProduct = function(product){
  
    var results = [];
    var _query = "INSERT INTO product( product_name, tenant_id, product_category, product_type)VALUES($1, $2, $3, $4) RETURNING product_id;";
    // Get a Postgres client from the connection pool
  console.log("Query String ----->",_query)
  console.log("Query String ----->",connectionString)
  return new Promise(function(res, rej) {
    pg.connect(connectionString, function(err, client, done){
      client.query(_query, 
      [product.productName, product.tenantId,product.productCategory,product.productType],
      function(err, result) {
        // handle err here
        if(err) {
          console.log("Some Error occured",err)
          res({success: false, data: err});
        }
         console.log("success", result.rows[0].product_id);
          res({success: true, data:result });
          done(); // don't forget this to have the client returned to the pool
        })    
})
  })
}





// working
exports.fetchProductOrder = function(){
  
    var results = [];
    var _query = ' select o.order_id , o.order_name, o.order_bill_no, o.order_quantity, o.is_active, p.product_id ,p.product_name, p.product_category ,s.created_till_now_no,p.tenant_id, '
    +' s.predicted_no from public.order o inner join public.product p on o.product_id = p.product_id ' 
    + ' inner join public.product_stats s on p.product_id=s.product_id;';
   
    console.log("Query String ----->",_query);
    return new Promise(function(res, rej) {
      pg.connect(connectionString, function(err, client, done){
        client.query(_query, function(err, result) {
           if(err){
             console.log("Some Error occured")
             res({success: false, data: err});
           }
             for(var val of result.rows) {
             
               results.push(val)
             }
             console.log("success");
             res({"success": true, "data":results });
             done(); // don't forget this to have the client returned to the pool
           })

    })
  })
}



// working
exports.createProductStat = function(productStat){
  
    var results = [];
    var _query = "INSERT INTO product_stats( product_id ,created_till_now_no, predicted_no, tenant_id)VALUES ($1,$2, $3, $4);";
  console.log("Query String ----->",_query)
  return new Promise(function(res, rej) {
    pg.connect(connectionString, function(err, client, done){
      client.query(_query, 
      [productStat.productId, productStat.createdTillNowNo, productStat.predictedNo ,productStat.tenantId],
      function(err, result) {
        // handle err here
        if(err)
        {
          console.log("Some Error occured")
          res({success: false, data: err});
        }
          console.log("success");
          res({success: true, data:result });
          done(); // don't forget this to have the client returned to the pool
        })    
})
  })
}


// working
exports.updateProductStat = function(updateJson){
  
    var results = [];
    var _query = "UPDATE public.product_stats SET  predicted_no= $1 WHERE product_id = $2 AND tenant_id = $3;";
    // Get a Postgres client from the connection pool
  console.log("Query String ----->",_query);
  return new Promise(function(res, rej) {
    pg.connect(connectionString, function(err, client, done){
      client.query(_query, 
      [Number(updateJson.predictedNo),Number(updateJson.productId), updateJson.tenantId],
      function(err, result) {
        // handle err here
        if(err)
        {
          console.log("Some Error occured")
          res({success: false, data: err});
        }
          console.log("Success")
          done(); // don't forget this to have the client returned to the pool
          res({success: true, data:result });
        })    
})
  })
}





