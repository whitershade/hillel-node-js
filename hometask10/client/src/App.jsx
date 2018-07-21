import React, { Component } from 'react';
import Router from './Router';


class App extends Component {
  componentDidMount() {
    this.props.getProfile();
  }

  render() {
    return (
      <Router />
    );
  }
}


export default App;
