import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavBarLanding = () => {
  return (
    <Header>
      <LeftContainer to="/">
        <Logo src="/imgs/logo-icon.png" alt="Logo ERPet" />
        <Title>ERPet</Title>
      </LeftContainer>

      <RightContainer>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/sobre">Sobre</NavLink>
          <NavLink to="/contato">Contato</NavLink>
          <NavLink to="/servicos">Serviços</NavLink>
        </NavLinks>

        <LoginButton to="/login">Login</LoginButton>
      </RightContainer>
    </Header>
  );
};

export default NavBarLanding;

// Styled Components
const Header = styled.header`
  background-color: #6039B8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 2.5rem;
  color: white;
`;

const LeftContainer = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  color: inherit;
`;

const Logo = styled.img`
  height: 70px;
  margin-right: 1.2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
`;

const RightContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.8rem;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;

  &:hover {
    text-decoration: underline;
    color: #d1c4e9;
  }
`;

const LoginButton = styled(Link)`
  background-color: white;
  color: #6039B8;
  padding: 0.5rem 1.2rem;
  text-decoration: none;
  border-radius: 5px;
  font-weight: 700;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #d1c4e9;
  }
`;
