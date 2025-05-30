import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Header>
      <LeftContainer to="/">
        <Logo src="/imgs/logo.png" alt="Logo ERPet" />
        <Title>ERPet</Title>
      </LeftContainer>

      <RightContainer>
        <IconUser src="/imgs/user-icon.png" alt="Ícone de Usuário" />
        <IconSair src="/imgs/sair-icon.png" alt="Ícone de Sair" />
      </RightContainer>
    </Header>
  );
};

export default NavBar;

// Styled Components

const Header = styled.header`
  background-color: #6039B8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  color: white;
`;

const LeftContainer = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none; /* tira underline */
  cursor: pointer;
  color: inherit; /* herda a cor do texto (white) */
`;

const RightContainer = styled.nav`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 60px;
  margin-right: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #fafafa;
`;

const IconUser = styled.img`
  height: 35px;
  margin-right: 1rem;
  cursor: pointer;
`;

const IconSair = styled.img`
  height: 35px;
  cursor: pointer;
`;
