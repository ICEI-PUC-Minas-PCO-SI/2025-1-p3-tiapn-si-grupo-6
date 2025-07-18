import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import PatinhasLayout from "./components/PatinhasLayout";

import NavBar from './components/NavBar';
import NavBarLanding from './components/NavBarLanding';
import Footer from './components/Footer';
import { SidebarMenu } from './components/SidebarMenu';

import Home from './pages/Home';
import Login from './pages/login/Login';
import LandingPage from './pages/LandingPage';

import Usuarios from './pages/usuarios/Usuarios';
import CadastrarUsuario from './pages/usuarios/CadastrarUsuario';
import EditarUsuario from './pages/usuarios/EditarUsuario';

import Produtos from './pages/produtos/Produtos';
import CadastrarProduto from './pages/produtos/CadastrarProduto';
import EditarProduto from './pages/produtos/EditarProduto';

import Clientes from './pages/Clientes/Clientes';
import CadastrarCliente from './pages/Clientes/CadastrarCliente';
import EditarCliente from './pages/Clientes/EditarCliente';

import Fornecedores from './pages/fornecedores/Fornecedores';
import CadastrarFornecedor from './pages/fornecedores/CadastrarFornecedor';
import EditarFornecedores from './pages/fornecedores/EditarFornecedores';

import Pedidos from './pages/pedidos/Pedidos';
import CadastrarPedido from './pages/pedidos/CadastrarPedido';
import EditarPedido from './pages/pedidos/EditarPedido';

import CadastrarCategoria from './pages/categorias/CadastrarCategoria';
import EditarCategoria from './pages/categorias/EditarCategoria';
import ListarCategoria from './pages/categorias/ListarCategoria';

import Dashboard from './pages/dashboard/Dashboard';
import BaixoEstoque from './pages/dashboard/BaixoEstoque';
import GraficoProdutos from './pages/dashboard/GraficoProdutos';
import GraficoVendas from './pages/dashboard/GraficoVendas';
import Vencimentos from './pages/dashboard/Vencimentos';

import Historico from './pages/historico/Historico';


import CadastrarVenda from './pages/registroVendas/CadastrarVenda';
import RelatorioVendas from './pages/registroVendas/RelatorioVendas';

import ConferenciaXML from './pages/xml/ConferenciaXML';


const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  overflow: auto;
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
  min-height: 100vh;
  background: linear-gradient(to bottom, #4b0082, #9b59b6, #d3d3d3);
  color: white;
  display: flex;
  flex-direction: column;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AlertWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  gap: 1rem;
  text-align: center;

  max-width: 600px;
  margin: 0 auto;
  box-sizing: border-box;

  border-radius: 8px;
  background-color: white;
`;

function AppContent() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const isLogin = location.pathname === '/login';
  const token = localStorage.getItem('usuario');
  const isPublicRoute = isLandingPage || isLogin;

  const pathsWithPatinhasLayout = [
    "/home",
    "/usuarios",
    "/usuarios/cadastrar",
    "/usuarios/editar/",
    "/clientes",
    "/clientes/cadastrar",
    "/clientes/editar/",
    "/produtos",
    "/produtos/cadastrar",
    "/produtos/editar/",
    "/fornecedores",
    "/fornecedores/cadastrar",
    "/fornecedores/editar/",
    "/pedidos",
    "/pedidos/cadastrar",
    "/pedidos/editar/",
    "/categorias",
    "/categorias/cadastrar",
    "/categorias/editar/",
    "/historico",
    "/vendas"
  ];

  const shouldApplyPatinhasLayout = pathsWithPatinhasLayout.some((path) =>
    location.pathname.startsWith(path)
  );

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!token && !isPublicRoute) {
      setShowAlert(true);
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    }
  }, [token, isPublicRoute]);

if (!token && !isPublicRoute) {
  return (
    <AlertWrapper
      style={{
        display: 'flex',
        flexDirection: 'column',  // vertical
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',          // ocupa a tela toda verticalmente
        gap: '1rem',
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto',         // centraliza horizontalmente na tela
      }}
    >
      <img
        src="/imgs/bad-dog.png"
        alt="Sad Dog"
        style={{ width: '500px', height: '500px', objectFit: 'contain' }}
      />
      <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#9900ff' }}>
        ⚠️ Falha ao conectar, faça o login novamente.
      </span>
    </AlertWrapper>
  );
}


  if (isLogin) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }

  if (isLandingPage) {
    return (
      <LandingWrapper>
        <NavBarLanding />
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </LandingWrapper>
    );
  }

  return (
  <AppContainer style={{ flexDirection: "row" }}>
    <SidebarMenu onNavigate={(path) => (window.location.href = path)} />
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <NavBar />
      <Content>
        {shouldApplyPatinhasLayout ? (
          <PatinhasLayout>
            <Routes>
              {/* Rotas com PatinhasLayout */}
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

              <Route path="/clientes" element={<Clientes />} />
              <Route path="/clientes/cadastrar" element={<CadastrarCliente />} />
              <Route path="/clientes/editar/:id" element={<EditarCliente />} />

              <Route path="/categorias" element={<ListarCategoria />} />
              <Route path="/categorias/cadastrar" element={<CadastrarCategoria />} />
              <Route path="/categorias/editar/:id" element={<EditarCategoria />} />

              <Route path="/vendas/cadastrar" element={<CadastrarVenda />} />
              <Route path="/vendas/relatorioVendas" element={<RelatorioVendas />} />


              <Route path="/historico" element={<Historico />} />

            </Routes>
          </PatinhasLayout>
        ) : (
          <Routes>
            {/* Rotas sem PatinhasLayout */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/baixo-estoque" element={<BaixoEstoque />} />
            <Route path="/dashboard/grafico-produtos" element={<GraficoProdutos />} />
            <Route path="/dashboard/grafico-vendas" element={<GraficoVendas />} />
            <Route path="/dashboard/vencimentos" element={<Vencimentos />} />
            <Route path="/comparar-xml" element={<ConferenciaXML />} />

            {/* Se quiser, coloque aqui rotas que não precisam do PatinhasLayout, 
                por exemplo, alguma rota nova fora desse escopo */}
          </Routes>
        )}
      </Content>
      <Footer />
    </div>
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
