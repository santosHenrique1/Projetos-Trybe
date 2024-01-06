import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import MealDetails from './pages/MealDetails';
import DrinkDetails from './pages/DrinkDetails';

function RecipeDetails() {
  const [API, setAPI] = useState<any>({});
  const location = useLocation();
  const params = useParams();
  const route = location.pathname.split('/')[1];

  useEffect(() => {
    const getAPI = async () => {
      if (route === 'meals') {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`);
        const data = await response.json();
        setAPI(data.meals[0]);
      }
      if (route === 'drinks') {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`);
        const data = await response.json();
        setAPI(data.drinks[0]);
      }
    };
    getAPI();
  }, [location.pathname, params.id, route]);

  return (
    <div className="screen">
      {
        route === 'meals'
          ? <MealDetails API={ API } />
          : <DrinkDetails API={ API } />
      }
    </div>
  );
}

export default RecipeDetails;
