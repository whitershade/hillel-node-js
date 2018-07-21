import React from 'react';
import { Link } from 'react-router-dom';


const Header = ({ logout }) => (
  <header className="header">
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li onClick={ logout }>
          logout
        </li>
      </ul>
    </nav>
  </header>
);


export default Header;
