import { useState } from 'react';
import { Drink, Meal, RecipesProviderProp } from '../type';
import { RecipeContext } from './RecipeContext';

export function RecipesProvider({ children }: RecipesProviderProp) {
  const [recipes, setRecipes] = useState<Meal[] | Drink[]>([]);

  const providerValues = {
    recipes,
    setRecipes,
  };
  return (
    <RecipeContext.Provider value={ providerValues }>
      {children}
    </RecipeContext.Provider>
  );
}
