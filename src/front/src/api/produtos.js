import axios from 'axios';

export async function getProdutos() {
  const response = await axios.get('http://localhost:8080/produtos');
  return response.data;
}

export async function createProduto(produto) {
  const response = await axios.post('http://localhost:8080/produtos', produto);
  return response.data;
}

export async function updateProduto(id, produto) {
  const response = await axios.put(`http://localhost:8080/produtos/${id}`, produto);
  return response.data;
}

export async function deleteProduto(id) {
  const response = await axios.delete(`http://localhost:8080/produtos/${id}`);
  return response.data;
}