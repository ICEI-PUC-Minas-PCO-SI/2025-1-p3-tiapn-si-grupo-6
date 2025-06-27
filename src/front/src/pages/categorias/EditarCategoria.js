import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getCategoriaById, editarCategoria } from "../../api/categoria"; // Corrigido

const InputField = ({
  label,
  name,
  value,
  onChange,
  required = false,
  multiline = false,
  rows,
}) => (
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
      multiline={multiline}
      rows={rows}
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

function EditarCategoria() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState({ nome: "", descricao: "" });
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const carregarCategoria = async () => {
      try {
        setCarregando(true);
        const data = await getCategoriaById(id);
        setCategoria({
          nome: data.nome || "",
          descricao: data.descricao || "",
        });
      } catch (error) {
        setErro("Erro ao carregar categoria.");
        setTimeout(() => navigate("/categorias"), 2000);
      } finally {
        setCarregando(false);
      }
    };

    if (id) carregarCategoria();
  }, [id, navigate]);

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
      await editarCategoria(id, categoria);
      setSucesso(true);
      setTimeout(() => navigate("/categorias"), 1000);
    } catch (error) {
      setErro(error.message || "Erro ao atualizar categoria.");
    } finally {
      setCarregando(false);
    }
  };

  const handleCancelar = () => navigate("/categorias");

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
          maxWidth: 600,
          p: 4,
          borderRadius: "16px",
          border: "1px solid #6a1b9a",
          bgcolor: "white",
        }}
        elevation={5}
      >
        <Typography
          variant="h4"
          mb={3}
          align="center"
          sx={{ color: "#6a1b9a", fontWeight: "bold" }}
        >
          Editar Categoria
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
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
                multiline
                rows={4}
              />
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              variant="outlined"
              color="secondary"
              onClick={handleCancelar}
              disabled={carregando}
            >
              Voltar
            </Button>

            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: "#6a1b9a", "&:hover": { bgcolor: "#4a148c" } }}
              disabled={carregando}
            >
              {carregando ? "Salvando..." : "Salvar"}
            </Button>
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
        <Alert severity="success" onClose={() => setSucesso(false)} variant="filled">
          Categoria atualizada com sucesso!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default EditarCategoria;