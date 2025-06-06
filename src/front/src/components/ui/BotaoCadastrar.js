import React from 'react';
import styled from 'styled-components';
import { Add } from '@mui/icons-material';

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  min-width: 120px;
  border-radius: 12px;
  border: none;
  background-color: #C0A8FE;
  color: #322659;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  
  &:hover {
    background-color: #9F7AEA;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  svg {
    transition: all 0.3s ease;
  }
  
  &:hover svg {
    transform: rotate(90deg) scale(1.1);
  }
`;

export function BotaoCadastrar({ onClick, children, disabled }) {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      <Add style={{ fontSize: 18 }} />
      {children || 'Cadastrar'}
    </StyledButton>
  );
}