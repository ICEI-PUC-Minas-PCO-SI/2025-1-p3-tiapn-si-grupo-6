import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);


  const handleLogoutClick = () => {
    setShowConfirm(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('usuario');
    setShowConfirm(false);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
      navigate('/');
    }, 1500); //redireciona em 2s
  };

  // Cancela logout
  const cancelLogout = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <Header>
        <LeftContainer to='/home'>
          <Logo src="/imgs/logo-icon.png" alt="Logo ERPet" />
          <Title>ERPet</Title>
        </LeftContainer>

        <RightContainer>
          <IconUser src="/imgs/user-icon.png" alt="Ícone de Usuário" />
          <IconSair
            src="/imgs/sair-icon.png"
            alt="Ícone de Sair"
            onClick={handleLogoutClick}
            title="Sair"
          />
        </RightContainer>
      </Header>


      {showConfirm && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Confirmação de Logout</ModalTitle>
            <ModalText>Tem certeza que deseja sair?</ModalText>
            <ModalButtons>
              <ModalButtonCancel onClick={cancelLogout}>Cancelar</ModalButtonCancel>
              <ModalButtonConfirm onClick={confirmLogout}>Sair</ModalButtonConfirm>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}

      {showAlert && (
        <AlertBox>Desconectando com segurança...</AlertBox>
      )}
    </>
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
  position: relative;
  z-index: 10;
`;

const LeftContainer = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  color: inherit;
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
  &:hover {
    filter: brightness(0.8);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  width: 320px;
  text-align: center;
  box-shadow: 0 0 15px rgba(0,0,0,0.3);
`;

const ModalTitle = styled.h2`
  margin-bottom: 1rem;
  color: #6039B8;
`;

const ModalText = styled.p`
  margin-bottom: 2rem;
  font-size: 1.1rem;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ModalButtonCancel = styled.button`
  background-color: #ccc;
  color: #333;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    background-color: #bbb;
  }
`;

const ModalButtonConfirm = styled.button`
  background-color: #6039B8;
  color: white;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    background-color: #4b2e8a;
  }
`;

const AlertBox = styled.div`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #d4edda;
  color: #155724;
  padding: 1rem 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px #155724aa;
  font-weight: 700;
  z-index: 1000;
  user-select: none;
  pointer-events: none;
`;
