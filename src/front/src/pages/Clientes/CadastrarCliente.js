import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Box,
  Snackbar,
  Alert,
  Divider,
  useTheme,
  useMediaQuery,
  MenuItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../api/axiosConfig";
import PatinhasLayout from "../../components/PatinhasLayout.js";

// Estilos unificados para ambas as páginas
const commonStyles = {
  containerWrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    p: { xs: 1, md: 2 },
  },
  paper: {
    width: "100%",
    maxWidth: 950,
    p: { xs: 2, md: 4 },
    borderRadius: "16px",
    border: "1px solid #6a1b9a",
    bgcolor: "white",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.15)",
  },
  // Ajuste o header para ser mais genérico, com flexibilidade
  header: {
    display: "flex",
    alignItems: "center",
    mb: 3,
    pb: 2,
    borderBottom: "1px solid #e0d0ff",
    // Removido justifyContent: 'center' daqui para ser aplicado individualmente
  },
  title: {
    color: "#6a1b9a",
    fontWeight: "bold",
    fontSize: { xs: "1.75rem", md: "2rem" },
    // ml, mr, textAlign, flexGrow serão aplicados individualmente
  },
  sectionTitle: {
    color: "#6a1b9a",
    fontWeight: 600,
    mb: 2,
    fontSize: { xs: "1.2rem", md: "1.35rem" },
  },
  buttonPrimary: {
    backgroundColor: "#7e57c2",
    color: "white",
    fontWeight: 600,
    padding: "10px 24px",
    borderRadius: "8px",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    "&:hover": {
      backgroundColor: "#5e35b1",
      transform: "translateY(-2px)",
      boxShadow: "0px 4px 12px rgba(126, 87, 194, 0.4)",
    },
    "&:disabled": {
      backgroundColor: "#d1c4e9",
      color: "#9e9e9e",
    },
  },
  buttonSecondary: {
    color: "#7e57c2",
    fontWeight: 500,
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "rgba(126, 87, 194, 0.08)",
    },
  },
};

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
  disabled = false,
  ...rest
}) => (
  <Box sx={{ mb: 2, width: "100%" }}>
    <Typography variant="body2" sx={{ mb: 0.5, color: "text.secondary", fontWeight: 500 }}>
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
      disabled={disabled}
      variant="outlined"
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "10px",
          backgroundColor: disabled ? "#f0f0f0" : "#ffffff",
          "& fieldset": { borderColor: "#d1d5db" },
          "&:hover fieldset": { borderColor: disabled ? "#d1d5db" : "#6a1b9a", borderWidth: "1px" },
          "&.Mui-focused fieldset": { borderColor: disabled ? "#d1d5db" : "#6a1b9a", borderWidth: "1px" },
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </TextField>
  </Box>
);

