import { useEffect, useState } from 'react';
import './Recipe.css';
import { Link } from 'react-router-dom';
import { mealsApiRequest,
  ApiCategoryMeals, ApiFilterMeals } from '../../ServicesApi/ApiRequest';

export function MealsRecipes() {
  const [btnToggle, setBtnToggle] = useState(false);
  const [meals, setMeals] = useState([]);
  const [mealsCategory, setMealsCategory] = useState([]);
  console.log(meals);
  console.log(mealsCategory);
  useEffect(() => {
    async function responseApi() {
      const result = await mealsApiRequest();
      setMeals(result);
      const mealsCategoryResult = await ApiCategoryMeals();
      setMealsCategory(mealsCategoryResult);
    }
    responseApi();
  }, []);

  async function handleClick(category: { strCategory: string }) {
    if (btnToggle) {
      setMeals(await mealsApiRequest());
    } else {
      const filterMeals = await ApiFilterMeals(category.strCategory);
      setMeals(filterMeals);
    }
    setBtnToggle(!btnToggle);
  }
  async function resetCategory() {
    setMeals(await mealsApiRequest());
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
        {mealsCategory.map((category:any, index:any) => (

          <button
            onClick={ () => handleClick(category) }
            data-testid={ `${category.strCategory}-category-filter` }
            key={ index }
          >
            {category.strCategory}
          </button>

        ))}

      </div>
      <div className="container-img">
        { meals.map((meal:any, index:any) => (
          <Link key={ index } to={ `/meals/${meal.idMeal}` }>
            <div data-testid={ `${index}-recipe-card` }>

              <img
                className="img-card"
                src={ meal.strMealThumb }
                data-testid={ `${index}-card-img` }
                alt=""
              />
              <p data-testid={ `${index}-card-name` }>
                {meal.strMeal}
              </p>

            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
