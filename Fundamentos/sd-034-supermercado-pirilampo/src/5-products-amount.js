const stockProducts = require('./data.json');

const getProductsAmount = () => {
  // Desenvolva seu código dentro dessa função...
  let soma = 0;
for (let index = 0; index < stockProducts.length; index += 1) {
    
    soma += stockProducts[index].quantityInStock;
}
return soma;
};


module.exports = { getProductsAmount };
