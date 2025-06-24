// src/api/axiosConfig.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
});

// Interceptador para injetar o token
api.interceptors.request.use((config) => {
  const usuario = localStorage.getItem("usuario");

  if (usuario) {
    const { token } = JSON.parse(usuario);
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
