import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Login from '../Componets/Login';
import Recipes from '../Componets/recipes/Recipes';
import { renderWithRouter } from '../ServicesApi/helper/helper';
import RecipeInProgress from '../Componets/RecipeInProgress';

test('disables the submit button when email and password are not valid', () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>,
  );

  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const submitButton = screen.getByTestId('login-submit-btn');

  expect(submitButton).toBeDisabled();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();

  fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
  fireEvent.change(passwordInput, { target: { value: 'short' } });

  expect(submitButton).toBeDisabled();

  fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'validpassword' } });

  expect(submitButton).not.toBeDisabled();
});

test('submits the form when the submit button is clicked', () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>,
  );

  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const submitButton = screen.getByTestId('login-submit-btn');

  fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'validpassword' } });

  fireEvent.click(submitButton);
});
test('covarage 45% screen drinks', async () => {
  const drinks = {
    drinks: [
      {
        strCategory: 'Ordinary Drink',
        strDrink: 'GG',
      },
    ],
  };
  global.fetch = vi.fn(() => Promise.resolve({
    json: () => Promise.resolve(drinks),
  } as Response));
  renderWithRouter(<Recipes />, { route: '/drinks' });
  const btnCategory = await screen.findByText(/ordinary drink/i);
  expect(btnCategory).toBeInTheDocument();

  const drink = await screen.findByText(/gg/i);
  expect(drink).toBeInTheDocument();

  fireEvent.click(btnCategory);
  const drink1 = await screen.findByTestId(/0-recipe-card/i);
  expect(drink1).toBeInTheDocument();

  const allBtn = await screen.findByTestId(/all/i);
  fireEvent.click(allBtn);
  expect(drink).toBeInTheDocument();
});
test('covarage 45% screen meals', async () => {
  const meals = {
    meals: [
      {
        strCategory: 'beef',
        strMeal: 'corba',
      },
    ],
  };
  global.fetch = vi.fn(() => Promise.resolve({
    json: () => Promise.resolve(meals),
  } as Response));
  renderWithRouter(<Recipes />, { route: '/meals' });

  const meal = await screen.findByText(/corba/i);
  expect(meal).toBeInTheDocument();

  const btnCategory = await screen.findByText(/beef/i);
  expect(btnCategory).toBeInTheDocument();

  fireEvent.click(btnCategory);
  const meal1 = await screen.findByTestId(/0-recipe-card/i);
  expect(meal1).toBeInTheDocument();

  const allBtn = await screen.findByTestId(/all/i);
  fireEvent.click(allBtn);
  expect(meal).toBeInTheDocument();
});
test('verificar meals progress', async () => {
  const meals = {
    meals: [
      {
        strCategory: 'beef',
        strMeal: 'corba',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
        strIngredient1: 'Lentils',
      },
    ],
  };
  global.fetch = vi.fn(() => Promise.resolve({
    json: () => Promise.resolve(meals),
  } as Response));
  renderWithRouter(<RecipeInProgress />, { route: '/meals/52977/in-progress' });
  const thumb = await screen.findByTestId('recipe-photo');
  expect(thumb).toBeInTheDocument();
  const btnCheck = await screen.findByText('Lentils');
  fireEvent.click(btnCheck);
  expect(btnCheck).toBeInTheDocument();
  const shareIcon = await screen.findByTestId(/share-btn/i);
  fireEvent.click(shareIcon);
  expect(await screen.findByText(/Link copied!/i)).toBeInTheDocument();
  const favoriteIcon = await screen.findByTestId(/favorite-btn/i);
  expect(favoriteIcon).toBeInTheDocument();
  fireEvent.click(favoriteIcon);
  const blackHeartIcon = await screen.findByAltText(/favoriteIcon/i);
  expect(blackHeartIcon).toHaveAttribute('src', '/src/images/blackHeartIcon.svg');
  fireEvent.click(blackHeartIcon);
  expect(favoriteIcon).toBeInTheDocument();
});
test('verificar drinks progress', async () => {
  const drinks = {
    drinks: [
      {
        strCategory: 'Ordinary Drink',
        strDrink: 'GG',
        strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
        strIngredient1: 'Gin',
      },
    ],
  };
  global.fetch = vi.fn(() => Promise.resolve({
    json: () => Promise.resolve(drinks),
  } as Response));
  renderWithRouter(<RecipeInProgress />, { route: '/drinks/17222/in-progress' });
  const thumb = await screen.findByTestId('recipe-photo');
  expect(thumb).toBeInTheDocument();
  const btnCheck = await screen.findByText(/gin/i);
  fireEvent.click(btnCheck);
  expect(btnCheck).toBeInTheDocument();
  const shareIcon = await screen.findByTestId(/share-btn/i);
  fireEvent.click(shareIcon);
  expect(await screen.findByText(/Link copied!/i)).toBeInTheDocument();
  const favoriteIcon = await screen.findByTestId(/favorite-btn/i);
  expect(favoriteIcon).toBeInTheDocument();
  fireEvent.click(favoriteIcon);
  const blackHeartIcon = await screen.findByAltText(/favoriteIcon/i);
  expect(blackHeartIcon).toHaveAttribute('src', '/src/images/blackHeartIcon.svg');
  fireEvent.click(blackHeartIcon);
  expect(favoriteIcon).toBeInTheDocument();
});
