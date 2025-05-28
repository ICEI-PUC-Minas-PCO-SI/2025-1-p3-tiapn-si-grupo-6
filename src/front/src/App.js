import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import SelectActionCard from './components/SelectActionCard';
import Home from './pages/Home'; // ou como estiver o nome da sua home
import Usuarios from './pages/Usuarios'; // aqui tá o novo componente
import styled from 'styled-components';

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

function App() {
  return (
    <Router>
      <AppContainer>
        <NavBar />
        <Content>
          <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usuarios" element={<Usuarios />} />
        {/* adiciona mais rotas aqui conforme for criando */}
      </Routes>

        </Content>
        <Footer />
      </AppContainer>
    </Router>
  );
}

export default App;
