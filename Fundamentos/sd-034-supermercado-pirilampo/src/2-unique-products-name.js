const stockProducts = require('./data.json');

const getUniqueProductsName = () => {
  // Desenvolva seu código dentro dessa função...
  let produtos =[];
  for (let index = 0; index < stockProducts.length; index+=1) {
  
  produtos.push(stockProducts[index].productName);
  
}
  return produtos;  

};

module.exports = { getUniqueProductsName };
let produtos1 = (getUniqueProductsName());
console.log(produtos1);