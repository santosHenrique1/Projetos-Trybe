import { useEffect, useState } from 'react';
// import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import imgCompartilhar from '../../images/shareIcon.svg';
import './doneRecipes.css';

function DoneRecipes() {
  // const copyClipBoard = clipboardCopy;
  const [mealsDrinks, setMealsDrinks] = useState<any>([]);
  const [linkCopy, setLinkCopy] = useState<any>({});
  const [itemStorage, setItemStorage] = useState<any>([]);
  useEffect(() => {
    const localStrg = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    setItemStorage(localStrg);
    setMealsDrinks(localStrg);
    const idItemStorage = localStrg.reduce((acc:any, curr:any) => {
      return (
        { ...acc, [curr.id]: false }
      );
    }, {});
    setLinkCopy(idItemStorage);
  }, []);
  function copyToClipBoard(url:string, id:string) {
    const { protocol, host } = window.location;
    setLinkCopy({ ...linkCopy, [id]: true });
    navigator.clipboard.writeText(`${protocol}//${host}${url}`);
  }
  function filterByMeal() {
    const meal = itemStorage.filter((item:any) => item.type === 'meal');
    setMealsDrinks(meal);
  }
  function filterByDrink() {
    const drink = itemStorage.filter((item:any) => item.type === 'drink');
    setMealsDrinks(drink);
  }
  function filterByAll() {
    setMealsDrinks(itemStorage);
  }

  return (
    <>
      <button
        data-testid="filter-by-all-btn"
        onClick={ filterByAll }
      >
        All

      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ filterByMeal }
      >
        Meals

      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ filterByDrink }
      >
        Drinks

      </button>

      {mealsDrinks.map((recipe:any, index:any) => (
        <div key={ index }>

          <Link to={ `${recipe.type}s/${recipe.id}${recipe.id}` }>

            <h1 data-testid={ `${index}-horizontal-name` }>
              {recipe.name}

            </h1>
          </Link>
          <Link to={ `${recipe.type}s/${recipe.id}${recipe.id}` }>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src="src/images/shareIcon.svg"
              alt="Compartilhar"
            />
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.nationality}
            {' '}
            -
            {' '}
            {recipe.category}
          </p>
          <img
            className="img-responsive"
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
          />
          <p data-testid={ `${index}-horizontal-done-date` }>
            {recipe.doneDate}
          </p>
          {recipe.alcoholicOrNot && (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.alcoholicOrNot}
            </p>
          )}
          <button data-testid={ `${index}-horizontal-share-btn` }>
            { recipe.tags.map((tag:string, i:string) => (
              <div
                key={ i }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </div>

            ))}
          </button>
          <button
            onClick={
          () => copyToClipBoard(`/${recipe.type}s/${recipe.id}`, `${recipe.id}`)
          }
          >
            {linkCopy[recipe.id] && <h3>Link copied!</h3>}
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ imgCompartilhar }
              alt=""
            />

          </button>
        </div>

      ))}
    </>
  );
}
export default DoneRecipes;
