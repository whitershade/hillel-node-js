import React, { Component } from 'react';
import Notifications from 'react-notification-system-redux';
import Router from '../Router';
import './styles.css';


class App extends Component {
  componentDidMount() {
    this.props.getProfile();
  }

  render() {
    const { notifications } = this.props;

    return (
      <React.Fragment>
        <Notifications notifications={ notifications } />
        <Router />
      </React.Fragment>
    );
  }
}


export default App;
