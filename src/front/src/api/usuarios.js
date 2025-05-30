import axios from 'axios';

const API_URL = 'http://localhost:8080/usuarios';

export async function getUsuarios() {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error;
  }
}

export async function getUsuariosIncluindoExcluidos() {
  try {
    const response = await axios.get(`${API_URL}/excluidos`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuários (incluindo excluídos):", error);
    throw error;
  }
}

export async function criarUsuario(usuario) {
  try {
    const response = await axios.post(API_URL, usuario);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
}

export async function buscarPorLogin(login) {
  try {
    const response = await axios.get(`${API_URL}/login/${login}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuário por login:", error);
    throw error;
  }
}

export async function buscarPorNome(nome) {
  try {
    const response = await axios.get(`${API_URL}/nome`, {
      params: { nome }
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuários por nome:", error);
    throw error;
  }
}

export async function filtrarPorTipo(tipo) {
  try {
    const response = await axios.get(`${API_URL}/tipo/${tipo}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao filtrar usuários por tipo:", error);
    throw error;
  }
}

export async function editarUsuario(id, novosDados) {
  try {
    const response = await axios.put(`${API_URL}/${id}`, novosDados);
    return response.data;
  } catch (error) {
    console.error("Erro ao editar usuário:", error);
    throw error;
  }
}

export async function editarSenha(id, novaSenha) {
  try {
    const response = await axios.put(`${API_URL}/${id}/senha`, novaSenha, {
      headers: {
        'Content-Type': 'text/plain'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao editar senha:", error);
    throw error;
  }
}

export async function excluirUsuario(id) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    throw error;
  }
}

export async function validarLogin(login, senha) {
  try {
    const response = await axios.post(`${API_URL}/validar`, null, {
      params: { login, senha }
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao validar login:", error);
    throw error;
  }
}