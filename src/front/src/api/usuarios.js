// src/api/usuarios.js
import api from "./axiosConfig";

const USUARIOS_ENDPOINT = "/usuarios";

export async function getUsuarios() {
  try {
    const response = await api.get(USUARIOS_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error;
  }
}

export async function getUsuariosIncluindoExcluidos() {
  try {
    const response = await api.get(`${USUARIOS_ENDPOINT}/excluidos`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuários (incluindo excluídos):", error);
    throw error;
  }
}

export async function criarUsuario(usuario) {
  try {
    const response = await api.post(USUARIOS_ENDPOINT, usuario);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
}

export async function buscarPorLogin(login) {
  try {
    const response = await api.get(`${USUARIOS_ENDPOINT}/login/${login}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuário por login:", error);
    throw error;
  }
}

export async function buscarPorNome(nome) {
  try {
    const response = await api.get(`${USUARIOS_ENDPOINT}/nome`, {
      params: { nome },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuários por nome:", error);
    throw error;
  }
}

export async function filtrarPorTipo(tipo) {
  try {
    const response = await api.get(`${USUARIOS_ENDPOINT}/tipo/${tipo}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao filtrar usuários por tipo:", error);
    throw error;
  }
}

export async function editarUsuario(id, novosDados) {
  try {
    const response = await api.put(`${USUARIOS_ENDPOINT}/${id}`, novosDados);
    return response.data;
  } catch (error) {
    console.error("Erro ao editar usuário:", error);
    if (error.response) {
      throw new Error(error.response.data.message || "Erro ao editar usuário");
    } else {
      throw new Error("Erro de conexão ao editar usuário");
    }
  }
}

export async function editarSenha(id, novaSenha) {
  try {
    const response = await api.put(`${USUARIOS_ENDPOINT}/${id}/senha`, {
      senha: novaSenha,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao editar senha:", error);
    throw error;
  }
}

export async function excluirUsuario(id) {
  try {
    const response = await api.delete(`${USUARIOS_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    throw error;
  }
}

export async function validarLogin(login, senha) {
  try {
    const response = await api.post(
      `${USUARIOS_ENDPOINT}/validar`,
      null,
      {
        params: { login, senha },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao validar login:", error);
    throw error;
  }
}

export async function getUsuarioById(id) {
  try {
    const response = await api.get(`${USUARIOS_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuário por ID:", error);
    throw error;
  }
}
