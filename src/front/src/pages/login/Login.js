import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        login,
        senha
      });

      const { token, tipoUsuario } = response.data;

      localStorage.setItem('usuario', JSON.stringify({ token, tipoUsuario }));
      navigate('/home');

    } catch (error) {
      setErro('Credenciais inválidas. Por favor, tente novamente.');
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
  <div style={{ minHeight: '100vh', display: 'flex' }}>
    <div
      style={{
        flex: 1,
        backgroundColor: '#6f42c1',
        display: 'flex',
        flexDirection: 'column', 
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem', 
      }}
    >
      <h1
        style={{
          color: 'white',
          fontFamily: '"Poppins", sans-serif',
          fontSize: '2rem',
          marginBottom: '1rem',
          textAlign: 'center',
        }}
      >
        Controle para seu petshop
      </h1>

      <img
        src="/imgs/erpet-login.png"
        alt="ERPet"
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
        }}
      />
    </div>

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem'
      }}>
        <img src="/imgs/logo-icon.png" alt="Logo ERPet" height="80" style={{ marginBottom: '1rem' }} />

        <div style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Entre no ERPet!</h2>

          {erro && (
            <div style={{
              backgroundColor: '#f8d7da',
              color: '#6f42c1',
              padding: '1rem',
              borderRadius: '4px',
              marginBottom: '1rem'
            }}>
              {erro}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontWeight: 'bold' }}>Login do Usuário</label>
              <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontWeight: 'bold' }}>Senha</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
              />
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <a href="#" style={{ color: '#6f42c1', fontSize: '0.9rem' }}>Esqueci minha senha</a>
                            <button
                type="button"
                onClick={() => navigate('/')}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#6f42c1',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                }}
              >
                ← Voltar
              </button>
            </div>

            <button type="submit" style={{
              backgroundColor: '#6f42c1',
              color: 'white',
              border: 'none',
              padding: '0.75rem',
              borderRadius: '4px',
              width: '100%',
              fontSize: '1rem',
              cursor: 'pointer'
            }}>
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
