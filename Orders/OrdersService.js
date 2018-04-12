var path = require('path');

var orderDTO = require('./Order.js');
  exports.setOrder = function(addJson ){
    order = {
      "order_name" : "null",
      "product_id" : null,
      "order_quantity" : null,
      "order_contact_no" :  null,
      "tenant_id" : null,
       "order_bill_no" : null,
       "is_active": true
    };
    order.order_name = addJson.orderName;
    order.product_id =  Number(addJson.productId);
    order.order_contact_no = addJson.contactNo;
    order.order_quantity = Number(addJson.orderQuantity),
    order.order_bill_no =  addJson.billNo;
    order.tenant_id = addJson.tenantId;
    //order.is_active = addJson.tenantId;

    return order
  } 
  exports.Inserts = function(template, data) {
    if (!(this instanceof Inserts)) {
        return new Inserts(template, data);
    }
    this._rawDBType = true;
    this.formatDBType = function () {
        return data.map(d=>'(' + pgp.as.format(template, d) + ')').join(',');
    };
  }
  