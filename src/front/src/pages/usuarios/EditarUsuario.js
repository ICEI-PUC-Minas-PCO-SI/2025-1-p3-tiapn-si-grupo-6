import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Paper,
  Box
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const tiposUsuario = [
    { value: 'GERENTE', label: 'Gerente' },
    { value: 'VENDEDOR', label: 'Vendedor' },
    { value: 'VETERINARIO', label: 'Veterinário' },
    { value: 'TOSADOR', label: 'Tosador' }
  ];

  useEffect(() => {

    // Simulando dados buscados da API:
    const fetchUsuario = async () => {
      try {
        // const response = await getUsuarioById(id);
        // setUsuario(response.data);
        
        // Dados mockados para exemplo:
        setUsuario({
          nome: 'Gabriel Dev',
          email: 'gabriel@example.com',
          login: 'gabrielzinho',
          tipoUsuario: 'GERENTE',
          endereco: 'Rua das Flores',
          bairro: 'Centro',
          logradouro: 'Rua das Flores',
          numero: '42',
          cep: '12345678',
          senhaPura: '',
          confirmarSenha: ''
        });
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      }
    };

    fetchUsuario();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Usuário atualizado:', usuario);

    // navigate('/usuarios'); // Redireciona após edição
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={() => navigate('/usuarios')}
            sx={{ mr: 2 }}
          >
            Voltar
          </Button>
          <Typography variant="h5" component="h1">
            Editar Usuário - ID: {id}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Dados Pessoais */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
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
              >
                {tiposUsuario.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Senha (opcional na edição) */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nova Senha (deixe em branco para manter a atual)"
                name="senhaPura"
                type="password"
                value={usuario.senhaPura}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Confirmar Nova Senha"
                name="confirmarSenha"
                type="password"
                value={usuario.confirmarSenha}
                onChange={handleChange}
              />
            </Grid>

            {/* Endereço */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
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
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Endereço"
                name="endereco"
                value={usuario.endereco}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Bairro"
                name="bairro"
                value={usuario.bairro}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Logradouro"
                name="logradouro"
                value={usuario.logradouro}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="Número"
                name="numero"
                value={usuario.numero}
                onChange={handleChange}
              />
            </Grid>

            {/* Ações */}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button 
                variant="contained" 
                color="primary" 
                type="submit"
                sx={{ 
                  backgroundColor: '#C0A8FE',
                  '&:hover': { backgroundColor: '#9F7AEA' }
                }}
              >
                Salvar Alterações
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default EditarUsuario;