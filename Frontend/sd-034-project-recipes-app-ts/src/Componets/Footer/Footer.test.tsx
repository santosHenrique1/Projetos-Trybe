import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from './Footer';

describe('Test with <Footer />', () => {
  test('Tests the footer components', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    expect(screen.getByTestId('drinks-bottom-btn'));
    expect(screen.getByTestId('meals-bottom-btn'));
  });
});
