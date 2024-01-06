import { AnyAction } from 'redux';
import { SET_EMAIL } from '../actions';

const INITINAL_STATE = {
  email: '',
};

export const user = (state = INITINAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case SET_EMAIL:
      return {
        ...state,

        email: action.email,

      };
    default: return state;
  }
};
