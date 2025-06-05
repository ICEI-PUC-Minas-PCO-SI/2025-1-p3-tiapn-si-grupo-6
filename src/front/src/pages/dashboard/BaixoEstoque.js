import React from 'react';

export default function BaixoEstoque() {
  const produtos = [
    { nome: 'Coleira M', atual: 4, minimo: 10 },
    { nome: 'Ração Premier', atual: 2, minimo: 20 },
  ];

  const styles = {
    container: {
      width: '90%',
      paddingLeft: '20px',
    },
    heading: {
      marginBottom: '10px',
      color: 'hsl(0, 0%, 0%)',
      fontFamily: 'Arial, sans-serif',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '1rem',
      fontFamily: 'Arial, sans-serif',
    },
    th: {
      backgroundColor: '#ccc',
      border: '1px solid #ccc',
      padding: '10px',
      textAlign: 'center',
    },
    td: {
      border: '1px solid #ccc',
      padding: '10px',
      textAlign: 'center',
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
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>PRODUTOS COM BAIXO ESTOQUE</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Produto</th>
            <th style={styles.th}>Estoque Atual</th>
            <th style={styles.th}>Estoque Mínimo</th>
            <th style={styles.th}></th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p, i) => (
            <tr key={i}>
              <td style={styles.td}>{p.nome}</td>
              <td style={styles.td}>{p.atual}</td>
              <td style={styles.td}>{p.minimo}</td>
              <td style={styles.td}>
                <button style={styles.button}>Repor Estoque</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

