//const express = require('express');
const pg = require('pg');
const path = require('path');
var config = require(path.join(__dirname, '..', 'resources', 'DBresources','DBQueryUtil'));
const Query = require('pg').Query
const { Client } = require('pg').Client
var pgp = require('pg-promise')({
  // Initialization Options
  capSQL: true // capitalize all generated SQL
});
var ordersService = require('./OrdersService.js');


   var connectionString = config.ConnectDevDbString;
// working
exports.readOrders = function(){
  
    var results = [];
    var _query = 'SELECT * FROM orders';
    console.log("Query String ----->",_query);

    return new Promise(function(res, rej) {
      pg.connect(connectionString, function(err, client, done){
        client.query(_query, function(err, result) {
           // handle err here
           if(err)
           {
             console.log("Some Error occured")
             res({success: false, data: err});
           }
           
             for(var val of result.rows) {
             
               results.push(val)
             }
             console.log("success");
             res({"success": false, "data":results });
             done(); // don't forget this to have the client returned to the pool
           })

    })
  })
}

// working
exports.createOrder = function(order){
  
    var results = [];
    var mapInsertQuery = "INSERT INTO public.product_order_mapping(product_id,is_active, tenant_id)VALUES ($1, $2, $3);"
    var orderInsertquery = "INSERT INTO public.order(order_name, order_quantity, order_contact_no, product_id, tenant_id, order_bill_no, is_active)VALUES($1, $2, $3, $4, $5, $6 ,$7);";
  console.log("Query String ----->",orderInsertquery)
  return new Promise(function(res, rej) {
    pg.connect(connectionString, function(err, client, done){
      client.query(orderInsertquery, 
      [order.orderName, order.orderQuantity, order.orderContactNo, order.productId, order.tenantId, order.billNo, order.isActive],
      function(err, result) {
        // handle err here
        if(err){
          console.log("Some Error occured")
          res({success: false, data: err});
        }
        if(result.rowCount > 0){
          var OrderId = result
          client.query(mapInsertQuery, 
          [order.productId,order.isActive,  order.tenantId],
          function(err, result) {
            if(err){
              console.log("Some Error occured")
              res({success: false, data: err});
            }
                console.log("Both success");
                done(); 
                res({success: true, data:result });
          })
      }
      else{
          done(); // don't forget this to have the client returned to the pool
          res({success: false });
        }
      })    
    })
  })
}




// working
exports.insertBulkOrders = function(orders){ 
return new Promise(function(res, rej) {
  console.log("IN DAL ----->",orders);
    const db = pgp(connectionString);
    const cs = new pgp.helpers.ColumnSet(['?order_name', 'order_quantity', '?order_contact_no', 'product_id', '?tenant_id',
     '?order_bill_no', 'is_active'], {table: 'order'});
    const query = pgp.helpers.insert(orders, cs);
    db.none(query)
        .then(data=> {
          res({success: true, data: data});
        })
        .catch(error=> { 
           console.log("Some Error occured")
        res({success: false, data: error});
        done();
        });

})
}



// working
exports.insertBulkOrders2 = function(orders){
  console.log('orders-----------',orders)
  var orderInsertquery = "INSERT INTO public.order(order_name, order_quantity, order_contact_no, product_id, tenant_id, order_bill_no, is_active) VALUES ($1);";
console.log("Query String ----->",orderInsertquery)

return new Promise(function(res, rej) {
    const db = pgp(connectionString);
    
    var userList = [{name: 'John', age: 23}, {name: 'Mike', age: 30}, {name: 'David', age: 18}];
    const cs = new pgp.helpers.ColumnSet(['?name', 'age'], {table: 'users'});
    const query = pgp.helpers.insert(userList, cs);
    db.none(query)
        .then(data=> {
          res({success: true, data: data});
        })
        .catch(error=> { 
           console.log("Some Error occured")
        res({success: false, data: error});
        done();
            // Error, no records inserted
        });
   /*  db.none(orderInsertquery,Inserts
    ('${orderName}, ${orderQuantity},${orderContactNo}, ${productId},${tenantId}, ${billNo},${isActive}', orders))
    .then(result=> {
      console.log("result----------->",result)
      res({success: true, data: result});
        // OK, all records have been inserted
    })
    .catch(error=> {
      res({success: false, data: error});
        // Error, no records inserted
    }); */
   /*  client.query(orderInsertquery, 
    [order.orderName, order.orderQuantity, order.orderContactNo, order.productId, order.tenantId, order.billNo, order.isActive],
    function(err, result) {
      // handle err here
      if(err){
        console.log("Some Error occured")
        res({success: false, data: err});
        done();
      }
      if(result.rowCount > 0){
      
            res({success: true, data: result});
            done();
      }
    else{
        res({success: false });
        done(); // don't forget this to have the client returned to the pool
      }
    })  */   
 // })
})
}



// working
exports.updateOrderStatus = function(orderId,productId,quantity){
  
  var results = [];
  var update_order_query = "UPDATE public.order SET order_quantity = 0, is_active=false WHERE order_id = $1;";
  var update_stat_query = "UPDATE public.product_stats SET created_till_now_no= created_till_now_no + $1 WHERE product_id = $2;"
  console.log("update_order_query String ----->",update_order_query)
  return new Promise(function(res, rej) {
    pg.connect(connectionString, function(err, client, done){
      client.query(update_order_query, 
      [orderId],
      function(err, result) {
        if(err){
          console.log("Some Error occured")
          res({success: false, data: err});
        }
        console.log("Single success");
        if(result.rowCount > 0){
          client.query(update_stat_query, 
          [quantity,productId],
          function(err, result) {
              if(err){
                console.log("Some Error occured")
                res({success: false, data: err});
                done();
              }
                  console.log("Both success");
                  res({success: true, data:result });
                  done();
            })
        }
        else{
          res({success: false, data:{} });
            done(); 
          
          }
        })    
      })
    })
  }

