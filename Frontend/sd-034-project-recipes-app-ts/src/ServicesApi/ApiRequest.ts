export async function mealsApiRequest() {
  const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(URL);
  const data = await response.json();
  const filterData = data.meals.slice(0, 12);
  console.log(filterData);
  return filterData;
}
export async function drinksApiRequest() {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(URL);
  const data = await response.json();
  const filterData = data.drinks.slice(0, 12);
  console.log(filterData);
  return filterData;
}
export async function ApiCategoryMeals() {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(URL);
  const data = await response.json();
  const filterData = data.meals.slice(0, 5);
  console.log(filterData);
  return filterData;
}
export async function ApiCategoryDrink() {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(URL);
  const data = await response.json();
  const filterData = data.drinks.slice(0, 5);
  console.log(filterData);
  return filterData;
}
export async function ApiFilterMeals(categorie: string) {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`;
  const response = await fetch(URL);
  const data = await response.json();
  const filterData = data.meals.slice(0, 12);

  return filterData;
}
export async function ApiFilterDrinks(categorie: string) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categorie}`;
  const response = await fetch(URL);
  const data = await response.json();
  const filterData = data.drinks.slice(0, 12);

  return filterData;
}
