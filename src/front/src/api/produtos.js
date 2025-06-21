// Importar api configurado
import api from "./axiosConfig";

export async function getProdutos() {
  try {
    const response = await api.get('/produtos');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;  
  }
}

// O mesmo para todas as funções abaixo:

export async function getProdutosIncluindoExcluidos() {
  try {
    const response = await api.get('/produtos/excluidos');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos (incluindo excluídos):", error);
    throw error;
  }
}

export async function criarProduto(produto) {
  try {
    const response = await api.post('/produtos', produto);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    throw error;
  }
}

export async function buscarPorId(id) {
  try {
    const response = await api.get(`/produtos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produto por id:", error);
    throw error;
  }
}

export async function buscarPorNome(nome) {
  try {
    const response = await api.get('/produtos/nome', { params: { nome } });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos por nome:", error);
    throw error;
  }
}

export async function filtrarPorTipo(tipo) {
  try {
    const response = await api.get(`/produtos/tipo/${tipo}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao filtrar produtos por tipo:", error);
    throw error;
  }
}

export async function editarProduto(id, novosDados) {

  try {
    const response = await api.put(`/produtos/${id}`, novosDados);
    return response.data;
  } catch (error) {
    console.error("Erro ao editar produto:", error);
    throw error;
  }
}

export async function excluirProduto(id) {
  try {
    const response = await api.delete(`/produtos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    throw error;
  }

  
}

export async function listarProdutosPorFornecedor(idFornecedor) {
  try {
    const response = await axios.get(`${API_URL}/fornecedor/${idFornecedor}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos por fornecedor:", error);
    throw error;
  }
}