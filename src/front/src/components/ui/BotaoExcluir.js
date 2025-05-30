import React from 'react';
import styled from 'styled-components';
import { Delete } from '@mui/icons-material';

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 8px;
  border: none;
  background-color: transparent;
  color: #E53E3E;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #FED7D7;
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  svg {
    font-size: 18px;
  }
`;

export function BotaoExcluir({ onClick, disabled }) {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      <Delete />
    </StyledButton>
  );
}