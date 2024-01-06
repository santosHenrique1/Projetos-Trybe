const data = require('../data/zoo_data');

const getSpeciesByIds = (...ids) => {
  // seu código aqui
  if (ids.length === 0) {
    return [];
  }
  return data.species.filter((animais) => ids.includes(animais.id));
};

console.log(getSpeciesByIds());
module.exports = getSpeciesByIds;
