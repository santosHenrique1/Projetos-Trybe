import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import { renderWithRouter } from '../../Helpers/HelperTests';
import mockGin from '../../Mocks/mockGin';
import mocksBeef from '../../Mocks/mocksBeef';
import SearchBar from './SearchBar';

const inputIngredientRadio = 'ingredient-search-radio';
const inputNameRadio = 'name-search-radio';
const inputFirstLetter = 'first-letter-search-radio';
const searchTextInput = 'search-input';
const btnExecSearch = 'exec-search-btn';

describe('Test with SearchBar Meals', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  beforeEach(async () => {
    global.fetch = vi.fn().mockImplementation(mocksBeef as any);
    window.alert = vi.fn(() => {});
  });
  test('Tests the SearchBar components', () => {
    renderWithRouter(<SearchBar pageTitle="Meals" />, { route: '/meals' });
    expect(screen.getByTestId(inputIngredientRadio));
    expect(screen.getByTestId(inputNameRadio));
    expect(screen.getByTestId(inputFirstLetter));
    expect(screen.getByTestId(btnExecSearch));
  });

  test('Test By Input Radio', async () => {
    const { user } = renderWithRouter(<SearchBar pageTitle="Meals" />, { route: '/meals' });
    const inputName = screen.getByTestId(inputNameRadio);
    await user.click(inputName);
    expect(inputName).toBeChecked();
  });

  test('Checks whether an alert is displayed if the search is made with more than 1 letter in first Letter', async () => {
    window.alert = vi.fn();
    const { user } = renderWithRouter(<SearchBar pageTitle="Meals" />, { route: '/meals' });
    const searchInput = await screen.findByTestId(searchTextInput);
    const searchButton = await screen.findByTestId(btnExecSearch);
    const radioFistletter = await screen.findByTestId(inputFirstLetter);
    await user.type(searchInput, 'aaa');
    await user.click(radioFistletter);
    await user.click(searchButton);
    expect(window.alert).toBeCalled();
  });

  test('Displays an alert if no results are found', async () => {
    window.alert = vi.fn();
    const { user } = renderWithRouter(<SearchBar pageTitle="Meals" />, { route: '/meals' });

    const searchInput = await screen.findByTestId(searchTextInput);
    const searchButton = await screen.findByTestId(btnExecSearch);
    const radioIngredient = await screen.findByTestId(inputIngredientRadio);
    await user.type(searchInput, 'kabum');
    await user.click(radioIngredient);
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => ({ meals: null }),
    });
    await user.click(searchButton);
    expect(window.alert).toBeCalled();
  });
});

describe('Test with SearchBar Drinks', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  beforeEach(async () => {
    global.fetch = vi.fn().mockImplementation(mockGin as any);
    window.alert = vi.fn(() => {});
  });

  test('Displays an alert if no results are found', async () => {
    window.alert = vi.fn();
    const { user } = renderWithRouter(<SearchBar pageTitle="Drinks" />, { route: '/drinks' });

    const searchInput = await screen.findByTestId(searchTextInput);
    const searchButton = await screen.findByTestId(btnExecSearch);
    const radioIngredient = await screen.findByTestId(inputIngredientRadio);
    await user.type(searchInput, 'xablau');
    await user.click(radioIngredient);
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => ({ drinks: null }),
    });
    await user.click(searchButton);
    expect(window.alert).toBeCalled();
  });

  test('Test if the name search is working', async () => {
    const { user } = renderWithRouter(<SearchBar pageTitle="Drinks" />, { route: '/drinks' });
    const searchInput = await screen.findByTestId(searchTextInput);
    const searchButton = await screen.findByTestId(btnExecSearch);
    const radioName = await screen.findByTestId(inputNameRadio);

    await user.type(searchInput, 'gin');
    await user.click(searchButton);
    await user.click(radioName);
    expect(screen.findByText('Gin Fizz'));
  });

  test('Test whether components correctly render on the /drinks page', async () => {
    renderWithRouter(<SearchBar pageTitle="Drinks" />, { route: '/drinks' });
    const searchInput = await screen.findByTestId(searchTextInput);
    const searchButton = await screen.findByTestId(btnExecSearch);
    const radioName = await screen.findByTestId(inputNameRadio);
    expect(radioName).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
});
