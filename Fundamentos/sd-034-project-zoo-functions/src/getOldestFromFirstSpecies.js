const data = require('../data/zoo_data');

const getOldestFromFirstSpecies = (id) => {
  const emp = data.employees.find((employee) => employee.id === id);
  const idAnimal = emp.responsibleFor[0];
  const info = data.species.find((animal) => animal.id === idAnimal);
  let oldest = 0;
  info.residents.forEach((yearInfo) => {
    if (yearInfo.age > oldest) {
      oldest = yearInfo.age;
    }
  });
  const bigYearAnimal = info.residents.find((bigY) => bigY.age === oldest);
  const resultOldAnimal = Object.values(bigYearAnimal);
  return resultOldAnimal;
};

module.exports = getOldestFromFirstSpecies;
console.log(getOldestFromFirstSpecies('4b40a139-d4dc-4f09-822d-ec25e819a5ad'));
