import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Divider,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

const InputField = ({ label, name, value, onChange, required = false }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="body2" sx={{ mb: 0.5, color: "text.secondary" }}>
      {label}:
    </Typography>
    <TextField
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      fullWidth
      size="small"
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "10px",
          "& fieldset": { borderColor: "#c2c2c2" },
          "&:hover fieldset": { borderColor: "#6a1b9a" },
          "&.Mui-focused fieldset": { borderColor: "#6a1b9a" },
        },
      }}
    />
  </Box>
);

function CadastrarCategoria() {
  const navigate = useNavigate();

  const [categoria, setCategoria] = useState({ nome: "", descricao: "" });
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoria((prev) => ({ ...prev, [name]: value }));
  };
  const validarCampos = () => {

    if (!categoria.nome.trim()) {
      setErro("O campo Nome é obrigatório.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso(false);

    if (!validarCampos()) return;

    setCarregando(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/categorias",
        categoria
      );
      if (response.status === 201 || response.status === 200) {
        setSucesso(true);
        setCategoria({ nome: "", descricao: "" });
        setTimeout(() => navigate("/categorias"), 1500);
      }
    } catch (error) {
      setErro(
        "Erro ao cadastrar categoria. Verifique o backend e tente novamente."
      );
    } finally {
      setCarregando(false);
    }
  };

  const handleCancelar = () => {
    setCategoria({ nome: "", descricao: "" });
    setErro("");
    setSucesso(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        sx={{
          width: "100%",
          maxWidth: 1250,
          p: 4,
          pt: 8,
          borderRadius: "16px",
          border: "1px solid #6a1b9a",
          bgcolor: "white",
          position: "relative",
        }}
        elevation={5}
      >
        

        <Typography
          variant="h4"
          mb={3}
          align="center"
          sx={{ color: "#6a1b9a", fontWeight: "bold" }}
        >
          Cadastrar Categoria 🐾
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#6a1b9a", mb: 2, textAlign: "center" }}
              >
                Informações
              </Typography>
              <Divider sx={{ mb: 3, width: "100%" }} />
              <Box sx={{ width: "100%", maxWidth: 450 }}>
                <InputField
                  label="Nome"
                  name="nome"
                  value={categoria.nome}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="Descrição"
                  name="descricao"
                  value={categoria.descricao}
                  onChange={handleChange}
                />
              </Box>
            </Grid>
          </Grid>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 4,
            }}
          >
            <Button
              startIcon={<ArrowBackIcon />}
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/categorias") }
            >
              Voltar
            </Button>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancelar}
                disabled={carregando}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ bgcolor: "#6a1b9a", "&:hover": { bgcolor: "#4a148c" } }}
                disabled={carregando}
              >
                {carregando ? "Cadastrando..." : "Cadastrar"}
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>

      <Snackbar
        open={!!erro}
        autoHideDuration={6000}
        onClose={() => setErro("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => setErro("")} variant="filled">
          {erro}
        </Alert>
      </Snackbar>

      <Snackbar
        open={sucesso}
        autoHideDuration={4000}
        onClose={() => setSucesso(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="success"
          onClose={() => setSucesso(false)}
          variant="filled"
        >
          Categoria cadastrada com sucesso!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CadastrarCategoria;