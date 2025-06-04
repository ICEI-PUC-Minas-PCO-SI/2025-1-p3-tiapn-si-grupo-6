import React from 'react';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

// CSS embutido diretamente no arquivo JS
const styles = {
  loginPage: {
    backgroundColor: '#f5f5f5'
  },
  loginContainer: {
    display: 'flex',
    width: '100%'
  },
  loginImage: {
    flex: 1,
    backgroundColor: '#6f42c1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  loginImageImg: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain'
  },
  loginForm: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem'
  },
  loginLogo: {
    marginBottom: '2rem'
  },
  loginCard: {
    width: '100%',
    maxWidth: '400px'
  },
  btnPrimary: {
    backgroundColor: '#6f42c1',
    borderColor: '#6f42c1'
  },
  btnPrimaryHover: {
    backgroundColor: '#5e35b1',
    borderColor: '#5e35b1'
  }
};

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [erro, setErro] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        senha
      });

      // Armazenar dados do usuário no localStorage
      localStorage.setItem('usuario', JSON.stringify(response.data));
      
      // Redirecionar para a página de registro de vendas
      navigate('/registro-vendas');
    } catch (error) {
      setErro('Credenciais inválidas. Por favor, tente novamente.');
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div className="login-page d-flex flex-column min-vh-100" style={styles.loginPage}>
      <Header />
      
      <div className="login-container flex-grow-1" style={styles.loginContainer}>
        <div className="login-image" style={styles.loginImage}>
          <Image src="https://placehold.co/600x800/6f42c1/ffffff.png?text=ERPet" alt="Cachorro" fluid style={styles.loginImageImg} />
        </div>
        <div className="login-form" style={styles.loginForm}>
          <div className="login-logo" style={styles.loginLogo}>
            <Image src="/logo.png" alt="ERPet Logo" height="80" />
          </div>
          <div className="login-card" style={styles.loginCard}>
            <h2 className="mb-4">Login</h2>
            
            {erro && <div className="alert alert-danger">{erro}</div>}
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nome do Usuário/Email</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Digite seu email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Senha</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Digite sua senha" 
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </Form.Group>
              
              <div className="d-flex justify-content-between align-items-center mb-3">
                <a href="#" className="text-decoration-none">Esqueci minha senha</a>
                <Button variant="secondary">Cancelar</Button>
              </div>
              
              <Button 
                variant="primary" 
                type="submit" 
                className="w-100" 
                style={styles.btnPrimary}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.btnPrimaryHover.backgroundColor}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.btnPrimary.backgroundColor}
              >
                Entrar
              </Button>
            </Form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
