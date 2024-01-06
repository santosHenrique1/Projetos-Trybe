import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
  renderWithRouter(<App />);
  const pokemonName = screen.getByTestId('pokemon-name');
  expect(pokemonName).toBeInTheDocument();
  expect(pokemonName).toHaveTextContent(/pikachu/i);
  const pokemonType = screen.getByTestId('pokemon-type');
  expect(pokemonType).toBeInTheDocument();
  expect(pokemonType).toHaveTextContent(/electric/i);
  const pokemonWeight = screen.getByTestId('pokemon-weight');
  expect(pokemonWeight).toBeInTheDocument();
  expect(pokemonWeight).toHaveTextContent(/Average weight: 6.0 kg/i);
  const pokemonImg = screen.getByAltText('Pikachu sprite');
  expect(pokemonImg).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  expect(pokemonImg).toBeInTheDocument();
});
test('O link deve ter a URL /pokemon/<id>, em que <id> é o id do Pokémon exibido', async () => {
  renderWithRouter(<App />);
  const pokemonLink = screen.getByText(/More details/i);
  await userEvent.click(pokemonLink);
  expect(window.location.pathname).toBe('/pokemon/25');
});
test('este se existe um ícone de estrela nos Pokémon favoritados', async () => {
  renderWithRouter(<App />);
  const pokemonLink = screen.getByRole('link', { name: /More details/i });
  await userEvent.click(pokemonLink);

  const pokemonCheckBoxFav = screen.getByRole('checkbox', { name: /pokémon favoritado?/i });
  await userEvent.click(pokemonCheckBoxFav);
  expect(pokemonCheckBoxFav).toBeInTheDocument();

  const pokemonFavIcon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
  expect(pokemonFavIcon).toHaveAttribute('src', '/star-icon.png');
});
