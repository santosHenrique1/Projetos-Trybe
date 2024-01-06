import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecipeContext } from '../../Context/RecipeContext';
import { Drink } from '../../type';
import './index.css';

function Drinks() {
  const { recipes } = useContext(RecipeContext);
  const navigate = useNavigate();
  const drinks = recipes as Drink[];

  const renderRecipesDrinks = drinks.length < 12 ? drinks : drinks.slice(0, 12); // se o drinks for menor renderiza tudo, se for maior renderiza só 12;
  return (
    renderRecipesDrinks.map((recipe: Drink, index) => {
      const { idDrink, strDrinkThumb, strDrink } = recipe;
      return (
        <li
          key={ strDrink }
          data-testid={ `${index}-recipe-card` }
          className="card"
        >
          <button
            type="button"
            onClick={ () => navigate(`/drinks/${idDrink}`) }
            className="card-button"
          >
            <img
              src={ strDrinkThumb }
              alt={ strDrink }
              data-testid={ `${index}-card-img` }
              className="card-image"
            />
            <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
          </button>
        </li>
      );
    }));
}

export default Drinks;
