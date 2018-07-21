import React from 'react';
import Header from '../Containers/Header';
import Footer from '../Components/Footer';

const PageWrapper = (Component) => (props) => (
  <React.Fragment>
    <Header />
    <main className="main">
      <div className="container">
        <Component { ...props } />
      </div>
    </main>
    <Footer />
  </React.Fragment>
);


export default PageWrapper;
