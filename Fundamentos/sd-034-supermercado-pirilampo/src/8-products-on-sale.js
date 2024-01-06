const stockProducts = require('./data.json');

const getProductsOnSale = () => {
  // Desenvolva seu código dentro dessa função...
const listPromo = [];
for (let index = 0; index < stockProducts.length; index += 1) {
  let promo = stockProducts[index];
  if (promo.onSale) {
    let list = {
      description: promo.description,
      formattedPrice: `R$ ${promo.price.toFixed(2)}`,
      onSale: promo.onSale
    };
    listPromo.push(list)
  }  
}

return listPromo;
};

module.exports = { getProductsOnSale };
console.log(getProductsOnSale());