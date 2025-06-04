import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import SelectActionCard from './components/SelectActionCard';
import Home from './pages/Home';
import Usuarios from './pages/usuarios/Usuarios';
import CadastrarUsuario from './pages/usuarios/CadastrarUsuario';
import EditarUsuario from './pages/usuarios/EditarUsuario';
import Produtos from './pages/produtos/Produtos';
import CadastrarProduto from './pages/produtos/CadastrarProduto';
import EditarProduto from './pages/produtos/EditarProduto';
import LandingPage from "./pages/LandingPage";
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
`;

const Content = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function AppContent() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <AppContainer>
      <NavBar showLogin={isLandingPage} />
      <Content>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/usuarios/cadastrar" element={<CadastrarUsuario />} />
            <Route path="/usuarios/editar/:id" element={<EditarUsuario />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/produtos/cadastrar" element={<CadastrarProduto />} />
            <Route path="/produtos/editar/:id" element={<EditarProduto />} />
            {/* Adicione outras rotas conforme necessário */}
          </Routes>
      </Content>
      <Footer />
    </AppContainer>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;