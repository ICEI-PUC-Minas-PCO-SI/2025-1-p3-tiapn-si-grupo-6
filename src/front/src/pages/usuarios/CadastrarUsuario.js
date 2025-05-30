import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Paper,
  Box,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

function CadastrarUsuario() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    login: '',
    tipoUsuario: '',
    endereco: '',
    bairro: '',
    logradouro: '',
    numero: '',
    cep: '',
    senhaPura: '',
    confirmarSenha: ''
  });

  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const tiposUsuario = [
    { value: 'GERENTE', label: 'Gerente' },
    { value: 'VENDEDOR', label: 'Vendedor' },
    { value: 'VETERINARIO', label: 'Veterinário' },
    { value: 'TOSADOR', label: 'Tosador' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validarCampos = () => {
    if (usuario.senhaPura !== usuario.confirmarSenha) {
      setErro('As senhas não coincidem');
      return false;
    }
    
    if (usuario.senhaPura.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres');
      return false;
    }
    
    if (!usuario.tipoUsuario) {
      setErro('Selecione um tipo de usuário');
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
      
      const dadosUsuario = {
        nome: usuario.nome,
        email: usuario.email,
        login: usuario.login,
        tipoUsuario: usuario.tipoUsuario,
        endereco: usuario.endereco,
        bairro: usuario.bairro,
        logradouro: usuario.logradouro,
        numero: usuario.numero,
        cep: usuario.cep,
        senhaPura: usuario.senhaPura
      };
      
      const response = await axios.post('http://localhost:8080/usuarios', dadosUsuario);
      
      if (response.status === 201) {
        setSucesso(true);
        setTimeout(() => {
          navigate('/usuarios');
        }, 1500);
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      if (error.response) {
        if (error.response.status === 409) {
          setErro('Login já está em uso. Por favor, escolha outro.');
        } else {
          setErro(`Erro ao cadastrar usuário: ${error.response.data.message || error.response.statusText}`);
        }
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
      fontSize: isSmallScreen ? '1.5rem' : '1.75rem'
    },
    sectionTitle: {
      color: '#6a1b9a',
      fontWeight: 500,
      mb: 2,
      fontSize: isSmallScreen ? '1.1rem' : '1.25rem'
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
    }
  };

  return (
    <Container maxWidth="md" sx={styles.container}>
      <Paper elevation={3} sx={styles.paper}>
        <Box sx={styles.header}>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={() => navigate('/usuarios')}
            sx={styles.backButton}
          >
            Voltar
          </Button>
          <Typography variant="h5" component="h1" sx={styles.title}>
            Cadastrar Novo Usuário
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Dados Pessoais */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={styles.sectionTitle}>
                Dados Pessoais
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nome Completo"
                name="nome"
                value={usuario.nome}
                onChange={handleChange}
                required
                sx={styles.textField}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={usuario.email}
                onChange={handleChange}
                required
                sx={styles.textField}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Login"
                name="login"
                value={usuario.login}
                onChange={handleChange}
                required
                sx={styles.textField}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Tipo de Usuário"
                name="tipoUsuario"
                value={usuario.tipoUsuario}
                onChange={handleChange}
                required
                sx={styles.textField}
              >
                {tiposUsuario.map((option) => (
                  <MenuItem key={option.value} value={option.value} sx={{ color: '#5e35b1' }}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Senha */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Senha"
                name="senhaPura"
                type="password"
                value={usuario.senhaPura}
                onChange={handleChange}
                required
                sx={styles.textField}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Confirmar Senha"
                name="confirmarSenha"
                type="password"
                value={usuario.confirmarSenha}
                onChange={handleChange}
                required
                sx={styles.textField}
              />
            </Grid>

            {/* Endereço */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={styles.sectionTitle}>
                Endereço
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="CEP"
                name="cep"
                value={usuario.cep}
                onChange={handleChange}
                sx={styles.textField}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Endereço"
                name="endereco"
                value={usuario.endereco}
                onChange={handleChange}
                sx={styles.textField}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Bairro"
                name="bairro"
                value={usuario.bairro}
                onChange={handleChange}
                sx={styles.textField}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Logradouro"
                name="logradouro"
                value={usuario.logradouro}
                onChange={handleChange}
                sx={styles.textField}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="Número"
                name="numero"
                value={usuario.numero}
                onChange={handleChange}
                sx={styles.textField}
              />
            </Grid>

            {/* Ações */}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button 
                variant="contained" 
                type="submit"
                disabled={carregando}
                sx={styles.button}
              >
                {carregando ? 'Cadastrando...' : 'Cadastrar Usuário'}
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
          Usuário cadastrado com sucesso!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default CadastrarUsuario;