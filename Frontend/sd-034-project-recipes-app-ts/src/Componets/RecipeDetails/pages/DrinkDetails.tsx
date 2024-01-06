import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drink, Meal } from '../../../type';
import '../../RecipeInProgress/pages/Meals-Drinks-InProgress.css';
import shareIcon from '../../../images/shareIcon.svg';
import blackHeartIcon from '../../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../../images/whiteHeartIcon.svg';

type DrinkDetailsProps = {
  API: Drink;
};

function DrinkDetails({ API }:DrinkDetailsProps) {
  const [favorite, setFavorite] = useState(whiteHeartIcon);
  const [recommendations, setRecommendations] = useState<Meal[]>([]);
  const [startRecipeBtn, setStartRecipeBtn] = useState(true);
  const [continueRecipe, setContinueRecipe] = useState(false);
  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getRecommendations = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data: { meals: Meal[] } = await response.json();
      const Filter = data.meals.filter((meal, index) => index <= 5);
      setRecommendations(Filter);
      const LocalStorageDoneRecipes = localStorage.getItem('doneRecipes');
      switch (LocalStorageDoneRecipes) {
        case null:
          setStartRecipeBtn(true);
          break;
        default:
          JSON.parse(LocalStorageDoneRecipes)
            .map((recipe: any) => (recipe.id === API.idDrink
              ? setStartRecipeBtn(false)
              : setStartRecipeBtn(true)));
      }
      const LocalStorageInProgressRecipes = localStorage.getItem('inProgressRecipes');
      switch (LocalStorageInProgressRecipes) {
        case null:
          setContinueRecipe(false);
          break;
        default:
          setContinueRecipe(JSON
            .parse(LocalStorageInProgressRecipes).drinks[API.idDrink] !== null);
      }
      const LocalStorageFavoriteRecipes = localStorage.getItem('favoriteRecipes');
      switch (LocalStorageFavoriteRecipes) {
        case null:
          setFavorite(whiteHeartIcon);
          break;
        default:
          JSON.parse(LocalStorageFavoriteRecipes)
            .map((iten: any) => (iten.id === API.idDrink
              ? setFavorite(blackHeartIcon)
              : setFavorite(whiteHeartIcon)));
      }
    };
    getRecommendations();
  }, [API]);

  const indexsIngredients = Object.keys(API)
    .map((key, index) => {
      const split = key.split('');
      switch (`${split[3]}${split[4]}${split[5]}`) {
        case 'Ing':
          return index;
        default:
          return '';
      }
    }).filter((x) => x !== '');

  const Ingredients = Object.values(API)
    .filter((Ingredient, index) => indexsIngredients.includes(index))
    .filter((Ingredient) => Ingredient !== null)
    .filter((Ingredient) => Ingredient?.length !== 0);

  const indexPortions = Object.keys(API)
    .map((key, index) => {
      const split = key.split('');
      switch (`${split[3]}${split[4]}${split[5]}`) {
        case 'Mea':
          return index;
        default:
          return '';
      }
    }).filter((x) => x !== '');

  const potions = Object.values(API)
    .filter((Ingredient, index) => indexPortions.includes(index))
    .filter((Ingredient) => Ingredient !== null)
    .filter((Ingredient) => Ingredient?.length !== 0);

  const favoriteBTN = () => {
    const LocalStorage = localStorage.getItem('favoriteRecipes');
    const favoriteRecipe = {
      id: API.idDrink,
      type: 'drink',
      nationality: '',
      category: API.strCategory,
      alcoholicOrNot: API.strAlcoholic,
      name: API.strDrink,
      image: API.strDrinkThumb,
    };

    switch (favorite) {
      case whiteHeartIcon:
        setFavorite(blackHeartIcon);
        if (LocalStorage === null) {
          localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteRecipe]));
        }
        if (LocalStorage !== null) {
          localStorage.setItem(
            'favoriteRecipes',
            JSON.stringify([...JSON.parse(LocalStorage), favoriteRecipe]),
          );
        }
        break;
      default:
        setFavorite(whiteHeartIcon);
        if (LocalStorage !== null) {
          localStorage.setItem(
            'favoriteRecipes',
            JSON.stringify(
              JSON.parse(LocalStorage).filter((iten: any) => iten.id !== API.idDrink),
            ),
          );
        }
    }
  };

  const shareBTN = () => {
    navigator.clipboard.writeText(`http://localhost:3000/drinks/${API.idDrink}`);
    setCopied(true);
  };

  return (
    <>
      {copied && <p>Link copied!</p>}
      <div className="container">
        <img
          src={ API.strDrinkThumb }
          alt={ `Imagem da bebida ${API.strDrink}` }
          data-testid="recipe-photo"
          className="photo"
        />
        <button
          data-testid="share-btn"
          className="share-btn"
          onClick={ shareBTN }
        >
          <img
            src={ shareIcon }
            alt="shareIcon"
            className="shareIcon"
          />
        </button>
        <button
          className="favorite-btn"
          onClick={ favoriteBTN }
        >
          <img
            src={ favorite }
            alt="favoriteIcon"
            className="favoriteIcon"
            data-testid="favorite-btn"
          />
        </button>
        <p
          data-testid="recipe-category"
          className="category"
        >
          {API.strAlcoholic}

        </p>
        <h1
          data-testid="recipe-title"
          className="recipe-title"
        >
          {API.strDrink}

        </h1>
      </div>
      <h2>Ingredients</h2>
      <ul>
        {Ingredients.map((ingredient, index) => {
          return (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${ingredient}`}
              {' '}
              {potions[index] !== undefined ? potions[index] : ''}

            </li>
          );
        })}
      </ul>
      <div>
        <h2>Instructions</h2>
        <p data-testid="instructions">{API.strInstructions}</p>
      </div>
      <h2>Recommended</h2>
      <div className="card-Container00">
        {recommendations.map((recommendation, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recommendation-card` }
          >
            <img
              src={ recommendation.strMealThumb }
              alt={ `Imagem da bebida ${recommendation.strMeal}` }
              className="card-Image00"
            />
            <h3
              data-testid={ `${index}-recommendation-title` }
              className="cardTitle"
            >
              {recommendation.strMeal}

            </h3>
          </div>
        ))}
      </div>
      {startRecipeBtn && (
        <button
          data-testid="start-recipe-btn"
          className="startRecipeBtn"
          onClick={ () => navigate(`/drinks/${API.idDrink}/in-progress`) }
        >
          {!continueRecipe ? 'Start Recipe' : 'Continue Recipe'}
        </button>
      )}
    </>
  );
}

export default DrinkDetails;
