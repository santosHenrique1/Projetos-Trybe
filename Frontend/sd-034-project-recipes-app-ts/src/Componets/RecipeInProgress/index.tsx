import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MealsInProgress from './pages/MealsInProgress';
import DrinksInProgress from './pages/DrinksInProgress';
import './index.css';

function RecipeInProgress() {
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
          ? <MealsInProgress API={ API } />
          : <DrinksInProgress API={ API } />
      }
    </div>
  );
}

export default RecipeInProgress;
