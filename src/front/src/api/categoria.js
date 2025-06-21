import api from './axiosConfig';

const API_URL = '/categorias';

export async function getCategorias() {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar categorias", error);
    throw error;
  }
}

export async function getCategoriaById(id) {
  try {
    const response = await api.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar categoria por ID:", error);
    throw error;
  }
}

export async function criarCategoria(categoria) {
  try {
    const response = await api.post(API_URL, categoria);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    throw error;
  }
}

export async function editarCategoria(id, novosDados) {
  try {
    const response = await api.put(`${API_URL}/${id}`, novosDados);
    return response.data;
  } catch (error) {
    console.error("Erro ao editar categoria:", error);
    if (error.response) {
      throw new Error(error.response.data.message || "Erro ao editar categoria");
    } else {
      throw new Error("Erro de conexão ao editar categoria");
    }
  }
}

export async function excluirCategoria(id) {
  try {
    const response = await api.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir categoria:", error);
    throw error;
  }
}

export async function buscarCategoriaPorNome(nome) {
  try {
    const response = await api.get(`${API_URL}/nome`, {
      params: { nome }
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar categoria por nome:", error);
    throw error;
  }
}
