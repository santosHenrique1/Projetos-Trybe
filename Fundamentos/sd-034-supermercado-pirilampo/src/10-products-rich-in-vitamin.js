const stockProducts = require('./data.json');

const getProductsRichInVitamin = () => {
  // Desenvolva seu código dentro dessa função...
const  vitaminaList =[];
for (let index = 0; index < stockProducts.length; index +=1 ) {
  const vita = stockProducts[index];
  if (vita.vitamins) {
    let list ={
      description: vita.vitamins,
      formattedPrice: `R$ ${vita.price.toFixed(2)}`,
      vitaminsInformation: vita.nutritionalInfo.vitamins
    }  
    vitaminaList.push(list);
  }
}
return vitaminaList
};

module.exports = { getProductsRichInVitamin };
