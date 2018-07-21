import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as notifications} from 'react-notification-system-redux';
import user from './Users';


export default combineReducers({
  user,
  notifications,
  routing: routerReducer,
});
