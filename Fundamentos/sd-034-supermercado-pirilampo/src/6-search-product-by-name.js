const { SearchSource } = require('jest');
const stockProducts = require('./data.json');

const searchProductByName = (nomeProduto) => {
  // Desenvolva seu código dentro dessa função...
  for (let index = 0; index < stockProducts.length; index += 1) {
    let produto = stockProducts[index].productName;
    if (produto === nomeProduto) {
      let resultado = {
        description: stockProducts[index].description,
        formattedPrice: `R$ ${stockProducts[index].price.toFixed(2)}`,
      }
      return resultado; 
    }
    
      
    
     
  }
  return null;

};


module.exports = { searchProductByName };
console.log (searchProductByName ("Arroz"));