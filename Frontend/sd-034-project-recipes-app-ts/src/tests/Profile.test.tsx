import { fireEvent, screen } from '@testing-library/react';
import Profile from '../Componets/Profile';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando o profile', () => {
  test('Testando os IDS dos elementos', () => {
    renderWithRouter(<App />, { route: '/profile' });
    const text = screen.getByText('Profile');
    expect(text).toBeInTheDocument();
    const imgMeal = screen.getByTestId('meals-bottom-btn');
    expect(imgMeal).toBeInTheDocument();
    const imgDrink = screen.getByTestId('drinks-bottom-btn');
    expect(imgDrink).toBeInTheDocument();
    const email = screen.getByTestId('profile-email');
    expect(email).toBeInTheDocument();

    expect(screen.getByTestId('profile-email'));
    expect(screen.getByTestId('profile-done-btn'));
    expect(screen.getByTestId('profile-favorite-btn'));
    expect(screen.getByTestId('profile-logout-btn'));
  });

  test('Testa botão done recipes', async () => {
    renderWithRouter(<Profile />, { route: '/profile' });
    const btnDoneRecipes = await screen.findByText('Done Recipes');
    fireEvent.click(btnDoneRecipes);
    expect(window.location.pathname).toBe('/done-recipes');
  });
  test('Testa botão Favorite', async () => {
    renderWithRouter(<Profile />, { route: '/profile' });

    const btnFavoriteRecipes = await screen.findByText(/Favorite Recipes/i);
    fireEvent.click(btnFavoriteRecipes);
    expect(window.location.pathname).toBe('/favorite-recipes');
  });
  test('Testa botão logout recipes', async () => {
    renderWithRouter(<Profile />, { route: '/profile' });
    const btnLogout = await screen.findByText('Logout');
    fireEvent.click(btnLogout);
    expect(window.location.pathname).toBe('/');
  });
  test('Testa botão profile', async () => {
    renderWithRouter(<App />, { route: '/profile' });
    const btnProfile = await screen.findByTestId('profile-top-btn');
    fireEvent.click(btnProfile);
  });

  test('checks current route', () => {
    renderWithRouter(<Profile />, { route: '/profile' });
    expect(window.location.pathname).toBe('/profile');
  });
});
