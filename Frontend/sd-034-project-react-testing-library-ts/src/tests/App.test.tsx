import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Teste se o o topo da aplicação contem um conjuto de links de navegação', () => {
  test('Teste o componente <App.tsx />', () => {
    render(<App />, { wrapper: BrowserRouter });
    const home = screen.getByText(/Home/i);
    expect(home).toBeInTheDocument();
    const about = screen.getByText(/About/i);
    expect(about).toBeInTheDocument();
    const fav = screen.getByText(/Favorite Pokémon/i);
    expect(fav).toBeInTheDocument();
  });
});
