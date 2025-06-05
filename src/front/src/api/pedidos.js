import axios from "axios";
import { listarFornecedores } from "./.././api/fornecedores";

const API_URL = "http://localhost:8080/pedidos";

export async function getPedidos() {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    throw error;
  }
}

// 👉 Buscar pedidos incluindo excluídos
export async function getPedidosIncluindoExcluidos() {
  try {
    const response = await axios.get(`${API_URL}/excluidos`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar pedidos (incluindo excluídos):", error);
    throw error;
  }
}

// 👉 Criar pedido
export async function criarPedido(pedido) {
  try {
    const response = await axios.post(API_URL, pedido);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    throw error;
  }
}

// 👉 Buscar pedido por ID
export async function buscarPedidoPorId(id) {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar pedido por ID:", error);
    throw error;
  }
}

// 👉 Buscar pedido por cliente
export async function buscarPorCliente(cliente) {
  try {
    const response = await axios.get(`${API_URL}/cliente`, {
      params: { cliente },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar pedidos por cliente:", error);
    throw error;
  }
}

// 👉 Filtrar pedidos por status
export async function filtrarPorStatus(status) {
  try {
    const response = await axios.get(`${API_URL}/status/${status}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao filtrar pedidos por status:", error);
    throw error;
  }
}

// 👉 Editar pedido
export async function editarPedido(id, novosDados) {
  try {
    const response = await axios.put(`${API_URL}/${id}`, novosDados);
    return response.data;
  } catch (error) {
    console.error("Erro ao editar pedido:", error);
    throw error;
  }
}

// 👉 Excluir pedido
export async function excluirPedido(id) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir pedido:", error);
    throw error;
  }
}

// ✅ 👉 Função auxiliar para buscar fornecedores (para usar na tela de Montar Pedido)
export async function buscarFornecedoresParaPedido() {
  try {
    const fornecedores = await listarFornecedores();
    return fornecedores;
  } catch (error) {
    console.error("Erro ao buscar fornecedores para o pedido:", error);
    throw error;
  }
}