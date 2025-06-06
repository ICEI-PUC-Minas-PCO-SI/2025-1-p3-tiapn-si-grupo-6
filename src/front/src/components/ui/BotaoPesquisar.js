import React from 'react';
import styled from 'styled-components';
import { Search } from '@mui/icons-material';

// Componente estilizado
const StyledButton = styled.button`
  /* Layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  overflow: hidden;

  /* Dimensões */
  padding: 12px 24px;
  min-width: 120px;

  /* Bordas */
  border-radius: 12px;
  border: 2px solid #63B3ED;
  outline: none;

  /* Cores */
  background-color: #8FDEFF;
  color: #2A4365;

  /* Tipografia */
  font-family: 'Poppins', 'Segoe UI', system-ui, sans-serif;
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 0.5px;
  text-align: center;
  text-transform: none;
  text-decoration: none;

  /* Efeitos e transições */
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transform: translateY(0);

  /* Efeito de hover */
  &:hover {
    background-color: #7EC8E3;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  /* Efeito de clique */
  &:active {
    transform: translateY(1px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  /* Foco (acessibilidade) */
  &:focus {
    box-shadow: 0 0 0 3px rgba(143, 222, 255, 0.5);
  }

  /* Estado desabilitado */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: #CBD5E0;
    transform: none !important;
  }

  /* Efeito de ripple (onda ao clicar) */
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%, -50%);
    transform-origin: 50% 50%;
  }

  &:active::after {
    animation: ripple 0.6s ease-out;
  }

  /* Animação do ícone */
  svg {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }

  /* Animação do ripple */
  @keyframes ripple {
    0% {
      transform: scale(0, 0);
      opacity: 1;
    }
    100% {
      transform: scale(20, 20);
      opacity: 0;
    }
  }
`;

// Componente principal
function BotaoPesquisar({ onClick, children, disabled }) {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      <Search style={{ fontSize: 18 }} />
      {children || 'Pesquisar'}
    </StyledButton>
  );
}

export default BotaoPesquisar;