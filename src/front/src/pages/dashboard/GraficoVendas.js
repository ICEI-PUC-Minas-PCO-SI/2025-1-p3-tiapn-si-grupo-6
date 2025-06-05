import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function GraficoVendas() {
  const data = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [{
      label: 'Vendas Mensais',
      data: [10, 15, 20, 22, 21, 30],
      fill: false,
      borderColor: 'orange',
      tension: 0.3,
    }],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{ width: '90%' }}>
      <h3>MÉDIA DE VENDAS POR MÊS</h3>
      <Line data={data} options={options} />
    </div>
  );
}

export default GraficoVendas;