import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';


const Li = ({ to, children, onClick }) => (
  <li className="header__li" onClick={ onClick }>
    { to ? <Link to={ to } className="header__link">
      { children }
    </Link> : children }
  </li>
)

const Header = ({ logout, isAuthenticated }) => (
  <header className="header">
    <div className="container">
      <nav className="header__nav">
        <Li to='/'>Profile</Li>
        <ul className="header__ul">
            { isAuthenticated ? (
              <React.Fragment>
                <Li onClick={ logout }>logout</Li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Li to='/register'>Register</Li>
                <Li to='/login'>Login</Li>
              </React.Fragment>
            )}
        </ul>
      </nav>
    </div>
  </header>
);


export default Header;
