const data = require('../data/zoo_data');

const dayAnimal = (animal) => {
  if (animal) {
    const animalData = data.species.find((specie) => specie.name === animal);
    if (animalData && animalData.availability) {
      return Object.values(animalData.availability);
    }
  }
};
const dayName = (day) => {
  const days = data.species.filter((date) => date.availability.includes(day));
  const animalName = days.map((n) => n.name);
  return animalName;
};

const dayOpenClose = (day) => {
  const date = data.hours[day];
  return date;
};
console.log(dayOpenClose('Tuesday'));

const oneDay = (day) => {
  const date = data.hours[day];
  if (day === 'Monday') {
    return { Monday: { exhibition: 'The zoo will be closed!', officeHour: 'CLOSED' } };
  }
  const openDay = { [day]: {
    exhibition: dayName(day),
    officeHour: `Open from ${date.open}am until ${date.close}pm` } };

  return openDay;
};
console.log(oneDay('Monday'));

const emptParam = () => {
  const objDays = Object.keys(data.hours);
  const sortedObjDays = objDays.sort();
  const mapDays = sortedObjDays.map((day) => {
    const dayInfo = Object.values(dayOpenClose(day));
    if (day === 'Monday') {
      return { Monday: { exhibition: 'The zoo will be closed!', officeHour: 'CLOSED' } };
    }
    return { [day]: {
      exhibition: dayName(day),
      officeHour: `Open from ${dayInfo[0]}am until ${dayInfo[1]}pm`,
    } };
  });
  return Object.assign(...mapDays, {});
};
emptParam();

const getSchedule = (scheduleTarget) => {
  const animalMap = data.species.map((specie) => specie.name);

  if (animalMap.includes(scheduleTarget)) {
    return dayAnimal(scheduleTarget);
  }
  if (!scheduleTarget) {
    return emptParam();
  }
  if (Object.keys(data.hours).includes(scheduleTarget)) {
    return oneDay(scheduleTarget);
  }

  return emptParam();
};

module.exports = getSchedule;

console.log(getSchedule());
