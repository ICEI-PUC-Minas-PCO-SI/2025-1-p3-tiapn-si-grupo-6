import axios from "axios";
import { listarFornecedores } from "./.././api/fornecedores";
import { getProdutos } from "./.././api/produtos";

const API_URL = "http://localhost:8080/pedidos";

// 👉 Listar todos os pedidos, com filtros opcionais para cliente e status
export async function getPedidos(cliente, status) {
  try {
    const params = {};
    if (cliente) params.cliente = cliente;
    if (status) params.status = status;

    const response = await axios.get(`${API_URL}/listar`, { params });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    throw error;
  }
}

// 👉 Criar pedido
export async function criarPedido(pedido) {
  try {
    const response = await axios.post(`${API_URL}/cadastrar`, pedido);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    throw error;
  }
}

// 👉 Buscar pedido por ID
export async function buscarPedidoPorId(id) {
  try {
    const response = await axios.get(`${API_URL}/buscar/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar pedido por ID:", error);
    throw error;
  }
}

// 👉 Editar pedido
export async function editarPedido(id, novosDados) {
  try {
    const response = await axios.put(`${API_URL}/editar/${id}`, novosDados);
    return response.data;
  } catch (error) {
    console.error("Erro ao editar pedido:", error);
    throw error;
  }
}

// 👉 Excluir pedido
export async function excluirPedido(id) {
  try {
    const response = await axios.delete(`${API_URL}/excluir/${id}`);
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

// ✅ 👉 Função auxiliar para buscar produtos (para usar na tela de Montar Pedido)
export async function buscarProdutosParaPedido() {
  try {
    const produtos = await getProdutos();
    return produtos;
  } catch (error) {
    console.error("Erro ao buscar produtos para o pedido:", error);
    throw error;
  }
}
