import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { FavoritePokemon } from '../pages';

describe('este o componente <FavoritePokemon.tsx />', () => {
  test('É exibida na tela a mensagem No favorite pokemon found caso a pessoa não tenha Pokémon favorito', () => {
    render(<FavoritePokemon />, { wrapper: BrowserRouter });
    const text = screen.getByText(/no favorite pokémon found/i);
    expect(text).toBeInTheDocument();
  });
  test('Apenas são exibidos os Pokémon favoritados.', async () => {
    render(<App />, { wrapper: BrowserRouter });
    expect(screen.getByText('Encountered Pokémon')).toBeInTheDocument();
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    await userEvent.click(moreDetails);
    const favPokemon = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    await userEvent.click(favPokemon);
    const favLink = screen.getByRole('link', { name: /Favorite Pokémon/i });
    await userEvent.click(favLink);
    const pokemonText = screen.getByText(/Pikachu/i);
    expect(pokemonText).toBeInTheDocument();
  });
});
