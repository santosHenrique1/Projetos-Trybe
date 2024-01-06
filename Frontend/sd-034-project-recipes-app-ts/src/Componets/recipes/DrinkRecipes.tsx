import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { drinksApiRequest, ApiCategoryDrink,
  ApiFilterDrinks } from '../../ServicesApi/ApiRequest';

export function DrinksRecipes() {
  const [btnToggle, setBtnToggle] = useState(false);
  const [drinks, setDrinks] = useState([]);
  const [drinksCategory, setDrinksCategory] = useState([]);
  console.log(drinks);
  console.log(drinksCategory);
  useEffect(() => {
    async function responseApi() {
      const result = await drinksApiRequest();
      setDrinks(result);
      const drinkCategoryResult = await ApiCategoryDrink();
      setDrinksCategory(drinkCategoryResult);
    }
    responseApi();
  }, []);
  async function handleClick(category: { strCategory: string }) {
    if (btnToggle) {
      setDrinks(await drinksApiRequest());
    } else {
      const filterDrinks = await ApiFilterDrinks(category.strCategory);
      setDrinks(filterDrinks);
    }
    setBtnToggle(!btnToggle);
  }
  async function resetCategory() {
    setDrinks(await drinksApiRequest());
  }
  return (
    <>
      <div>
        <button
          data-testid="All-category-filter"
          onClick={ () => resetCategory() }
        >

          All

        </button>
        {drinksCategory.map((category:any, index:any) => (
          <button
            onClick={ () => handleClick(category) }
            data-testid={ `${category.strCategory}-category-filter` }
            key={ index }
          >
            {' '}
            {category.strCategory}
          </button>
        ))}
      </div>
      <div className="container-img">
        { drinks.map((drink:any, index:any) => (
          <Link key={ index } to={ `/drinks/${drink.idDrink}` }>
            <div data-testid={ `${index}-recipe-card` }>
              <img
                className="img-card"
                data-testid={ `${index}-card-img` }
                src={ drink.strDrinkThumb }
                alt=""
              />
              <p data-testid={ `${index}-card-name` }>
                {drink.strDrink}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
