import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MealsRecipes } from './MealsRecipe';
import { DrinksRecipes } from './DrinkRecipes';

function Recipes() {
  const location = useLocation();
  const [route, setRoute] = useState(location);
  useEffect(() => {
    setRoute(location);
  }, [location]);

  return (
    <div>
      {route.pathname === '/meals' ? (
        <div>
          <MealsRecipes />
        </div>
      ) : (
        <div>
          <DrinksRecipes />
        </div>
      )}
    </div>

  );
}
export default Recipes;
