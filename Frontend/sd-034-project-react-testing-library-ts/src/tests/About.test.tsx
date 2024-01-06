import { render, screen } from '@testing-library/react';
import { About } from '../pages';

describe('Teste o componente <About.tsx />.', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const textH2 = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(textH2).toBeInTheDocument();
  });
  test('Teste se a página contém dois parágrafos com o tesxto sobre a Pokédex', () => {
    render(<About />);
    const textP1 = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon.');
    expect(textP1).toBeInTheDocument();
    const textP2 = screen.getByText('One can filter Pokémon by type, and see more details for each one of them.');
    expect(textP2).toBeInTheDocument();
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.', () => {
    render(<About />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(image).toBeInTheDocument();
  });
});
