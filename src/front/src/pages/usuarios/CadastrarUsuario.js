import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Paper,
  Box,
  Snackbar,
  Alert,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import api from "../../api/axiosConfig";
import PatinhasLayout from "../../components/PatinhasLayout";

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
          "& fieldset": { borderColor: "#c2c2c2" },
          "&:hover fieldset": { borderColor: "#6a1b9a" },
          "&.Mui-focused fieldset": { borderColor: "#6a1b9a" },
        },
      }}
    >
      {children}
    </TextField>
  </Box>
);

function CadastrarUsuario() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    login: "",
    tipoUsuario: "",
    bairro: "",
    logradouro: "",
    numero: "",
    cep: "",
    cidade: "",
    estado: "",
    senhaPura: "",
    confirmarSenha: "",
  });

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const tiposUsuario = [
    { value: "GERENTE", label: "Gerente" },
    { value: "FUNCIONARIO", label: "Funcionário" },
    { value: "VETERINARIO", label: "Veterinário" },
    { value: "TOSADOR", label: "Tosador" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "numero" && !/^\d*$/.test(value)) return;
    if (name === "cep") {
      const cepNumeros = value.replace(/\D/g, "");
      let cepFormatado = cepNumeros;

      if (cepNumeros.length > 5) {
        cepFormatado = cepNumeros.slice(0, 5) + "-" + cepNumeros.slice(5, 8);
      }

      return setUsuario((prev) => ({
        ...prev,
        [name]: cepFormatado,
      }));
    }

    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validarCampos = () => {
    if (usuario.senhaPura !== usuario.confirmarSenha) {
      setErro("As senhas não coincidem");
      return false;
    }

    if (usuario.senhaPura.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres");
      return false;
    }

    if (!usuario.tipoUsuario) {
      setErro("Selecione um tipo de usuário");
      return false;
    }

    if (
      !usuario.nome ||
      !usuario.email ||
      !usuario.login ||
      !usuario.senhaPura ||
      !usuario.confirmarSenha
    ) {
      setErro("Por favor, preencha todos os campos obrigatórios.");
      return false;
    }
    return true;
  };

  const formatarCep = (cep) =>
    cep
      .replace(/\D/g, "")
      .replace(/^(\d{5})(\d)/, "$1-$2")
      .slice(0, 9);

  /* const formatarTelefone = (telefone) => {
    const numTelefone = telefone.replace(/\D/g, "").slice(0, 11);
    if (numTelefone.length <= 10) {
      return numTelefone.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else {
      return numTelefone.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    }
  };
*/
  // 🔥 Busca automática do endereço via ViaCEP
  useEffect(() => {
    const buscarEndereco = async () => {
      const cepLimpo = usuario.cep.replace(/\D/g, "");
      if (cepLimpo.length === 8) {
        try {
          const res = await axios.get(
            `https://viacep.com.br/ws/${cepLimpo}/json/`
          );
          if (!res.data.erro) {
            setUsuario((prev) => ({
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
        // Limpar campos de endereço se o CEP não estiver completo
        setUsuario((prev) => ({
          ...prev,
          logradouro: "",
          bairro: "",
          cidade: "",
          estado: "",
        }));
      }
    };
    buscarEndereco();
  }, [usuario.cep]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso(false);

    if (!validarCampos()) return;

    setCarregando(true);

    try {
      const dadosUsuario = {
        nome: usuario.nome,
        email: usuario.email,
        login: usuario.login,
        tipoUsuario: usuario.tipoUsuario,
        estado: usuario.estado,
        bairro: usuario.bairro,
        logradouro: usuario.logradouro,
        numero: usuario.numero,
        cep: usuario.cep,
        cidade: usuario.cidade,
        senhaPura: usuario.senhaPura,
      };

      const response = await api.post(
        "http://localhost:8080/usuarios",
        dadosUsuario
      );

      if (response.status === 201 || response.status === 200) {
        setSucesso(true);

        setTimeout(() => {
          navigate("/usuarios");
        }, 1500);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          setErro("Login já está em uso. Por favor, escolha outro.");
        } else {
          setErro(
            `Erro ao cadastrar usuário: ${
              error.response.data.message || error.response.statusText
            }`
          );
        }
      } else {
        setErro("Erro de conexão. Verifique sua internet e tente novamente.");
      }
    } finally {
      setCarregando(false);
    }
  };

  const styles = {
    container: {
      mt: 4,
      mb: 4,
      px: isSmallScreen ? 2 : 4,
    },
    paper: {
      p: 3,
      borderRadius: 4,
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
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
      fontSize: isSmallScreen ? "1.5rem" : "1.75rem",
    },
    sectionTitle: {
      color: "#6a1b9a",
      fontWeight: 500,
      mb: 2,
      fontSize: isSmallScreen ? "1.1rem" : "1.25rem",
    },
    textField: {
      "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
        "& fieldset": {
          borderColor: "#d1c4e9",
        },
        "&:hover fieldset": {
          borderColor: "#b39ddb",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#7e57c2",
        },
      },
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

  return (
    <Container maxWidth="md" sx={styles.container}>
      <Paper elevation={3} sx={styles.paper}>
        <Box sx={styles.header}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/usuarios")}
            sx={styles.backButton}
          >
            Voltar
          </Button>
          <Typography variant="h5" component="h1" sx={styles.title}>
            Cadastrar Novo Usuário
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={14}>
            {/* Coluna Dados Pessoais */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ color: "#6a1b9a" }}>
                Dados Pessoais
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <InputField
                fullWidth
                label="Nome Completo"
                name="nome"
                value={usuario.nome}
                onChange={handleChange}
                required
                sx={styles.textField}
              />

              <InputField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={usuario.email}
                onChange={handleChange}
                required
                sx={styles.textField}
              />

              <InputField
                fullWidth
                label="Login"
                name="login"
                value={usuario.login}
                onChange={handleChange}
                required
                sx={styles.textField}
              />

              <InputField
                fullWidth
                select
                label="Tipo de Usuário"
                name="tipoUsuario"
                value={usuario.tipoUsuario}
                onChange={handleChange}
                required
                sx={styles.textField}
              >
                {tiposUsuario.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    sx={{ color: "#5e35b1" }}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </InputField>

              {/* Senha */}

              <InputField
                fullWidth
                label="Senha"
                name="senhaPura"
                type="password"
                value={usuario.senhaPura}
                onChange={handleChange}
                required
                sx={styles.textField}
              />

              <InputField
                fullWidth
                label="Confirmar Senha"
                name="confirmarSenha"
                type="password"
                value={usuario.confirmarSenha}
                onChange={handleChange}
                required
                sx={styles.textField}
              />
            </Grid>

            {/* Endereço */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ color: "#6a1b9a" }}>
                Endereço
              </Typography>

              <Divider sx={{ mb: 2 }} />
              {/* Campos para Endereço  */}

              <InputField
                fullWidth
                label="CEP"
                name="cep"
                value={usuario.cep}
                onChange={handleChange}
                inputProps={{ maxLength: 9 }}
                sx={styles.textField}
              />

              <InputField
                fullWidth
                label="Logradouro"
                name="logradouro"
                value={usuario.logradouro}
                onChange={handleChange}
                sx={styles.textField}
              />
              <InputField
                fullWidth
                label="Número"
                name="numero"
                value={usuario.numero}
                onChange={handleChange}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                sx={styles.textField}
              />
              <InputField
                fullWidth
                label="Bairro"
                name="bairro"
                value={usuario.bairro}
                onChange={handleChange}
                sx={styles.textField}
              />

              <InputField
                fullWidth
                label="Cidade"
                name="cidade"
                value={usuario.cidade}
                onChange={handleChange}
                sx={styles.textField}
              />

              <InputField
                fullWidth
                label="Estado"
                name="estado"
                value={usuario.estado}
                onChange={handleChange}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                sx={styles.textField}
              />
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
              >
                <Button
                  variant="contained"
                  type="submit"
                  disabled={carregando}
                  sx={styles.button}
                >
                  {carregando ? "Cadastrando..." : "Cadastrar Usuário"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Snackbar erro */}
      <Snackbar
        open={!!erro}
        autoHideDuration={6000}
        onClose={() => setErro("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setErro("")}
          severity="error"
          sx={{ width: "100%" }}
        >
          {erro}
        </Alert>
      </Snackbar>

      {/* Snackbar sucesso */}
      <Snackbar
        open={sucesso}
        autoHideDuration={2000}
        onClose={() => setSucesso(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Usuário cadastrado com sucesso!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default CadastrarUsuario;
