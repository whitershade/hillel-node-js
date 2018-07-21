import { push } from 'react-router-redux'
import { createAction } from 'redux-actions';
import * as types from '../Constants/Errors';


export const authenticationError = createAction(types.AUTHENTICATION_ERROR);

export const handleError = (error) => (dispatch) => {
  if(error.response.status === 401) {
    dispatch(authenticationError());

    dispatch(push('/login'));
  }
}
