import React from 'react'
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import PrivateRoute from '../Containers/PrivateRoute';
import RegisterPage from '../Containers/RegisterPage';
import LoginPage from '../Containers/LoginPage';
import ProfilePage from '../Containers/ProfilePage';
import { history } from '../Store';


const NoMatch = () => <div>404</div>;

const AppRouter = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <PrivateRoute exact path="/" component={ProfilePage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/login" component={LoginPage} />
      <Route component={NoMatch} />
    </Switch>
  </ConnectedRouter>
);


export default AppRouter;
