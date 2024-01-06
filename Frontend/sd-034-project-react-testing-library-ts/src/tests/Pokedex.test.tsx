import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Teste se a página contém um heading h2 com o texto Encountered Pokémon.', () => {
  renderWithRouter(<App />);
  const header = screen.getByRole('heading', { name: 'Encountered Pokémon' });
  expect(header).toBeInTheDocument();
});
test('Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.', async () => {
  renderWithRouter(<App />);
  const buttonAll = screen.getByRole('button', { name: 'All' });
  expect(buttonAll).toBeInTheDocument();
  const filtterButton = screen.getAllByTestId('pokemon-type-button');
  expect(filtterButton).toHaveLength(7);

  const pokemonFire = screen.getByRole('button', { name: 'Fire' });
  await userEvent.click(pokemonFire);
  expect(pokemonFire).toBeInTheDocument();
  const charmander = screen.getByText(/charmander/i);
  expect(charmander).toBeInTheDocument();
  const buttonNext = screen.getByRole('button', { name: 'Próximo Pokémon' });
  expect(buttonNext).toBeInTheDocument();
  await userEvent.click(buttonNext);
  const rapidash = screen.getByText(/Rapidash/i);
  expect(rapidash).toBeInTheDocument();
  await userEvent.click(buttonAll);
  const reset2 = screen.getByText(/pikachu/i);
  expect(reset2).toBeInTheDocument();

  const pokemonPsychic = screen.getByRole('button', { name: 'Psychic' });
  await userEvent.click(pokemonPsychic);
  expect(pokemonPsychic);
  const alakazam = screen.getByText(/alakazam/i);
  expect(alakazam).toBeInTheDocument();
  await userEvent.click(buttonNext);
  const mew = screen.getByText(/mew/i);
  expect(mew).toBeInTheDocument();
  await userEvent.click(buttonAll);
  const reset3 = screen.getByText(/pikachu/i);
  expect(reset3).toBeInTheDocument();

  const pokemonPoison = screen.getByRole('button', { name: 'Poison' });
  await userEvent.click(pokemonPoison);
  expect(pokemonPoison);
  const ekans = screen.getByText(/ekans/i);
  expect(ekans).toBeInTheDocument();
  await userEvent.click(buttonAll);
  const reset4 = screen.getByText(/pikachu/i);
  expect(reset4).toBeInTheDocument();

  const pokemonNormal = screen.getByRole('button', { name: 'Normal' });
  await userEvent.click(pokemonNormal);
  expect(pokemonNormal);
  const snorlax = screen.getByText(/snorlax/i);
  expect(snorlax).toBeInTheDocument();
  await userEvent.click(buttonAll);
  const reset5 = screen.getByText(/pikachu/i);
  expect(reset5).toBeInTheDocument();

  const pokemonEletric = screen.getByRole('button', { name: 'Electric' });
  await userEvent.click(pokemonEletric);
  expect(pokemonEletric);
  const pikachu = screen.getByText(/pikachu/i);
  expect(pikachu).toBeInTheDocument();
  await userEvent.click(buttonAll);
  const reset6 = screen.getByText(/pikachu/i);
  expect(reset6).toBeInTheDocument();

  const pokemonBug = screen.getByRole('button', { name: 'Bug' });
  await userEvent.click(pokemonBug);
  expect(pokemonBug);
  const caterpie = screen.getByText(/caterpie/i);
  expect(caterpie).toBeInTheDocument();
  await userEvent.click(buttonAll);
  const reset7 = screen.getByText(/pikachu/i);
  expect(reset7).toBeInTheDocument();

  const pokemonDragon = screen.getByRole('button', { name: 'Dragon' });
  await userEvent.click(pokemonDragon);
  expect(pokemonDragon);
  const dragonair = screen.getByText(/Dragonair/i);
  expect(dragonair).toBeInTheDocument();
  await userEvent.click(buttonAll);
  const reset8 = screen.getByText(/pikachu/i);
  expect(reset8).toBeInTheDocument();
});
test('Teste se a Pokédex contém um botão para resetar o filtro', async () => {
  renderWithRouter(<App />);
  const buttonReset = screen.getByRole('button', { name: 'All' });
  await userEvent.click(buttonReset);
  const pikachu = screen.getByText(/pikachu/i);
  expect(pikachu).toBeInTheDocument();
});
