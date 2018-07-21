import axios from 'axios';
import { push } from 'react-router-redux'
import { createAction } from 'redux-actions';
import { handleError } from './Errors';
import * as types from '../Constants/Users';


export const authenticateUser = createAction(types.AUTHENTICATE_USER);
export const unauthenticateUser = createAction(types.UNAUTHENTICATE_USER);

export const startAddItem = createAction(types.START_ADD_ITEM);
export const addItem = createAction(types.ADD_ITEM);
export const addItemError = createAction(types.ADD_ITEM_ERROR);


export const createItem = values => async dispatch => {
  try {
    await axios.post('/api/users', values);

    dispatch(push('/login'));
  } catch (e) {
    dispatch(handleError(e));
  }
};

export const login = values => async dispatch => {
  try {
    const { data: user } = await axios.post('/api/users/login', values);

    dispatch(authenticateUser());
    dispatch(addItem(user));

    dispatch(push('/'));
  } catch (e) {
    dispatch(handleError(e));
  }
};

export const logout = values => async dispatch => {
  try {
    await axios.get('/api/users/logout');

    dispatch(unauthenticateUser());
    dispatch(addItem({}));

    dispatch(push('/'));
  } catch (e) {
    dispatch(handleError(e));
  }
};

export const getProfile = values => async dispatch => {
  try {
    const { data: user } = await axios.get('/api/users/me');

    dispatch(authenticateUser());
    dispatch(addItem(user));

    dispatch(push('/'));
  } catch (e) {
    dispatch(handleError(e));
  }
}
