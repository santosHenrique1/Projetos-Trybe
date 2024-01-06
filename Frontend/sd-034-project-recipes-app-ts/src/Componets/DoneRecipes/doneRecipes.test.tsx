import { screen, fireEvent } from '@testing-library/dom';
import DoneRecipes from './DoneRecipes';
import renderWithRouter from '../../tests/renderWithRouter';

test('45% coverage', async () => {
  renderWithRouter(<DoneRecipes />, { route: '/done-recipes' });

  const btnMeals = await screen.findByText('Meals');
  fireEvent.click(btnMeals);

  const btnDrink = await screen.findByText('Drinks');
  fireEvent.click(btnDrink);

  const btnAll = await screen.findByText('Meals');
  fireEvent.click(btnAll);
});
