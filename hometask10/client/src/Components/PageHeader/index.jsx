import React from 'react';
import './styles.css';


const PageHeader = ({ children }) => (
  <h1 className="page-header">
    { children }
  </h1>
);


export default PageHeader;
