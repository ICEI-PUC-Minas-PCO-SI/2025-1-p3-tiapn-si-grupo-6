import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Box,
  CircularProgress
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { editarUsuario, getUsuarioById } from './../../api/usuarios';

function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    login: '',
    endereco: '',
    bairro: '',
    logradouro: '',
    numero: '',
    cep: '',
    senhaPura: '',
    confirmarSenha: ''
  });

  useEffect(() => {
    let mounted = true;

    const carregarUsuario = async () => {
      try {
        const data = await getUsuarioById(id);
        console.log('Dados recebidos:', data);

        if (mounted) {
          setUsuario({
            nome: data.nome || '',
            email: data.email || '',
            login: data.login || '',
            endereco: data.endereco || '',
            bairro: data.bairro || '',
            logradouro: data.logradouro || '',
            numero: data.numero || '',
            cep: data.cep || '',
            senhaPura: '',
            confirmarSenha: ''
          });
        }
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        alert('Erro ao carregar dados do usuário');
        navigate('/usuarios');
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    carregarUsuario();

    return () => {
      mounted = false;
    };
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (usuario.senhaPura && usuario.senhaPura !== usuario.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    try {
      setLoading(true);
      
      const dadosAtualizacao = {
        nome: usuario.nome,
        email: usuario.email,
        login: usuario.login,
        endereco: usuario.endereco,
        bairro: usuario.bairro,
        logradouro: usuario.logradouro,
        numero: usuario.numero,
        cep: usuario.cep
      };

      if (usuario.senhaPura) {
        dadosAtualizacao.senhaPura = usuario.senhaPura;
      }

      await editarUsuario(id, dadosAtualizacao);
      
      alert('Usuário atualizado com sucesso!');
      navigate('/usuarios');
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      const errorMessage = error.response?.data?.message || 'Erro ao atualizar usuário';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

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
            Editar Usuário - {usuario.nome}
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

            {/* Senha */}
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

            {/* Botão de submit */}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button 
                variant="contained" 
                color="primary" 
                type="submit"
                disabled={loading}
                sx={{ 
                  backgroundColor: '#C0A8FE',
                  '&:hover': { backgroundColor: '#9F7AEA' }
                }}
              >
                {loading ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default EditarUsuario;