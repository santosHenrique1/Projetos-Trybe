import { AnyAction } from 'redux';
import { SET_CURRENCIES, SET_DELETE, SET_EXPENSES } from '../actions';

const INITINAL_STATE = {
  currencies: [],
  expenses: [],
};

export const wallet = (state = INITINAL_STATE, action:AnyAction) => {
  switch (action.type) {
    case SET_CURRENCIES:
      return {
        ...state,
        currencies: action.currencies,
      };
    case SET_EXPENSES:
      return {
        ...state,
        expenses: [...state.expenses, action.expenses],
      };
    case SET_DELETE:
      return {
        ...state,
        expenses: action.del,
      };
    default: return state;
  }
};
