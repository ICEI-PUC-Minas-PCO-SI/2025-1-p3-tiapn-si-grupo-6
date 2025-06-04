// components/SelectActionCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptIcon from '@mui/icons-material/Receipt';
import StoreIcon from '@mui/icons-material/Store';
import CompareIcon from '@mui/icons-material/Compare';
import HistoryIcon from '@mui/icons-material/History';
import GroupIcon from '@mui/icons-material/Group';

const roxo = '#6039B8';

const cards = [
  {
    id: 1,
    title: 'Usuários',
    description: 'Gerencie os usuários do sistema.',
    icon: <PeopleIcon sx={{ fontSize: 40, color: '#fff' }} />,
    route: '/usuarios',
  },
  {
    id: 2,
    title: 'Produtos',
    description: 'Cadastre e visualize os produtos.',
    icon: <InventoryIcon sx={{ fontSize: 40, color: '#fff' }} />,
    route: '/produtos',
  },
  {
    id: 3,
    title: 'Clientes',
    description: 'Cadastre e visualize os clientes.',
    icon: <GroupIcon sx={{ fontSize: 40, color: '#fff' }} />,
    route: '/clientes',
  },
  {
    id: 4,
    title: 'Realizar Venda',
    description: 'Cadastre e acompanhe as vendas.',
    icon: <ShoppingCartIcon sx={{ fontSize: 40, color: '#fff' }} />,
    route: '/vendas',
  },
  {
    id: 5,
    title: 'Consultar Estoque',
    description: 'Visualize e controle os produtos.',
    icon: <InventoryIcon sx={{ fontSize: 40, color: '#fff' }} />,
    route: '/estoque',
  },
  {
    id: 6,
    title: 'Pedido de Compra',
    description: 'Registre pedidos de produtos.',
    icon: <ReceiptIcon sx={{ fontSize: 40, color: '#fff' }} />,
    route: '/pedidos',
  },
  {
    id: 7,
    title: 'Fornecedor',
    description: 'Gerencie os fornecedores.',
    icon: <StoreIcon sx={{ fontSize: 40, color: '#fff' }} />,
    route: '/fornecedores',
  },
  {
    id: 8,
    title: 'Comparar XML',
    description: 'Compare arquivos XML de notas.',
    icon: <CompareIcon sx={{ fontSize: 40, color: '#fff' }} />,
    route: '/comparar-xml',
  },
  {
    id: 9,
    title: 'Histórico',
    description: 'Veja o histórico de alterações.',
    icon: <HistoryIcon sx={{ fontSize: 40, color: '#fff' }} />,
    route: '/historico',
  },
];

function SelectActionCard() {
  const navigate = useNavigate();

  return (
  <Box
    sx={{
      width: '100%',
      display: 'grid',
      gridTemplateColumns: {
        xs: 'repeat(auto-fill, minmax(250px, 1fr))',
        md: 'repeat(3, 1fr)',
      },
      gap: 3,
      padding: 4,
      justifyItems: 'center',
    }}
  >

      {cards.map((card) => (
        <Card
          key={card.id}
          elevation={4}
          sx={{
            backgroundColor: roxo,
            color: '#fff',
            width: '100%',
            maxWidth: 300,
            '&:hover': {
              boxShadow: '0 0 15px rgba(96, 57, 184, 0.7)',
              transform: 'scale(1.03)',
              transition: 'all 0.2s ease-in-out',
            },
          }}
        >
          <CardActionArea onClick={() => navigate(card.route)}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Box sx={{ mb: 2 }}>{card.icon}</Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>
                {card.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                {card.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}

export default SelectActionCard;
