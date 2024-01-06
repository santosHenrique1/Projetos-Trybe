const data = require('../data/zoo_data');

const getAnimalsOlderThan = (animal, age) => {
  // seu código aqui
  const findSpecies = data.species.find((species) => species.name === animal);
  if (!findSpecies) {
    return false;
  }
  const animalAge = findSpecies.residents.every((resident) => resident.age >= age);
  return animalAge;
};

module.exports = getAnimalsOlderThan;

console.log(getAnimalsOlderThan('lions', 7));
