const data = require('../data/zoo_data');

const isManager = (id) => {
  // seu código aqui
  if (!id) {
    return false;
  }
  const verifyManeger = data.employees.some((emp) => emp.managers.includes(id));
  return verifyManeger;
};

const getRelatedEmployees = (managerId) => {
  // seu código aqui
  const mng = isManager(managerId);
  if (!mng) {
    throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
  }

  const manegers = data.employees
    .filter((emp) => emp.managers.includes(managerId))
    .map((emp) => `${emp.firstName} ${emp.lastName}`);
  return manegers;
};
console.log(getRelatedEmployees('0e7b460e-acf4-4e17-bcb3-ee472265db83'));
module.exports = { isManager, getRelatedEmployees };
