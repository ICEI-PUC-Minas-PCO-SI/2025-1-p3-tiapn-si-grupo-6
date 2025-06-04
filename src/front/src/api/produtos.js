import axios from 'axios';

const API_URL = 'http://localhost:8080/produtos';

export async function getProdutos() {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
}

export async function getProdutosIncluindoExcluidos() {
  try {
    const response = await axios.get(`${API_URL}/excluidos`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos (incluindo excluídos):", error);
    throw error;
  }
}

export async function criarProduto(produto) {
  try {
    const response = await axios.post(API_URL, produto);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    throw error;
  }
}

export async function buscarPorId(id) {
  try {
    const response = await axios.get(`${API_URL}/id/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produto por id:", error);
    throw error;
  }
}

export async function buscarPorNome(nome) {
  try {
    const response = await axios.get(`${API_URL}/nome`, {
      params: { nome }
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos por nome:", error);
    throw error;
  }
}

export async function filtrarPorTipo(tipo) {
  try {
    const response = await axios.get(`${API_URL}/tipo/${tipo}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao filtrar produtos por tipo:", error);
    throw error;
  }
}

export async function editarProduto(id, novosDados) {
  try {
    const response = await axios.put(`${API_URL}/${id}`, novosDados);
    return response.data;
  } catch (error) {
    console.error("Erro ao editar produto:", error);
    throw error;
  }
}

export async function excluirProduto(id) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    throw error;
  }
}