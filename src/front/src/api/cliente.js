// Importar api configurado
import api from "./axiosConfig";


export async function getClientes() {
  try {
    const response = await api.get('/clientes/ativos');

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar cliente:", error);
    throw error;
  }
}

export async function getClientesListarTodos() {
  try {

    const response = await api.get(`/clientes/todos`);

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar clientes (incluindo excluídos):", error);
    throw error;
  }
}

export async function cadastrarCliente(cliente) {
  try {

    const response = await api.post(`/clientes`, cliente);

    return response.data;
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    throw error;
  }
}

export async function buscarPorNome(nome) {
  try {

    const response = await api.get(`/clientes/buscar`, {

      params: { nome },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar cliente por nome:", error);
    throw error;
  }
}

export async function buscarClientePorId(id) {
  try {

    const response = await api.get(`/clientes/${id}`);

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar cliente por ID:", error);
    throw error;
  }
}

export async function editarCliente(id, novosDados) {
  try {

    const response = await api.put(`/clientes/${id}`, novosDados);

    return response.data;
  } catch (error) {
    console.error("Erro ao editar cliente:", error);
    throw error;
  }
}

export async function excluirCliente(id) {
  try {

    const response = await api.delete(`/clientes/${id}`);

    return response.data;
  } catch (error) {
    console.error("Erro ao excluir cliente:", error);
    throw error;
  }
}
    
