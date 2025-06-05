import axios from "axios";

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

export async function getPedidosIncluindoExcluidos() {
  try {
    const response = await axios.get(`${API_URL}/excluidos`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar pedidos (incluindo excluídos):", error);
    throw error;
  }
}

export async function criarPedido(pedido) {
  try {
    const response = await axios.post(API_URL, pedido);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    throw error;
  }
}

export async function buscarPedidoPorId(id) {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar pedido por ID:", error);
    throw error;
  }
}

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

export async function filtrarPorStatus(status) {
  try {
    const response = await axios.get(`${API_URL}/status/${status}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao filtrar pedidos por status:", error);
    throw error;
  }
}

export async function editarPedido(id, novosDados) {
  try {
    const response = await axios.put(`${API_URL}/${id}`, novosDados);
    return response.data;
  } catch (error) {
    console.error("Erro ao editar pedido:", error);
    throw error;
  }
}

export async function excluirPedido(id) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir pedido:", error);
    throw error;
  }
}
