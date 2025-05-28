import axios from 'axios';

export async function getUsuarios() {
  const response = await axios.get('http://localhost:8080/usuarios');
  return response.data;
}