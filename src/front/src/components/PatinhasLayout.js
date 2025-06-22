import React from 'react';
import { Box } from '@mui/material';

function PatinhasLayout({ children }) {
  return (
    <Box
      sx={{
       backgroundImage: 'url(/imgs/PatinhasFundo.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',     
        minHeight: '100%', 
        flexGrow: 1,       
        display: 'flex',   
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        boxSizing: 'border-box',
        overflowY: 'auto',
      }}
    >
      {children} {/* Oonde o conteúdo das telas de cadastro/edição será renderizado */}
    </Box>
  );
}

export default PatinhasLayout;