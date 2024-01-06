import { useEffect, useState } from 'react';
import CreateIngredient from './Ingredient';
import './Meals-Drinks-InProgress.css';
import shareIcon from '../../../images/shareIcon.svg';
import blackHeartIcon from '../../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../../images/whiteHeartIcon.svg';
import { Meal } from '../../../type';

type MealsInProgressProps = {
  API: Meal;
};

function MealsInProgress({ API }: MealsInProgressProps) {
  const [favorite, setFavorite] = useState(whiteHeartIcon);
  const [addedIngredients, setAddedIngredients] = useState<boolean[]>([]);
  const [ingredients, setIngredients] = useState<(string | null)[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const checkingLocalStorage = () => {
      const indexs = Object.keys(API)
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
        .filter((Ingredient, index) => indexs.includes(index))
        .filter((Ingredient) => Ingredient !== null)
        .filter((Ingredient) => Ingredient?.length !== 0);
      setIngredients(Ingredients);

      const LocalStorage = localStorage.getItem(`${API.idMeal}`);

      if (LocalStorage !== null) {
        setAddedIngredients(JSON.parse(LocalStorage));
      }
      if (LocalStorage === null) {
        const False = Ingredients.map(() => false);
        localStorage.setItem(`${API.idMeal}`, JSON.stringify(False));
        setAddedIngredients(False);
      }

      const LocalStorageFavoriteRecipes = localStorage.getItem('favoriteRecipes');

      if (LocalStorageFavoriteRecipes === null) {
        setFavorite(whiteHeartIcon);
      }
      if (LocalStorageFavoriteRecipes !== null) {
        JSON.parse(LocalStorageFavoriteRecipes)
          .map((iten: any) => (iten.id === API.idMeal
            ? setFavorite(blackHeartIcon)
            : setFavorite(whiteHeartIcon)));
      }
    };
    checkingLocalStorage();
  }, [API]);

  const favoriteBTN = () => {
    const LocalStorage = localStorage.getItem('favoriteRecipes');
    const favoriteRecipe = {
      id: API.idMeal,
      type: 'meal',
      nationality: API.strArea,
      category: API.strCategory,
      alcoholicOrNot: '',
      name: API.strMeal,
      image: API.strMealThumb,
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
              JSON.parse(LocalStorage).filter((iten: any) => iten.id !== API.idMeal),
            ),
          );
        }
    }
  };

  const shareBTN = () => {
    navigator.clipboard.writeText(`http://localhost:3000/meals/${API.idMeal}`);
    setCopied(true);
  };

  return (
    <>
      {copied && <p>Link copied!</p>}
      <div className="container">
        <img
          src={ API.strMealThumb }
          alt={ `Imagem da refeição ${API.strMeal}` }
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
          {API.strCategory}

        </p>
        <h1
          data-testid="recipe-title"
          className="recipe-title"
        >
          {API.strMeal}

        </h1>
      </div>
      <div>
        <h2>Ingredients</h2>
        {
          ingredients.map((ingredient, index) => {
            return (
              <CreateIngredient
                key={ index }
                index={ index }
                ingredient={ ingredient }
                checked={ addedIngredients[index] }
                id={ API.idMeal }
                addedIngredients={ addedIngredients }
                setAddedIngredients={ setAddedIngredients }
              />
            );
          })
          }
      </div>
      <div>
        <h2>Instructions</h2>
        <p data-testid="instructions">{API.strInstructions}</p>
      </div>
      <button
        data-testid="finish-recipe-btn"
        className="finishBTN"
        disabled={ addedIngredients.includes(false) }
      >
        Finalizar receita

      </button>
    </>
  );
}

export default MealsInProgress;
