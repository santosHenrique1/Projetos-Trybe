const data = require('../data/zoo_data');

const countEntrants = (entrants) => {
  // seu código aqui
  const objEntrants = {
    child: 0,
    adult: 0,
    senior: 0,
  };
  entrants.forEach((e) => {
    if (e.age < 18) {
      objEntrants.child += 1;
    } else if (e.age < 50) {
      objEntrants.adult += 1;
    } else {
      objEntrants.senior += 1;
    }
  });
  return objEntrants;
};

const calculateEntry = (entrants) => {
  // seu código aqui
  if (!entrants || entrants.length === 0) {
    return 0;
  }
  const { child, adult, senior } = countEntrants(entrants);

  return (child * data.prices.child + adult * data.prices.adult + senior * data.prices.senior);
};

module.exports = { calculateEntry, countEntrants };
