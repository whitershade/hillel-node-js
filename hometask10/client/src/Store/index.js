import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import reducers from '../Reducers';


export const history = createHistory();
const routingMiddleware = routerMiddleware(history);

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    applyMiddleware(routingMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ),
);


export default store;
