import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Styled Components for Navbar
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #007bff;
  color: white;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0 15px;
  font-size: 18px;

  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = () => (
  <Nav>
    <NavLink to="/"><Logo>Tracker </Logo></NavLink>
    
    <div>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/signup">Signup</NavLink>
    </div>
  </Nav>
);

export default Navbar;
