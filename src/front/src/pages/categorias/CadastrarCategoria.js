import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Box,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';

function CadastrarCategoria() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [categoria, setCategoria] = useState({
    nome: '',
    descricao: ''
  });

  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoria(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validarCampos = () => {
    if (!categoria.nome.trim()) {
      setErro('O campo nome é obrigatório');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    
    if (!validarCampos()) {
      return;
    }
    
    try {
      setCarregando(true);
      
      const dadosCategoria = {
        nome: categoria.nome,
        descricao: categoria.descricao
      };
      
      const response = await axios.post('http://localhost:8080/categorias', dadosCategoria);
      
      if (response.status === 201) {
        setSucesso(true);
        setCategoria({ nome: '', descricao: '' });  // <-- Limpa os campos aqui!
        setTimeout(() => {
          navigate('/categorias');
        }, 1500);
      }
    } catch (error) {
      console.error('Erro ao cadastrar categoria:', error);
      if (error.response) {
        setErro(`Erro ao cadastrar categoria: ${error.response.data.message || error.response.statusText}`);
      } else {
        setErro('Erro de conexão. Verifique sua internet e tente novamente.');
      }
    } finally {
      setCarregando(false);
    }
  };

  // Estilos personalizados
  const styles = {
    container: {
      mt: 4,
      mb: 4,
      px: isSmallScreen ? 2 : 4
    },
    paper: {
      p: 3,
      borderRadius: 4,
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
      background: 'linear-gradient(to bottom, #f9f5ff, #ffffff)'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      mb: 3,
      paddingBottom: 2,
      borderBottom: '1px solid #e0d0ff'
    },
    title: {
      color: '#6a1b9a',
      fontWeight: 600,
      fontSize: isSmallScreen ? '1.5rem' : '1.75rem',
      flexGrow: 1
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
        }
      }
    },
    button: {
      backgroundColor: '#7e57c2',
      color: 'white',
      fontWeight: 600,
      padding: '10px 24px',
      borderRadius: 2,
      '&:hover': {
        backgroundColor: '#5e35b1',
        boxShadow: '0px 2px 10px rgba(126, 87, 194, 0.4)'
      },
      '&:disabled': {
        backgroundColor: '#d1c4e9'
      }
    },
    backButton: {
      color: '#7e57c2',
      fontWeight: 500,
      mr: 2,
      '&:hover': {
        backgroundColor: 'rgba(126, 87, 194, 0.08)'
      }
    },
    viewButton: {
      color: '#7e57c2',
      fontWeight: 500,
      ml: 1,
      border: '1px solid #7e57c2',
      '&:hover': {
        backgroundColor: 'rgba(126, 87, 194, 0.08)'
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={styles.container}>
      <Paper elevation={3} sx={styles.paper}>
        <Box sx={styles.header}>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={() => navigate('/categorias')}
            sx={styles.backButton}
          >
            Voltar
          </Button>
          <Typography variant="h5" component="h1" sx={styles.title}>
            Cadastrar Categoria
          </Typography>
          <Button 
            startIcon={<VisibilityIcon />} 
            onClick={() => navigate('/categorias')} 
            sx={styles.viewButton}
          >
            Visualizar
          </Button>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome"
                name="nome"
                value={categoria.nome}
                onChange={handleChange}
                required
                sx={styles.textField}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descrição"
                name="descricao"
                multiline
                rows={4}
                value={categoria.descricao}
                onChange={handleChange}
                sx={styles.textField}
              />
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button 
                variant="contained" 
                type="submit"
                disabled={carregando}
                sx={styles.button}
              >
                {carregando ? 'Cadastrando...' : 'Cadastrar Categoria'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Feedback de erro */}
      <Snackbar
        open={!!erro}
        autoHideDuration={6000}
        onClose={() => setErro('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setErro('')} 
          severity="error" 
          sx={{ 
            width: '100%',
            bgcolor: 'error.light',
            color: 'error.contrastText'
          }}
        >
          {erro}
        </Alert>
      </Snackbar>

      {/* Feedback de sucesso */}
      <Snackbar
        open={sucesso}
        autoHideDuration={6000}
        onClose={() => setSucesso(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSucesso(false)} 
          severity="success" 
          sx={{ 
            width: '100%',
            bgcolor: 'success.light',
            color: 'success.contrastText'
          }}
        >
          Categoria cadastrada com sucesso!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default CadastrarCategoria;

