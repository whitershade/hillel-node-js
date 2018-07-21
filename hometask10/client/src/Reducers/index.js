import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './Users';


export default combineReducers({
  user,
  routing: routerReducer,
});
