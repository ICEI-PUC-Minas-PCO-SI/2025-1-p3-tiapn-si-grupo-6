import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
} from '@mui/material';

function EditarCategoria() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8080/categorias/${id}`)
      .then(response => {
        const categoria = response.data;
        setNome(categoria.nome);
        setDescricao(categoria.descricao);
      })
      .catch(error => {
        console.error(error);
        setErro('Categoria não encontrada!');
        setTimeout(() => {
          navigate('/categorias');
        }, 2000);
      });
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome.trim()) {
      setErro('O campo nome é obrigatório.');
      return;
    }

    const categoriaAtualizada = { nome, descricao };

    axios.put(`http://localhost:8080/categorias/${id}`, categoriaAtualizada)
      .then(() => {
        setSucesso(true);
        setTimeout(() => {
          navigate('/categorias'); // 🔁 Caminho corrigido
        }, 1000);
      })
      .catch(error => {
        console.error(error);
        setErro('Erro ao atualizar categoria.');
      });
  };

  const handleCancelar = () => {
    navigate('/categorias'); // 🔁 Caminho corrigido
  };

  const styles = {
    container: {
      mt: 4,
      mb: 4,
      px: isSmallScreen ? 2 : 4,
      maxWidth: 600,
    },
    paper: {
      p: 4,
      borderRadius: 4,
      boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
      background: 'linear-gradient(to bottom, #f9f5ff, #ffffff)',
    },
    title: {
      color: '#6a1b9a',
      fontWeight: 600,
      fontSize: isSmallScreen ? '1.5rem' : '1.75rem',
      mb: 3,
      textAlign: 'center',
    },
    textField: {
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#d1c4e9',
        },
        '&:hover fieldset': {
          borderColor: '#b39ddb',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#7e57c2',
        },
      },
    },
    buttonsBox: {
      display: 'flex',
      justifyContent: 'center',
      gap: 2,
      mt: 3,
    },
    saveButton: {
      backgroundColor: '#7e57c2',
      color: 'white',
      fontWeight: 600,
      padding: '10px 24px',
      borderRadius: 2,
      '&:hover': {
        backgroundColor: '#5e35b1',
        boxShadow: '0px 2px 10px rgba(126, 87, 194, 0.4)',
      },
    },
    cancelButton: {
      backgroundColor: '#ef5350',
      color: 'white',
      fontWeight: 600,
      padding: '10px 24px',
      borderRadius: 2,
      '&:hover': {
        backgroundColor: '#d32f2f',
        boxShadow: '0px 2px 10px rgba(239, 83, 80, 0.6)',
      },
    },
  };

  return (
    <Container maxWidth="sm" sx={styles.container}>
      <Paper sx={styles.paper}>
        <Typography component="h1" variant="h5" sx={styles.title}>
          Editar Categoria
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          <TextField
            label="Nome da Categoria"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            fullWidth
            sx={styles.textField}
          />

          <TextField
            label="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            multiline
            rows={4}
            fullWidth
            sx={styles.textField}
          />

          <Box sx={styles.buttonsBox}>
            <Button type="submit" sx={styles.saveButton}>
              Salvar
            </Button>

            <Button type="button" onClick={handleCancelar} sx={styles.cancelButton}>
              Cancelar
            </Button>
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={!!erro}
        autoHideDuration={6000}
        onClose={() => setErro('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setErro('')}
          severity="error"
          sx={{ width: '100%', bgcolor: 'error.light', color: 'error.contrastText' }}
        >
          {erro}
        </Alert>
      </Snackbar>

      <Snackbar
        open={sucesso}
        autoHideDuration={6000}
        onClose={() => setSucesso(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSucesso(false)}
          severity="success"
          sx={{ width: '100%', bgcolor: 'success.light', color: 'success.contrastText' }}
        >
          Categoria atualizada com sucesso!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default EditarCategoria;
