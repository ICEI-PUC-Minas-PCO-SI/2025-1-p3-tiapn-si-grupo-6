import axios from "axios";

const API_URL = "http://localhost:8080/fornecedores";


export const criarFornecedor = async (dados) => {
  const response = await axios.post(`${API_URL}/cadastrar`, dados);
  return response.data;
};

export const getFornecedores = async () => {
  const response = await axios.get(`${API_URL}/listar`);
  return response.data;
};

export const getFornecedoresIncluindoExcluidos = async () => {
  const response = await axios.get(
    "http://localhost:8080/fornecedores/listar?incluirExcluidos=true"
  );
  return response.data;
};


export const buscarFornecedorPorNome = async (nome) => {
  const response = await axios.get(
    `http://localhost:8080/fornecedores?nome=${nome}`
  );
  return response.data;
};

// 👉 Listar todos os fornecedores
export async function listarFornecedores() {
  try {
    const response = await axios.get(`${API_URL}/listar`);
    return response.data;
  } catch (error) {
    console.error("Erro ao listar fornecedores:", error);
    throw error;
  }
}

// 👉 Buscar fornecedor por ID
export async function buscarFornecedorPorId(id) {
  try {
    const response = await axios.get(`${API_URL}/buscar/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar fornecedor com ID ${id}:`, error);
    throw error;
  }
}


// 👉 Editar fornecedor existente
export async function editarFornecedor(id, fornecedor) {
  try {
    console.log(`Chamando PUT em: ${API_URL}/editar/${id}`);
    console.log("ID do fornecedor:", id);
    const response = await axios.put(`${API_URL}/editar/${id}`, fornecedor, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao editar fornecedor:", error);
    throw error;
  }
}
// 👉 Excluir fornecedor por ID
export async function excluirFornecedor(id) {
  try {
    const response = await axios.delete(`${API_URL}/excluir/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao excluir fornecedor com ID ${id}:`, error);
    throw error;
  }

  
}
