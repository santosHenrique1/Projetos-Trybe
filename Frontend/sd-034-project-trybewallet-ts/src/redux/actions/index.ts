import { Dispatch } from '../../Type/types';
import { apiCurrencies } from '../../services/api';

export const SET_EMAIL = 'SET_EMAIL';
export const emailAction = (email:string) => ({
  type: SET_EMAIL,
  email,
});

export const SET_CURRENCIES = 'SET_CURRENCIES';
export const currenciesAction = (currencies:string[]) => ({
  type: SET_CURRENCIES,
  currencies,
});

export const currenciesThunk = () => async (dispatch: Dispatch) => {
  try {
    const data = await apiCurrencies();
    const currencies = Object.keys(data);
    const filterCurrencies = currencies.filter((currencie) => currencie !== 'USDT');
    dispatch(currenciesAction(filterCurrencies));
  } catch (e: any) {
    console.log(e);
  }
};
export const SET_EXPENSES = 'SET_EXPENSES';
export const expensesAction = (expenses:any) => ({
  type: SET_EXPENSES,
  expenses,
});

export const SET_DELETE = 'SET_DELETE';
export const deleteAction = (del:any) => ({
  type: SET_DELETE,
  del,
});
