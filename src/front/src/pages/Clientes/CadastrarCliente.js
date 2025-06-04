import React, { useState } from "react";

import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    padding: "1rem",
  },
  wrapper: {
    maxWidth: "80rem",
    margin: "0 auto",
    width: "100%",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "0.5rem",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    overflow: "hidden",
  },
  header: {
    padding: "1.5rem",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginLeft: "0.75rem",
  },
  searchBar: {
    padding: "1.5rem",
    borderBottom: "1px solid #e5e7eb",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    flexGrow: 1,
    padding: "0.75rem",
    border: "1px solid #d1d5db",
    borderRadius: "0.375rem",
    outline: "none",
    transition: "all 0.2s",
  },
  tableContainer: {
    overflowX: "auto",
    backgroundColor: "#f9fafb",
  },
  table: {
    width: "100%",
    minWidth: "1200px",
    borderCollapse: "separate",
    borderSpacing: "0",
  },
  tableHead: {
    backgroundColor: "#f3f4f6",
  },
  tableHeaderCell: {
    padding: "1rem 2rem",
    textAlign: "left",
    fontSize: "0.75rem",
    fontWeight: "500",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  tableBody: {
    backgroundColor: "white",
  },
  tableCell: {
    padding: "1.25rem 2rem",
    fontSize: "0.875rem",
    color: "#374151",
    verticalAlign: "middle",
  },
  loadingText: {
    padding: "2rem",
    textAlign: "center",
    color: "#6b7280",
  },
  actionButtons: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.75rem",
  },
};


function CadastrarCliente() {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({
    nome: "",
    telefone: "",
    endereco: "",
    logradouro: "",
    email: "",
  });

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prev) => ({ ...prev, [name]: value }));
  };

  const validarCampos = () => {
    if (!cliente.nome || !cliente.email) {
      setErro("Nome e Email são obrigatórios");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    if (!validarCampos()) return;

    try {
      setCarregando(true);
      const response = await axios.post("http://localhost:8080/clientes", cliente);
      if (response.status === 201) {
        setSucesso(true);
        setTimeout(() => navigate("/clientes"), 1500);
      }
    } catch (error) {
      setErro("Erro ao cadastrar. Verifique os dados ou tente mais tarde.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 6, mb: 5 }}>
      <Paper elevation={4} sx={{ p: 2, borderRadius: 3, width: 800, textAlign: "center" }}>
        
       
        
           <div style={{ ...styles.header, gap: "12px" }}>

          <img
             src="/imgs/Cliente sem fundo.png"
              alt="Cliente"
          style={{ width: 50, height: 50, objectFit: "contain" }}
          />


        

       
        <h1 style={styles.title}>Cadastrar Cliente</h1>

           </div>

        

        <form onSubmit={handleSubmit}>
  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "left", gap: 2 }}>
    <TextField
      label="Nome Completo"
      name="nome"
      value={cliente.nome}
      onChange={handleChange}
      required
      margin="normal"
      sx={{ width: "50%" }}
    />
    <TextField
      label="Telefone"
      name="telefone"
      value={cliente.telefone}
      onChange={handleChange}
      margin="normal"
      sx={{ width: "50%" }}
    />
    <TextField
      label="Endereço"
      name="endereco"
      value={cliente.endereco}
      onChange={handleChange}
      margin="normal"
      sx={{ width: "50%" }}
    />
    <TextField
      label="Logradouro"
      name="logradouro"
      value={cliente.logradouro}
      onChange={handleChange}
      margin="normal"
      sx={{ width: "50%" }}
    />
    <TextField
      label="E-mail"
      name="email"
      value={cliente.email}
      onChange={handleChange}
      required
      margin="normal"
      sx={{ width: "50%" }}
    />
  </Box>

  <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
    <Button
      variant="outlined"
      onClick={() => navigate("/clientes")}
      sx={{
        color: "#6039B8",
        borderColor: "#6039B8",
        borderRadius: "999px",
        px: 4,
        "&:hover": { backgroundColor: "#f3e5f5" },
      }}
    >
      Cancelar
    </Button>
    <Button
      type="submit"
      variant="contained"
      disabled={carregando}
      sx={{
        backgroundColor: "#6039B8",
        borderRadius: "999px",
        px: 4,
        "&:hover": { backgroundColor: "#6039B8" },
      }}
    >
      {carregando ? "Cadastrando..." : "Cadastrar"}
    </Button>
  </Box>
</form>
</Paper>

      {/* Feedbacks */}
      <Snackbar open={!!erro} autoHideDuration={5000} onClose={() => setErro("")}>
        <Alert severity="error" onClose={() => setErro("")}>
          {erro}
        </Alert>
      </Snackbar>
      <Snackbar open={sucesso} autoHideDuration={4000} onClose={() => setSucesso(false)}>
        <Alert severity="success" onClose={() => setSucesso(false)}>
          Cliente cadastrado com sucesso!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CadastrarCliente;
