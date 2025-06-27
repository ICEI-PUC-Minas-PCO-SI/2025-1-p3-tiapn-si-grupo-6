import api from "./axiosConfig";

export const listarHistorico = async () => {
  try {
    const response = await api.get("/historicos");
    return response.data;
  } catch (error) {
    console.error("Erro ao listar histórico:", error);
    throw error;
  }
};
