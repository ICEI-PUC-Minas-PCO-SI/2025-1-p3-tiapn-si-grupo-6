import axios from "axios";

const API_URL = "http://localhost:8080/clientes";

export async function getClientes() {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar cliente:", error);
    throw error;
  }
}

export async function getClientesListarTodos() {
  try {
    const response = await axios.get(`${API_URL}/excluidos`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar clientes (incluindo excluídos):", error);
    throw error;
  }
}

export async function cadastrarCliente(cliente) {
  try {
    const response = await axios.post(API_URL, cliente);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    throw error;
  }
}

export async function buscarPorNome(nome) {
  try {
    const response = await axios.get(`${API_URL}/nome`, {
      params: { nome },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar cliente por nome:", error);
    throw error;
  }
}

export async function editarCliente(id, novosDados) {
  try {
    const response = await axios.put(`${API_URL}/${id}`, novosDados);
    return response.data;
  } catch (error) {
    console.error("Erro ao editar cliente:", error);
    throw error;
  }
}

export async function excluirCliente(id) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir cliente:", error);
    throw error;
  }
}
