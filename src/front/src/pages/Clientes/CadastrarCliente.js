import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  IconButton,
  Box,
  Snackbar,
  Alert,
  Divider,
  useTheme,
  useMediaQuery,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../api/axiosConfig";
import PatinhasLayout from "../../components/PatinhasLayout.js";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const styles = {
  container: {
    mt: 4,
    mb: 4,
  },
  paper: {
    p: 3,
    borderRadius: 4,
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    background: "white",
    maxWidth: 950,
    margin: "0 auto",
    border: "1px solid #d1c4e9",
  },
  header: {
    display: "flex",
    alignItems: "center",
    mb: 3,
    paddingBottom: 2,
    borderBottom: "1px solid #e0d0ff",
  },
  title: {
    color: "#6a1b9a",
    fontWeight: 600,
    fontSize: "1.75rem",
  },
  sectionTitle: {
    color: "#6a1b9a",
    fontWeight: 500,
    mb: 2,
    fontSize: "1.25rem",
  },
  button: {
    backgroundColor: "#7e57c2",
    color: "white",
    fontWeight: 600,
    padding: "10px 24px",
    borderRadius: 2,
    "&:hover": {
      backgroundColor: "#5e35b1",
      boxShadow: "0px 2px 10px rgba(126, 87, 194, 0.4)",
    },
    "&:disabled": {
      backgroundColor: "#d1c4e9",
      color: "#9e9e9e",
    },
  },
  backButton: {
    color: "#7e57c2",
    fontWeight: 500,
    mr: 2,
    "&:hover": {
      backgroundColor: "rgba(126, 87, 194, 0.08)",
    },
  },
};

// Componente de input reutilizável
const InputField = ({
  label,
  name,
  value,
  onChange,
  required = false,
  type = "text",
  inputProps,
  sx,
  select = false,
  children,
}) => (
  <Box sx={{ mb: 2, width: "100%" }}>
    <Typography variant="body2" sx={{ mb: 0.5, color: "text.secondary" }}>
      {label}:
    </Typography>
    <TextField
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      fullWidth
      size="small"
      inputProps={inputProps}
      select={select}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "10px",
          "& fieldset": { borderColor: "#d1d5db" },
          "&:hover fieldset": { borderColor: "#6a1b9a" },
          "&.Mui-focused fieldset": { borderColor: "#6a1b9a" },
        },
        ...sx,
      }}
    >
      {children}
    </TextField>
  </Box>
);

function CadastrarCliente() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [cliente, setCliente] = useState({
    nome: "",
    email: "",
    telefone: "",
    cep: "",
    logradouro: "",
    bairro: "",
    cidade: "",
    estado: "",
    numero: "",
  });

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "numero" && value !== "" && !/^\d*$/.test(value)) return;

    if (name === "cep") {
      const cepNumeros = value.replace(/\D/g, "");
      let cepFormatado = cepNumeros;

      if (cepNumeros.length > 5) {
        cepFormatado = cepNumeros.slice(0, 5) + "-" + cepNumeros.slice(5, 8);
      }

      setCliente((prev) => ({
        ...prev,
        [name]: cepFormatado,
      }));
    } else {
      setCliente((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validarCampos = () => {
    if (!cliente.nome || !cliente.email) {
      setErro("Nome e Email são obrigatórios");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(cliente.email)) {
      setErro("E-mail inválido.");
      return false;
    }

    if (
      cliente.telefone &&
      !/^\d{10,11}$/.test(cliente.telefone.replace(/\D/g, ""))
    ) {
      setErro("Telefone inválido. Informe apenas números.");
      return false;
    }

    if (cliente.numero && !/^\d+$/.test(cliente.numero)) {
      setErro("Número do endereço deve conter apenas números.");
      return false;
    }

    return true;
  };

  useEffect(() => {
    const buscarEndereco = async () => {
      const cepLimpo = cliente.cep.replace(/\D/g, "");
      if (cepLimpo.length === 8) {
        try {
          const res = await axios.get(
            `https://viacep.com.br/ws/${cepLimpo}/json/`
          );
          if (!res.data.erro) {
            setCliente((prev) => ({
              ...prev,
              logradouro: res.data.logradouro || "",
              bairro: res.data.bairro || "",
              cidade: res.data.localidade || "",
              estado: res.data.uf || "",
            }));
          }
        } catch (error) {
          console.error("Erro ao buscar CEP:", error);
        }
      } else {
        setCliente((prev) => ({
          ...prev,
          logradouro: "",
          bairro: "",
          cidade: "",
          estado: "",
        }));
      }
    };
    buscarEndereco();
  }, [cliente.cep]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso(false);

    if (!validarCampos()) return;

    setCarregando(true);

    try {
      const response = await api.post(
        "http://localhost:8080/clientes",
        cliente
      );
      if (response.status === 201 || response.status === 200) {
        setSucesso(true);

        setTimeout(() => {
          navigate("/clientes");
        }, 1500);
      }
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      if (error.response) {
        setErro(
          `Erro ao cadastrar cliente: ${
            error.response.data.message || error.response.statusText
          }`
        );
      } else if (error.request) {
        setErro("Erro de conexão. Verifique sua internet ou o servidor.");
      } else {
        setErro("Ocorreu um erro inesperado: " + error.message);
      }
    } finally {
      setCarregando(false);
    }
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
          maxWidth: 950,
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
          sx={{
            color: "#6a1b9a",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <IconButton onClick={() => navigate(-1)} aria-label="voltar">
            <ArrowBackIcon />
          </IconButton>
          Cadastrar Cliente 
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ color: "#6a1b9a" }}>
                Dados Pessoais
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <InputField
                label="Nome"
                name="nome"
                value={cliente.nome}
                onChange={handleChange}
                required
              />
              <InputField
                label="Email"
                name="email"
                value={cliente.email}
                onChange={handleChange}
                required
                type="email"
              />
              <InputField
                label="Telefone"
                name="telefone"
                value={cliente.telefone}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ color: "#6a1b9a" }}>
                Endereço
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <InputField
                label="CEP"
                name="cep"
                value={cliente.cep}
                onChange={handleChange}
              />
              <InputField
                label="Logradouro"
                name="logradouro"
                value={cliente.logradouro}
                onChange={handleChange}
              />
              <InputField
                label="Número"
                name="numero"
                value={cliente.numero}
                onChange={handleChange}
              />
              <InputField
                label="Bairro"
                name="bairro"
                value={cliente.bairro}
                onChange={handleChange}
              />
              <InputField
                label="Cidade"
                name="cidade"
                value={cliente.cidade}
                onChange={handleChange}
              />
              <InputField
                label="Estado"
                name="estado"
                value={cliente.estado}
                onChange={handleChange}
              />

              {/* Botão de Cadastro */}
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}
              >
                <Button
                  variant="contained"
                  type="submit"
                  disabled={carregando}
                  sx={styles.button}
                >
                  {carregando ? "Cadastrando..." : "Cadastrar Cliente"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Snackbars */}
      <Snackbar
        open={!!erro}
        autoHideDuration={6000}
        onClose={(event, reason) => {
          if (reason === "clickaway") return;
          setErro("");
        }}
      >
        <Alert
          onClose={() => setErro("")}
          severity="error"
          sx={{ width: "100%" }}
        >
          {erro}
        </Alert>
      </Snackbar>

      <Snackbar
        open={sucesso}
        autoHideDuration={2000}
        onClose={(event, reason) => {
          if (reason === "clickaway") return;
          setSucesso(false);
        }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Cliente cadastrado com sucesso!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CadastrarCliente;
