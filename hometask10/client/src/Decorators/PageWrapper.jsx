import React from 'react';
import Header from '../Components/Header';

const PageWrapper = (Component) => (props) => (
  <React.Fragment>
    <Header />
    <Component { ...props } />
  </React.Fragment>
);


export default PageWrapper;
