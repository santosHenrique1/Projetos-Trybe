import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('teste se o h2 com o texto <name> Detaisl', async () => {
  renderWithRouter(<App />);
  const moreDatails = screen.getByRole('link', { name: /More Details/i });
  await userEvent.click(moreDatails);
  const nameDatails = screen.getByRole('heading', { name: 'Pikachu Details' });
  expect(nameDatails).toBeInTheDocument();
  const sumaryDatails = screen.getByRole('heading', { name: /summary/i });
  expect(sumaryDatails).toBeInTheDocument();
  const sumaryText = screen.getByText(/This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat./i);
  expect(sumaryText).toBeInTheDocument();
  const localGameName = screen.getByRole('heading', { name: /Game Locations of Pikachu/i });
  expect(localGameName).toBeInTheDocument();

  const checkboxFavPokemon = screen.getByRole('checkbox', { name: /pokémon favoritado?/i });
  await userEvent.click(checkboxFavPokemon);

  expect(screen.getByRole('img', { name: /pikachu is marked as favorite/i })).toBeInTheDocument();

  const localName1 = screen.getByText(/Kanto Viridian Forest/i);
  expect(localName1).toBeInTheDocument();
  const localName2 = screen.getByText(/Kanto Power Plant/i);
  expect(localName2).toBeInTheDocument();

  const imgLocal = screen.getAllByRole('img', { name: /Pikachu location/i });
  expect(imgLocal).toHaveLength(2);
  expect(imgLocal[0]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
  expect(imgLocal[1]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
});
