import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
} from '@mui/material';

import api from "../../api/axiosConfig";

function ListarCategorias() {
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/categorias")
      .then((response) => setCategorias(response.data))
      .catch((error) => {
        console.error("Erro ao carregar categorias:", error);
        setCategorias([]);
      });
  }, []);

  const handleEditar = (id) => {
    navigate(`/categorias/editar/${id}`);
  };

  const handleExcluir = (id) => {
    if (window.confirm("Tem certeza que deseja excluir essa categoria?")) {
      api
        .delete(`/categorias/${id}`)
        .then(() => {
          setCategorias(categorias.filter((cat) => cat.id !== id));
        })
        .catch((error) => {
          console.error("Erro ao excluir categoria:", error);
          alert("Não foi possível excluir a categoria. Tente novamente.");
        });
    }
  };
  
  const styles = {
    container: {
      maxWidth: 800,
      margin: '40px auto',
      px: 2,
    },
    title: {
      mb: 3,
      color: '#6a1b9a',
      fontWeight: 600,
      textAlign: 'center',
      fontSize: '1.75rem',
    },
    tableContainer: {
      boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
      borderRadius: 4,
      border: '1px solid #b39ddb',
      background: 'linear-gradient(to bottom, #f9f5ff, #ffffff)',
    },
    headerCell: {
      fontWeight: 700,
      color: '#5e35b1',
      backgroundColor: '#fff',
      borderBottom: '2px solid #b39ddb',
      borderRight: '1px solid #b39ddb',
      '&:last-child': {
        borderRight: 'none',
      },
    },
    bodyCell: {
      borderBottom: '1px solid #d1c4e9',
      borderRight: '1px solid #d1c4e9',
      color: '#4a148c',
      fontWeight: 500,
      '&:last-child': {
        borderRight: 'none',
      },
    },
    actionsCell: {
      display: 'flex',
      justifyContent: 'center',
      gap: 2,
    },
    editButton: {
      backgroundColor: '#7e57c2',
      color: 'white',
      fontWeight: 600,
      padding: '6px 16px',
      borderRadius: 2,
      textTransform: 'none',
      '&:hover': {
        backgroundColor: '#5e35b1',
        boxShadow: '0px 2px 10px rgba(126, 87, 194, 0.4)',
      },
    },
    deleteButton: {
      backgroundColor: '#ef5350',
      color: 'white',
      fontWeight: 600,
      padding: '6px 16px',
      borderRadius: 2,
      textTransform: 'none',
      '&:hover': {
        backgroundColor: '#d32f2f',
        boxShadow: '0px 2px 10px rgba(239, 83, 80, 0.6)',
      },
    },
    addButton: {
      marginTop: '20px',
      backgroundColor: '#7e57c2',
      color: 'white',
      fontWeight: 600,
      padding: '12px 24px',
      borderRadius: 4,
      textTransform: 'none',
      '&:hover': {
        backgroundColor: '#5e35b1',
        boxShadow: '0px 2px 10px rgba(126, 87, 194, 0.6)',
      },
    },
    emptyText: {
      mt: 4,
      color: '#7e57c2',
      fontWeight: 500,
      fontSize: '1.1rem',
      textAlign: 'center',
    },
  };

  return (
    <Box sx={styles.container}>
      <Typography variant="h4" sx={styles.title}>
        Lista de Categorias
      </Typography>

      {categorias.length === 0 ? (
        <Typography sx={styles.emptyText}>
          Nenhuma categoria cadastrada
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={styles.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={styles.headerCell}>Nome</TableCell>
                <TableCell sx={styles.headerCell}>Descrição</TableCell>
                <TableCell sx={{ ...styles.headerCell, textAlign: 'center' }}>
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {categorias.map((cat) => (
                <TableRow key={cat.id} hover>
                  <TableCell sx={styles.bodyCell}>{cat.nome}</TableCell>
                  <TableCell sx={styles.bodyCell}>{cat.descricao}</TableCell>
                  <TableCell sx={{ ...styles.bodyCell, ...styles.actionsCell }}>
                    <Button
                      variant="contained"
                      onClick={() => handleEditar(cat.id)}
                      sx={styles.editButton}
                      size="small"
                    >
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleExcluir(cat.id)}
                      sx={styles.deleteButton}
                      size="small"
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Button
        variant="contained"
        onClick={() => navigate('/categorias/cadastrar')}
        sx={styles.addButton}
        fullWidth
      >
        Cadastrar Nova Categoria
      </Button>
    </Box>
  );
}

export default ListarCategorias;


