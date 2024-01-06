import React from 'react';
import { render, screen, act } from '@testing-library/react';
import App from '../App';
import ApiDataProvider from '../context/apiDataProvider';
import userEvent from '@testing-library/user-event';



test('I am your test', async() => {
  await act(async()=> {
    render(
  <ApiDataProvider>
    <App />;
  </ ApiDataProvider>
    )});

  const inputPlaceholder = screen.getAllByRole('textbox')[0];
  expect(inputPlaceholder).toBeInTheDocument();
 

  const sortColumn = screen.getByTestId('column-sort');
  expect(sortColumn).toBeInTheDocument();
  await userEvent.selectOptions(sortColumn, 'orbital_period');

  const filterColumn = screen.getByTestId('column-filter');
  expect(filterColumn).toBeInTheDocument();
  await userEvent.selectOptions(filterColumn, 'orbital_period');

  const operationColumn = screen.getByTestId('comparison-filter');
  expect(operationColumn).toBeInTheDocument();
  await userEvent.selectOptions(operationColumn, 'maior que');
    

 
  const ascBtn = screen.getByRole('radio', { name: /ascendente/i });
  await userEvent.click(ascBtn);
  const orderBy = screen.getByRole('combobox', { name: /ordenar/i});
  await userEvent.click(orderBy);
  const orderBtn = screen.getByRole('button', { name: /ordenar/i });
  await userEvent.click(orderBtn);



  
 
});
