// src/api/pedidos.js
import api from "./axiosConfig"; // Usa seu axiosConfig com baseURL e token
import { getFornecedores } from "./fornecedores"; // função correta
import { getProdutos } from "./produtos";

// 🚨 Função de tratamento de erro centralizada
function tratarErro(error, mensagemPadrao) {
  if (error.response) {
    console.error(`${mensagemPadrao}:`, error.response.data);
    throw new Error(error.response.data.message || mensagemPadrao);
  } else if (error.request) {
    console.error(`${mensagemPadrao}: Sem resposta do servidor.`);
    throw new Error("Sem resposta do servidor. Verifique sua conexão.");
  } else {
    console.error(`${mensagemPadrao}:`, error.message);
    throw new Error(mensagemPadrao);
  }
}

// 👉 Listar pedidos (com filtros opcionais)
export async function getPedidos(cliente, status) {
  try {
    const params = {};
    if (cliente) params.cliente = cliente;
    if (status) params.status = status;

    const response = await api.get("/pedidos/listar", { params });
    return response.data;
  } catch (error) {
    tratarErro(error, "Erro ao buscar pedidos");
  }
}

// 👉 Criar pedido
export async function criarPedido(pedido) {
  try {
    if (!pedido) throw new Error("Dados do pedido são obrigatórios.");
    const response = await api.post("/pedidos/cadastrar", pedido);
    return response.data;
  } catch (error) {
    tratarErro(error, "Erro ao criar pedido");
  }
}

// 👉 Buscar pedido por ID
export async function buscarPedidoPorId(id) {
  try {
    if (!id) throw new Error("ID do pedido é obrigatório.");
    const response = await api.get(`/pedidos/buscar/${id}`);
    return response.data;
  } catch (error) {
    tratarErro(error, "Erro ao buscar pedido por ID");
  }
}

// 👉 Editar pedido
export async function editarPedido(id, novosDados) {
  try {
    if (!id) throw new Error("ID do pedido é obrigatório.");
    if (!novosDados) throw new Error("Dados para edição são obrigatórios.");

    const response = await api.put(`/pedidos/editar/${id}`, novosDados);
    return response.data;
  } catch (error) {
    tratarErro(error, "Erro ao editar pedido");
  }
}

// 👉 Excluir pedido
export async function excluirPedido(id) {
  try {
    if (!id) throw new Error("ID do pedido é obrigatório.");
    const response = await api.delete(`/pedidos/excluir/${id}`);
    return response.data;
  } catch (error) {
    tratarErro(error, "Erro ao excluir pedido");
  }
}

// 👉 Buscar fornecedores (para montar pedido)
export async function buscarFornecedoresParaPedido() {
  try {
    const fornecedores = await getFornecedores();
    return fornecedores;
  } catch (error) {
    tratarErro(error, "Erro ao buscar fornecedores para o pedido");
  }
}

// 👉 Buscar produtos (para montar pedido)
export async function buscarProdutosParaPedido() {
  try {
    const produtos = await getProdutos();
    return produtos;
  } catch (error) {
    tratarErro(error, "Erro ao buscar produtos para o pedido");
  }
}
