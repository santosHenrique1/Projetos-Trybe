const stockProducts = require('./data.json');

const getLowStockProducts = () => {
  // Desenvolva seu código dentro dessa função...
  let lowProducts = [];
  
  for (let index = 0; index < stockProducts.length; index +=1){
  const products = stockProducts[index];
  
    
  if (products.quantityInStock > 0 && products.quantityInStock <= 10) {
  let msg = `${products.productName}: ${products.quantityInStock} unidades`;
  lowProducts.push(msg);
  
}
}
return lowProducts;
};

module.exports = { getLowStockProducts };
