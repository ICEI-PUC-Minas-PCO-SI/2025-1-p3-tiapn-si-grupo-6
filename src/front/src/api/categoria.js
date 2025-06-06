import axios from 'axios';

const API_URL = 'http://localhost:8080/categorias';

// Buscar todas as categorias
export async function getCategorias() {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar categorias", error);
    throw error;
  }
}

// Buscar uma categoria por ID
export async function getCategoriaById(id) {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar categoria por ID:", error);
    throw error;
  }
}

// Criar nova categoria
export async function criarCategoria(categoria) {
  try {
    const response = await axios.post(API_URL, categoria);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    throw error;
  }
}

// Editar categoria
export async function editarCategoria(id, novosDados) {
  try {
    const response = await axios.put(`${API_URL}/${id}`, novosDados);
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

// Excluir categoria (soft delete, se estiver implementado)
export async function excluirCategoria(id) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir categoria:", error);
    throw error;
  }
}

// Buscar por nome (contém)
export async function buscarCategoriaPorNome(nome) {
  try {
    const response = await axios.get(`${API_URL}/nome`, {
      params: { nome }
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar categoria por nome:", error);
    throw error;
  }
}
