import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecipeContext } from '../../Context/RecipeContext';
import { Meal } from '../../type';
import './index.css';

function Meals() {
  const { recipes } = useContext(RecipeContext);
  const navigate = useNavigate();
  const meals = recipes as Meal[];

  const renderRecipesMeals = meals.length < 12 ? meals : meals.slice(0, 12); // se o meals for menor renderiza tudo, se for maior renderiza só 12;
  return (
    renderRecipesMeals && renderRecipesMeals.map((recipe: Meal, index) => {
      const { idMeal, strMealThumb, strMeal } = recipe;
      return (
        <li
          key={ strMeal }
          data-testid={ `${index}-recipe-card` }
          className="card"
        >
          <button
            type="button"
            onClick={ () => navigate(`/meals/${idMeal}`) }
            className="card-button"
          >
            <img
              src={ strMealThumb }
              alt={ strMeal }
              data-testid={ `${index}-card-img` }
              className="card-image"
            />
            <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
          </button>
        </li>
      );
    }));
}

export default Meals;
