var productDTO = require('./Product.js');
var productDisplayDTO = require('./ProductDisplay.js');

exports.setProduct = function(addJson){
    product = productDTO.product;
    product.productName = addJson.productName;
    product.productCategory =  addJson.productCategory;
    product.productType = addJson.productType;
    product.predictedNo = addJson.predictedNo;
    product.tenantId = addJson.tenantId;
}


exports.setOrderDisplayData = function(products)
{
    productDisplay = productDisplayDTO.productDisplay;
    productDisplayList = [];
    for(var product of products) {
        let productDisplay = {};
        // Set Others data
        productDisplay.orderId =  product.order_id,
        productDisplay.orderName =  product.order_name,
        productDisplay.orderBillNo =  product.order_bill_no,
        productDisplay.orderQuantity =  product.order_quantity,
        productDisplay.productName = product.product_name;
        productDisplay.productCategory = product.product_category;
        productDisplay.productType = product.product_type;
        productDisplay.productId = product.product_id;
        productDisplay.tenantId = product.tenant_id;
        productDisplay.productStatId = product.product_stat_id;
        productDisplay.createdTillNowNo = product.created_till_now_no;
        productDisplay.predictedNo = product.predicted_no;

        productDisplayList.push(productDisplay)   
    }

return productDisplayList
}

exports.setProductStat = function(product, productId){
    let productStat = {}
        productStat. productId = productId;
        productStat.predictedNo = Number(product.predictedNo);
        productStat.createdTillNowNo = 0;
        productStat.tenantId = product.tenantId;
    return productStat;
}