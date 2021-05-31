import React from 'react';
import styled from 'styled-components/macro';
import { NavLink } from 'react-router-dom';
function HeaderNavigation() {
  return (
    <header>
      <Nav>
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink to="/player">Player</NavLink>
        <NavLink to="/buyinglist">Buying List</NavLink>
      </Nav>
    </header>
  );
}

export default HeaderNavigation;

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  background: hsl(197, 90%, 90%);
  justify-content: space-around;

  a {
    font-size: 1.5rem;
    border-radius: 5px;
    text-decoration: none;
    margin-left: 5px;
    margin-right: 5px;
    padding: 5px;
  }
`;
