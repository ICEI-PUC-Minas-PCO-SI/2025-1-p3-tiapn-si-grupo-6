import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import NavBarLanding from './components/NavBarLanding';
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
import Clientes from "./pages/Clientes/Clientes";
import CadastrarCliente from './pages/Clientes/CadastrarCliente';
import EditarCliente from './pages/Clientes/EditarCliente';

import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Fornecedores from "./pages/fornecedores/Fornecedores";
import CadastrarFornecedor from "./pages/fornecedores/CadastrarFornecedor";
import EditarFornecedores from "./pages/fornecedores/EditarFornecedores";

import Pedidos from "./pages/pedidos/Pedidos";
import CadastrarPedido from "./pages/pedidos/CadastrarPedido";
import EditarPedido from "./pages/pedidos/EditarPedido";

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

const LandingWrapper = styled.div`
  flex: 1;
  width: 100%;
  background: linear-gradient(
    to bottom,
    #4b0082,
    #9b59b6,
    #d3d3d3
  );
  color: white;
  display: flex;
  flex-direction: column;
`;

function AppContent() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <AppContainer>
      {isLandingPage ? <NavBarLanding /> : <NavBar />}
      <Content>
        {isLandingPage ? (
          <LandingWrapper>
            <Routes>
              <Route path="/" element={<LandingPage />} />
            </Routes>
          </LandingWrapper>
        ) : (
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/usuarios/cadastrar" element={<CadastrarUsuario />} />
            <Route path="/usuarios/editar/:id" element={<EditarUsuario />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/produtos/cadastrar" element={<CadastrarProduto />} />
            <Route path="/produtos/editar/:id" element={<EditarProduto />} />
            
            <Route path="/fornecedores" element={<Fornecedores />} />
            <Route path="/fornecedores/cadastrar" element={<CadastrarFornecedor />} />
            <Route path="/fornecedores/editar/:id" element={<EditarFornecedores />} />

            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/pedidos/cadastrar" element={<CadastrarPedido />} />
            <Route path="/pedidos/editar/:id" element={<EditarPedido />} />
            <Route path="/" element={<Home />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/clientes/cadastrar" element={<CadastrarCliente />} />
            <Route path="/clientes/editar/:id" element={<EditarCliente />} />

            {/* Adicione outras rotas conforme necessário */}
          </Routes>
        )}
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