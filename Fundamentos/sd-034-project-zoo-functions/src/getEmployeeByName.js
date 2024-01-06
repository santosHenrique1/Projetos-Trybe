const data = require('../data/zoo_data');

const getEmployeeByName = (employeeName) => {
  // seu código aqui
  if (!employeeName) {
    return {};
  }
  return data.employees.find((n) => (n.firstName === employeeName || n.lastName === employeeName));
};

module.exports = getEmployeeByName;
console.log(getEmployeeByName('Emery'));