function CadastrarCliente() {
  const navigate = useNavigate();

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
    if (name === "numero") {
      if (value !== "" && !/^\d*$/.test(value)) return;
    }
    if (name === "cep") {
      const cepNumeros = value.replace(/\D/g, "");
      let cepFormatado = cepNumeros;
      if (cepNumeros.length > 5) {
        cepFormatado = cepNumeros.slice(0, 5) + "-" + cepNumeros.slice(5, 8);
      }
      setCliente((prev) => ({ ...prev, [name]: cepFormatado }));
    } else if (name === "telefone") {
      const telefoneNumeros = value.replace(/\D/g, "");
      let telefoneFormatado = telefoneNumeros;
      if (telefoneNumeros.length <= 10) {
        telefoneFormatado = telefoneNumeros.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
      } else {
        telefoneFormatado = telefoneNumeros.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
      }
      setCliente((prev) => ({ ...prev, [name]: telefoneFormatado }));
    } else {
      setCliente((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validarCampos = () => {
    if (!cliente.nome.trim()) {
      setErro("O campo Nome Completo é obrigatório.");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(cliente.email)) {
      setErro("E-mail inválido.");
      return false;
    }
    const telefoneLimpo = cliente.telefone.replace(/\D/g, "");
    if (cliente.telefone && !/^\d{10,11}$/.test(telefoneLimpo)) {
      setErro("Telefone inválido. Informe 10 ou 11 dígitos (incluindo DDD).");
      return false;
    }
    if (cliente.numero && !/^\d+$/.test(cliente.numero)) {
      setErro("Número do endereço deve conter apenas números.");
      return false;
    }
    if (cliente.cep && cliente.cep.replace(/\D/g, "").length !== 9 && cliente.cep.replace(/\D/g, "").length !== 8) {
      setErro("CEP inválido. Deve conter 8 dígitos.");
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
          } else {
            setCliente((prev) => ({
              ...prev,
              logradouro: "",
              bairro: "",
              cidade: "",
              estado: "",
            }));
            setErro("CEP não encontrado.");
          }
        } catch (error) {
          console.error("Erro ao buscar CEP:", error);
          setErro("Erro ao buscar CEP. Verifique sua conexão.");
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
    const timeoutId = setTimeout(() => {
      buscarEndereco();
    }, 500);
    return () => clearTimeout(timeoutId);
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
    <PatinhasLayout>
      <Box sx={commonStyles.containerWrapper}>
        <Paper elevation={3} sx={commonStyles.paper}>
          <Box sx={commonStyles.header}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/clientes")}
              sx={commonStyles.buttonSecondary}
            >
              Voltar
            </Button>
            {/* O título de Cadastrar Cliente alinhado ao centro */}
            <Typography
              variant="h5"
              component="h1"
              sx={{
                ...commonStyles.title,
                flexGrow: 1, // Faz o título ocupar o espaço restante
                textAlign: 'center', // Centraliza o texto
                mr: 'auto', // Adiciona margem direita para ajudar no alinhamento central
                ml: 2, // Mantém espaço após o botão Voltar
              }}
            >
              Cadastrar Cliente
            </Typography>
            {/* Um Box vazio para preencher o espaço à direita e ajudar a centralizar o título */}
            <Box sx={{ width: commonStyles.buttonSecondary.width || 'auto', minWidth: '80px' }}></Box> 
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={commonStyles.sectionTitle}>
                  Dados Pessoais
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <InputField
                  label="Nome Completo"
                  name="nome"
                  value={cliente.nome}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="E-mail"
                  name="email"
                  type="email"
                  value={cliente.email}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="Telefone"
                  name="telefone"
                  value={cliente.telefone}
                  onChange={handleChange}
                  placeholder="(XX) XXXXX-XXXX"
                  inputProps={{ maxLength: 15 }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={commonStyles.sectionTitle}>
                  Endereço
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <InputField
                  label="CEP"
                  name="cep"
                  value={cliente.cep}
                  onChange={handleChange}
                  inputProps={{ maxLength: 9 }}
                  placeholder="XXXXX-XXX"
                />
                <InputField
                  label="Logradouro"
                  name="logradouro"
                  value={cliente.logradouro}
                  onChange={handleChange}
                  disabled
                />
                <InputField
                  label="Número"
                  name="numero"
                  value={cliente.numero}
                  onChange={handleChange}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
                <InputField
                  label="Bairro"
                  name="bairro"
                  value={cliente.bairro}
                  onChange={handleChange}
                  disabled
                />
                <InputField
                  label="Cidade"
                  name="cidade"
                  value={cliente.cidade}
                  onChange={handleChange}
                  disabled
                />
                <InputField
                  label="Estado"
                  name="estado"
                  value={cliente.estado}
                  onChange={handleChange}
                  disabled
                />
              </Grid>

              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}
              >
                <Button
                  variant="contained"
                  type="submit"
                  disabled={carregando}
                  sx={commonStyles.buttonPrimary}
                >
                  {carregando ? "Cadastrando..." : "Cadastrar Cliente"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>

        <Snackbar
          open={!!erro}
          autoHideDuration={6000}
          onClose={(event, reason) => {
            if (reason === "clickaway") return;
            setErro("");
          }}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
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
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            Cliente cadastrado com sucesso!
          </Alert>
        </Snackbar>
      </Box>
    </PatinhasLayout>
  );
}

export default CadastrarCliente;