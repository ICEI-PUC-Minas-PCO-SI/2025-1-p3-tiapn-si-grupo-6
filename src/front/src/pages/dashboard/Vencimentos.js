import React from 'react';

const styles = {
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
  desconto: {
    backgroundColor: '#f08080',
    color: '#000000',
    borderRadius: '8px',
    padding: '4px 8px',
    display: 'inline-block',
    fontWeight: 'bold',
  },
};

function Vencimentos() {
  const produtos = [
    { nome: 'Shampoo', validade: '06/05/2025', dias: 4, estoque: '10 unidades', desconto: '-30%' },
    { nome: 'Ração Premier', validade: '09/05/2025', dias: 7, estoque: '8 unidades', desconto: '-20%' },
  ];

  return (
    <div>
      <h3>PRODUTOS PRÓXIMOS DO VENCIMENTO</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Produto</th>
            <th style={styles.th}>Validade</th>
            <th style={styles.th}>Dias Restantes</th>
            <th style={styles.th}>Estoque</th>
            <th style={styles.th}>Desconto</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p, i) => (
            <tr key={i}>
              <td style={styles.td}>{p.nome}</td>
              <td style={styles.td}>{p.validade}</td>
              <td style={styles.td}>{p.dias}</td>
              <td style={styles.td}>{p.estoque}</td>
              <td style={styles.td}>
                <span style={styles.desconto}>{p.desconto}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Vencimentos;
