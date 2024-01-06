import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../Componets/Header';

const page = 'page-title';
const search = 'search-input';
const btn = 'profile-top-btn';

test('renders Header component with default state', () => {
  render(
    <MemoryRouter initialEntries={ ['/'] }>
      <Header />
    </MemoryRouter>,
  );
  const src = screen.getByTestId('search');
  fireEvent.click(src);
  const a = screen.getByTestId(search);
  expect(a).toBeInTheDocument();
  fireEvent.click(src);
  expect(a).not.toBeInTheDocument();
});

test('renders Header component with "Profile" when on /profile route', () => {
  render(
    <MemoryRouter initialEntries={ ['/'] }>
      <Header />
    </MemoryRouter>,
  );
  const a = screen.getByTestId('search');
  fireEvent.click(screen.getByTestId('btn'));
  expect(screen.getByTestId(page)).toHaveTextContent('Profile');
  expect(a).not.toBeInTheDocument();
});
test('renders Header component with "drinks" when on /drinks route', () => {
  render(
    <MemoryRouter initialEntries={ ['/drinks'] }>
      <Header />
    </MemoryRouter>,
  );
  expect(screen.getByTestId(page)).toHaveTextContent('Drinks');
});
test('renders Header component with "done recipes" when on /done-recipes route', () => {
  render(
    <MemoryRouter initialEntries={ ['/done-recipes'] }>
      <Header />
    </MemoryRouter>,
  );
  expect(screen.getByTestId(page)).toHaveTextContent('Done Recipes');
});

test('renders Header component with "favorite-recipes" when on /favorite-recipes route', () => {
  render(
    <MemoryRouter initialEntries={ ['/favorite-recipes'] }>
      <Header />
    </MemoryRouter>,
  );
  expect(screen.getByTestId(page)).toHaveTextContent('Favorite Recipes');
});

test('clicking profile button navigates to /profile', async () => {
  render(
    <MemoryRouter initialEntries={ ['/'] }>
      <Header />
    </MemoryRouter>,
  );

  fireEvent.click(screen.getByTestId('btn'));
  expect(window.location.pathname).toBe('/');
});

test('clicking profile button toggles the Form component', () => {
  render(
    <MemoryRouter initialEntries={ ['/'] }>
      <Header />
    </MemoryRouter>,
  );
  const se = screen.getByTestId('search');
  const profileButton = screen.getByTestId(btn);
  fireEvent.click(profileButton);

  expect(se).not.toBeInTheDocument();
});

test('toggling Form component shows/hides the search input', () => {
  render(
    <MemoryRouter initialEntries={ ['/meals'] }>
      <Header />
    </MemoryRouter>,
  );

  const toggleButton = screen.getByTestId('search');
  fireEvent.click(toggleButton);
  const searchInput = screen.getByTestId('search-input');

  expect(searchInput).toBeInTheDocument();
});
