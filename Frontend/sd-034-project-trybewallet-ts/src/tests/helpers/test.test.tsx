import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';

test('A pagina deve conter input email e senha', () => {
  renderWithRouterAndRedux(<App />);
  const textLogin = screen.getByText(/login/i);
  expect(textLogin).toBeInTheDocument();

  const textLebalEmail = screen.getByPlaceholderText(/example@example\.com/i);
  expect(textLebalEmail).toBeInTheDocument();
  const inputPassword = screen.getByPlaceholderText(/password/i);
  expect(inputPassword).toBeInTheDocument();
});
test('Testar o botão entrar', async () => {
  renderWithRouterAndRedux(<App />);
  const buttonSubmit = screen.getByRole('button', { name: /entrar/i });
  expect(buttonSubmit).toBeInTheDocument();
  expect(buttonSubmit).toBeDisabled();
  const textLebalEmail = screen.getByPlaceholderText(/example@example\.com/i);
  const inputPassword = screen.getByPlaceholderText(/password/i);
  await userEvent.type(textLebalEmail, 'example@example.com');
  await userEvent.type(inputPassword, '@henrique123');
  expect(buttonSubmit).toBeEnabled();
  await userEvent.click(buttonSubmit);
  expect(screen.getByText('example@example.com')).toBeInTheDocument();
});
