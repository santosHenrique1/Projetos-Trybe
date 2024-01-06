import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
  renderWithRouter(<App />, { route: '/teste' });
  const notFoundText = screen.getByRole('heading', { name: /Page requested not found/i });
  expect(notFoundText).toBeInTheDocument();
});
test('Teste se a página mostra a imagem com o texto alternativo', () => {
  renderWithRouter(<App />, { route: '/teste' });
  const imgPokemon = screen.getByAltText(/Clefairy pushing buttons randomly with text I have no idea what i'm doing/i);
  expect(imgPokemon).toBeInTheDocument();
});
