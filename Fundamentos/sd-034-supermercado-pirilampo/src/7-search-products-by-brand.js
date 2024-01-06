const stockProducts = require('./data.json');

const searchProductsByBrand = (marca) => {
  // Desenvolva seu código dentro dessa função...
  if (!marca) {
    return [];
  };

  let list = [];
  
  for (let index = 0; index < stockProducts.length; index += 1) {
    
    let produto = stockProducts[index];
    
    if (produto.brand === marca) {
      let resultado = {
        description: produto.description,
        formattedPrice: `R$ ${produto.price.toFixed(2)}`,
      };
      list.push(resultado);
    };
    }
    return list;
};

module.exports = { searchProductsByBrand };
console.log(searchProductsByBrand("Hortifruti"));