import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export type TypeForm = {
  email: string,
  password: string,
  button: boolean

};

export type TypeAction = {
  type: string,
  email: string,
  password: string,
};

export type RootState = {
  email: string;
};

export type TypeState = {
  user: {
    email: string;
  },
  walle: {
    currencies: string[],
    expenses: [],
    editor: boolean,
    idToEdit: number,
  }
};
export type Dispatch = ThunkDispatch<TypeState, null, AnyAction>;
