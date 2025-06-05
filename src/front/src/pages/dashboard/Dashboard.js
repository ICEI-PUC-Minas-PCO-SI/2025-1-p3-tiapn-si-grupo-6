import React from 'react';
import GraficoVendas from './GraficoVendas';
import GraficoProdutos from './GraficoProdutos';
import BaixoEstoque from './BaixoEstoque';
import Vencimentos from './Vencimentos';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '70vw',
    margin: '0 auto',
    padding: '20px 10px',
    gap: '20px',
    boxSizing: 'border-box',
    fontFamily: 'Arial, sans-serif',
  },
  topo: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '30px',
  },
  heading: {
    marginBottom: '10px',
    color: 'hsl(0, 0%, 0%)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '30px',
    fontSize: '1rem',
  },
  th: {
    backgroundColor: '#ccc',
    padding: '10px',
    textAlign: 'center',
    border: '1px solid #ccc',
  },
  td: {
    padding: '10px',
    textAlign: 'center',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: 'orange',
    color: 'black',
    border: 'none',
    padding: '6px 12px',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: 'darkorange',
  },
  desconto: {
    backgroundColor: '#f08080',
    color: '#000000',
    borderRadius: '8px',
    padding: '4px 8px',
    display: 'inline-block',
    textAlign: 'center',
    fontWeight: 'bold',
  },
};

function Dashboard() {
  return (
    <div style={styles.container}>
      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Coluna esquerda (vendas + baixo estoque) */}
        <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <GraficoVendas />
          <BaixoEstoque />
        </div>

        {/* Coluna direita (gráfico produtos) */}
        <div style={{ flex: 1 }}>
          <GraficoProdutos />
        </div>
      </div>

      {/* Linha de vencimentos - ocupa toda largura */}
      <div>
        <Vencimentos />
      </div>
    </div>
  );
}

export default Dashboard;

