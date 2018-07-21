import * as types from '../Constants/Users';
import * as errorsTypes from '../Constants/Errors';

const initialState = {
  profile: {},
  isAuthenticated: false
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case types.ADD_ITEM:
      return { ...state, profile: payload }

    case types.AUTHENTICATE_USER:
      return { ...state, isAuthenticated: true };

    case types.UNAUTHENTICATE_USER:
    case errorsTypes.AUTHENTICATION_ERROR:
      return { ...state, isAuthenticated: false };

    default:
      return state;
  }
}
