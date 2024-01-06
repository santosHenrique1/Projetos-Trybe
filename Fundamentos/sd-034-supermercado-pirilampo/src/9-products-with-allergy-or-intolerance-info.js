const stockProducts = require('./data.json');

const getProductsWithAllergyOrIntoleranceInfo = () => {
  // Desenvolva seu código dentro dessa função...
const alergiaList = [];
for (let index = 0; index < stockProducts.length; index+=1) {
  let aleInt = stockProducts[index];
  if (aleInt.allergyOrIntolerance){
    let intList = {
      allergyOrIntoleranceMessage: `Pode conter: ${aleInt.allergyOrIntolerance.join(' ')}`,
      description: aleInt.description,
      formattedPrice: `R$ ${aleInt.price.toFixed(2)}`,
      
    }
    alergiaList.push(intList);
  }
  
}
return alergiaList;
};

module.exports = { getProductsWithAllergyOrIntoleranceInfo };
