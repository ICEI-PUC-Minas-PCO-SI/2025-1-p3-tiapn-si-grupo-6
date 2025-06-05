import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);


function GraficoProdutos() {
  const data = {
    labels: [
      'Ração Premier',
      'Coleira M',
      'Antipulgas X',
      'Areia Sanitária',
      'Petiscos',
      'Brinquedo Corda',
      'Shampoo',
      'Ração Senior',
      'Comedouro',
    ],
    datasets: [
      {
        label: 'Vendas',
        data: [190, 170, 130, 120, 100, 90, 85, 75, 60],
        backgroundColor: '#FFD700', // amarelo
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // legenda removida
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '550px' }}>
      <h3>TOP 10 PRODUTOS MAIS VENDIDOS NO MÊS</h3>
      <Bar data={data} options={options} />
    </div>
  );
}

export default GraficoProdutos;