import api from "./axiosConfig";

const API_URL = "/fornecedores";

export async function criarFornecedor(dados) {
  try {
    const response = await api.post(`${API_URL}/cadastrar`, dados);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar fornecedor:", error);
    throw error;
  }
}

export async function getFornecedores() {
  try {
    const response = await api.get(`${API_URL}/listar`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar fornecedores:", error);
    throw error;
  }
}

export async function getFornecedoresIncluindoExcluidos() {
  try {
    const response = await api.get(`${API_URL}/listar`, {
      params: { incluirExcluidos: true }
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar fornecedores (incluindo excluídos):", error);
    throw error;
  }
}

export async function buscarFornecedorPorNome(nome) {
  try {
    const response = await api.get(`${API_URL}/listar`, { params: { nome } });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar fornecedor por nome:", error);
    throw error;
  }
}

export async function buscarFornecedorPorId(id) {
  try {
    const response = await api.get(`${API_URL}/buscar/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar fornecedor com ID ${id}:`, error);
    throw error;
  }
}

export async function editarFornecedor(id, fornecedor) {
  try {
    console.log(`Chamando PUT em: ${API_URL}/editar/${id}`);
    const response = await api.put(`${API_URL}/editar/${id}`, fornecedor);
    return response.data;
  } catch (error) {
    console.error("Erro ao editar fornecedor:", error);
    throw error;
  }
}

export async function excluirFornecedor(id) {
  try {
    const response = await api.delete(`${API_URL}/excluir/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao excluir fornecedor com ID ${id}:`, error);
    throw error;
  }
}
