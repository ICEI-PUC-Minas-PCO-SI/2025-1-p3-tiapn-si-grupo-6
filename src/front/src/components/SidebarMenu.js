import React, { useState } from 'react';
import styled from 'styled-components';
import {
    ExpandMore,
    ExpandLess,
    People,
    Inventory,
    ShoppingCart,
    Category,
    Person,
    Store,
    Dashboard as DashboardIcon,
    WarningAmber,
    PieChart,
    ShowChart,
    EventNote,
    AccountCircle,
    Search as SearchIcon,
    History,
    ReceiptLong,
    FactCheck
} from '@mui/icons-material';

const SidebarContainer = styled.nav`
  width: ${({ isCollapsed }) => (isCollapsed ? '70px' : '180px')};
  transition: width 0.3s ease;
  height: 100%;
  min-height: 100vh;
  background-color: #322659;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 1rem 0.5rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  font-family: 'Poppins', sans-serif;
  position: sticky;
  top: 0;
  overflow: hidden;
`;

const MenuItemsWrapper = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-weight: 600;
  padding: 10px 1rem;
  color: #e0cfff;

  &:hover {
    color: #c0a8fe;
  }
`;

const SubItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ isCollapsed }) => (isCollapsed ? '0' : '8px')};
  padding: 8px 1rem;
  cursor: pointer;
  color: #dcd2ff;
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background-color: #4b3b8e;
    border-radius: 8px;
  }

  svg {
    font-size: 20px;
  }

  span {
    display: ${({ isCollapsed }) => (isCollapsed ? 'none' : 'inline')};
  }
`;

const UserFooter = styled(SubItem)`
  margin-top: auto;
  border-top: 1px solid #4b3b8e;
  padding: 12px 16px;
  color: #b9aaff;
  border-radius: 0;
  justify-content: ${({ isCollapsed }) => (isCollapsed ? 'center' : 'flex-start')};
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ isCollapsed }) => (isCollapsed ? '0' : '0.5rem')};
  padding: 0.25rem 0.5rem;
  background-color: #4b3b8e;
  border-radius: 6px;
  margin-bottom: 1rem;
  justify-content: ${({ isCollapsed }) => (isCollapsed ? 'center' : 'flex-start')};
  width: ${({ isCollapsed }) => (isCollapsed ? '40px' : 'auto')};
  transition: width 0.3s ease;
`;

const StyledSearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  color: white;
  font-size: 0.9rem;
  outline: none;
  display: ${({ isCollapsed }) => (isCollapsed ? 'none' : 'block')};

  &::placeholder {
    color: #cfc2f9;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  cursor: pointer;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Logo = styled.img`
  width: 32px;
  height: 32px;
`;

export function SidebarMenu({ onNavigate }) {
    const [cadastrosOpen, setCadastrosOpen] = useState(true);
    const [dashboardOpen, setDashboardOpen] = useState(true);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [search, setSearch] = useState('');

    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const nomeExibido = usuario?.login || 'Usuário';

    const cadastros = [
        { label: 'Usuários', icon: <People />, path: '/usuarios' },
        { label: 'Clientes', icon: <Person />, path: '/clientes' },
        { label: 'Fornecedores', icon: <Store />, path: '/fornecedores' },
        { label: 'Produtos', icon: <Inventory />, path: '/produtos' },
        { label: 'Pedidos', icon: <ShoppingCart />, path: '/pedidos' },
        { label: 'Categorias', icon: <Category />, path: '/categorias' },

        { label: 'Vendas', icon: <ReceiptLong />, path: '/vendas/cadastrar' },
        { label: 'Relatório Vendas', icon: <FactCheck />, path: '/vendas/relatorioVendas' },
        { label: 'Histórico', icon: <History />, path: '/historico' },
        { label: 'Conferência XML', icon: <SearchIcon />, path: '/comparar-xml' },
    ];

    const dashboards = [
        { label: 'Geral', icon: <DashboardIcon />, path: '/dashboard' },
        { label: 'Baixo Estoque', icon: <WarningAmber />, path: '/dashboard/baixo-estoque' },
        { label: 'Gráfico Produtos', icon: <PieChart />, path: '/dashboard/grafico-produtos' },
        { label: 'Gráfico Vendas', icon: <ShowChart />, path: '/dashboard/grafico-vendas' },
        { label: 'Vencimentos', icon: <EventNote />, path: '/dashboard/vencimentos' },
    ];

    const filteredCadastros = cadastros.filter(item =>
        item.label.toLowerCase().includes(search.toLowerCase())
    );

    const filteredDashboards = dashboards.filter(item =>
        item.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <SidebarContainer isCollapsed={isCollapsed}>
            <LogoWrapper isCollapsed={isCollapsed} onClick={() => setIsCollapsed(!isCollapsed)}>
                <Logo src="/imgs/logo-icon.png" alt="Logo ERPet" />
            </LogoWrapper>

            <SearchWrapper isCollapsed={isCollapsed}>
                <SearchIcon style={{ color: '#cfc2f9' }} />
                <StyledSearchInput
                    isCollapsed={isCollapsed}
                    type="text"
                    placeholder="Buscar..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </SearchWrapper>

            {/* Cadastros */}
            {!isCollapsed && (
                <SectionTitle onClick={() => setCadastrosOpen(!cadastrosOpen)}>
                    Cadastros {cadastrosOpen ? <ExpandLess /> : <ExpandMore />}
                </SectionTitle>
            )}
            {cadastrosOpen && filteredCadastros.map(item => (
                <SubItem key={item.path} isCollapsed={isCollapsed} onClick={() => onNavigate(item.path)}>
                    {item.icon}
                    <span>{item.label}</span>
                </SubItem>
            ))}

            {/* Dashboards */}
            {!isCollapsed && (
                <SectionTitle onClick={() => setDashboardOpen(!dashboardOpen)}>
                    Dashboard {dashboardOpen ? <ExpandLess /> : <ExpandMore />}
                </SectionTitle>
            )}
            {dashboardOpen && filteredDashboards.map(item => (
                <SubItem key={item.path} isCollapsed={isCollapsed} onClick={() => onNavigate(item.path)}>
                    {item.icon}
                    <span>{item.label}</span>
                </SubItem>
            ))}

            <UserFooter isCollapsed={isCollapsed}>
                <AccountCircle style={{ fontSize: 20 }} />
                {!isCollapsed && <span>{nomeExibido}</span>}
            </UserFooter>
        </SidebarContainer>
    );
}