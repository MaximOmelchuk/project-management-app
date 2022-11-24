import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = (): JSX.Element => {
  return (
    <header className="header">
      <nav className="header__menu">
        <ul className="menu__list">
          <li className="menu__link">
            <NavLink
              to="/sign-up"
            >
              sign-up
            </NavLink>
          </li>
          <li className="menu__link">
            <NavLink
              to="/sign-in"
            >
              sign-in
            </NavLink>
          </li>
          <li className="menu__link">
            <NavLink
              to="/user-info"
            >
              user-info
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
