import { push } from 'react-router-redux'
import { createAction } from 'redux-actions';
import * as types from '../Constants/Errors';
import Notifications from 'react-notification-system-redux';


export const authenticationError = createAction(types.AUTHENTICATION_ERROR);

export const handleError = (error) => (dispatch) => {
  if(error.response.status === 401) {
    dispatch(authenticationError());

    dispatch(Notifications.error({ title: 'Unauthorized', message: 'login please', position: 'tc' }));
    dispatch(push('/login'));
  } else {
    dispatch(Notifications.error({
      title: error.response.status,
      message: error.response.data.message,
      position: 'tc'
    }));
  }
}
