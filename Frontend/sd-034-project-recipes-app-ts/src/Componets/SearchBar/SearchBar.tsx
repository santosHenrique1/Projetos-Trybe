import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecipeContext } from '../../Context/RecipeContext';
import { FormSearchType } from '../../type';

const INITIAL_STATE:FormSearchType = {
  searchInput: '',
  searchRadio: 'ingredient',
};
type SearchBarProp = {
  pageTitle: string,
};
function SearchBar({ pageTitle }: SearchBarProp) {
  const [formSearch, setFormSearch] = useState<FormSearchType>(INITIAL_STATE);
  const { setRecipes } = useContext(RecipeContext);
  const navigate = useNavigate();

  const fetchRecipes = async (searchURL: string) => {
    try {
      const response = await fetch(searchURL);
      const dataAPI = await response.json();
      return dataAPI;
    } catch (error: any) {
      alert(error.message);
      return null;
    }
  };

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setFormSearch((prevState) => (
      {
        ...prevState,
        [name]: value,
      }
    ));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { searchInput, searchRadio } = formSearch;
    const drinksOrRecipes = pageTitle === 'Drinks' ? 'cocktail' : 'meal';
    const searchOrFilterMap = {
      ingredient: 'filter.php?i',
      name: 'search.php?s',
      first_letter: 'search.php?f',
    };
    const searchOrFilter = searchOrFilterMap[searchRadio];

    if (searchRadio === 'first_letter' && searchInput.length > 1) {
      window.alert('Your search must have only 1 (one) character');
      return;
    }

    const URL = `https://www.the${drinksOrRecipes}db.com/api/json/v1/1/${searchOrFilter}=${searchInput}`;
    const data = await fetchRecipes(URL);
    console.log(URL);
    if (data === undefined || data === null) return;

    const drinksOrMeals = 'drinks' in data ? data.drinks : data.meals;
    if (drinksOrMeals === null) {
      window.alert('Sorry, we haven\'t found any recipes for these filters.');
      return;
    }
    if (drinksOrMeals.length === 1) {
      const patchRedirect = 'drinks' in data ? `/drinks/${data.drinks[0].idDrink}`
        : `/meals/${data.meals[0].idMeal}`;
      navigate(patchRedirect);
      return;
    }
    setRecipes(drinksOrMeals);
  };
  return (
    <form onSubmit={ handleSubmit }>

      <label htmlFor="search-input">
        <input
          name="searchInput"
          type="text"
          id="search-input"
          placeholder="Search"
          data-testid="search-input"
          value={ formSearch.searchInput }
          onChange={ handleChange }
        />
      </label>

      <fieldset>
        <label htmlFor="ingredient">
          <input
            name="searchRadio"
            type="radio"
            id="ingredient"
            data-testid="ingredient-search-radio"
            value="ingredient"
            onChange={ handleChange }
          />
          Ingredient
        </label>
        <label htmlFor="name">
          <input
            name="searchRadio"
            type="radio"
            id="name"
            data-testid="name-search-radio"
            value="name"
            onChange={ handleChange }
          />
          Name
        </label>
        <label htmlFor="first_letter">
          <input
            name="searchRadio"
            type="radio"
            id="first_letter"
            data-testid="first-letter-search-radio"
            value="first_letter"
            onChange={ handleChange }
          />
          First letter
        </label>
      </fieldset>
      <button
        type="submit"
        data-testid="exec-search-btn"
      >
        Search

      </button>
    </form>
  );
}

export default SearchBar;
