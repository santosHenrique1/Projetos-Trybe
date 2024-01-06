const stockProducts = require('./data.json');

const getOutOfStockProducts = () => {
  // Desenvolva seu código dentro dessa função...
  let produtosIndisponiveis = []
  for(let index = 0; index < stockProducts.length; index += 1){
    if (stockProducts[index].quantityInStock === 0 ) {
      produtosIndisponiveis.push(stockProducts[index].productName);
    }
  }
  return produtosIndisponiveis;
};

module.exports = { getOutOfStockProducts };
