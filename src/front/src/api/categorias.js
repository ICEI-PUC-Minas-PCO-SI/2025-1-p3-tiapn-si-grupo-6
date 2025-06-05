import axios from 'axios';

const API_URL = 'http://localhost:8080/categorias';

export async function getCategorias() {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar categorias", error);
    throw error;
  }
}
