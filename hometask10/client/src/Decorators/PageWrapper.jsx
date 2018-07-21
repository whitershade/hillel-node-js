import React from 'react';
import Header from '../Containers/Header';

const PageWrapper = (Component) => (props) => (
  <React.Fragment>
    <Header />
    <Component { ...props } />
  </React.Fragment>
);


export default PageWrapper;
