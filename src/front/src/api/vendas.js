// src/api/venda.js
import api from "./axiosConfig";

// Criar nova venda
export const criarVenda = async (venda) => {
  try {
    const response = await api.post("/vendas", venda);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar venda:", error);
    throw error;
  }
};

// Listar vendas por período (ex: ?inicio=2025-06-01T00:00:00&fim=2025-06-30T23:59:59)
export const listarVendasPorPeriodo = async (inicio, fim) => {
  try {
    const response = await api.get("/vendas/periodo", {
      params: { inicio, fim },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar vendas por período:", error);
    throw error;
  }
};

// Buscar venda por ID
export const buscarVendaPorId = async (id) => {
  try {
    const response = await api.get(`/vendas/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar venda:", error);
    throw error;
  }
};

// Cancelar venda
export const cancelarVenda = async (id) => {
  try {
    await api.delete(`/vendas/${id}`);
  } catch (error) {
    console.error("Erro ao cancelar venda:", error);
    throw error;
  }
};
