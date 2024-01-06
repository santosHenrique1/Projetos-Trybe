const data = require('../data/zoo_data');

const countAnimals = (animal) => {
  if (!animal) {
    const objAnimal = {};
    data.species.forEach((specie) => {
      objAnimal[specie.name] = specie.residents.length;
    });
    return objAnimal;
  }

  const specieAnimal = data.species.find((specie) => specie.name === animal.species);
  if (!specieAnimal) return 0;

  const residentsAnimal = specieAnimal.residents;

  if (animal.sex) {
    return residentsAnimal.filter((resident) => resident.sex === animal.sex).length;
  }

  return residentsAnimal.length;
};
console.log(countAnimals('lions'));
module.exports = countAnimals;
