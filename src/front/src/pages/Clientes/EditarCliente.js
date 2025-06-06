import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { buscarClientePorId, editarCliente } from "../../api/cliente";

function EditarCliente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [cliente, setCliente] = useState({
    nome: "",
    telefone: "",
    endereco: "",
    logradouro: "",
    numero: "",
    cep: "",
    email: "",
  });

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [clienteOriginal, setClienteOriginal] = useState({});

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const dados = await buscarClientePorId(id);
        setCliente(dados);
        setClienteOriginal(dados);
      } catch (error) {
        console.error("Erro ao buscar cliente:", error);
        setErro("Erro ao carregar dados do cliente.");
      }
    };

    fetchCliente();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validarCampos = () => {
    if (!cliente.nome) {
      setErro("Nome é obrigatório");
      return false;
    }
    if (!cliente.email) {
      setErro("Email é obrigatório");
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
      const response = await editarCliente(id, cliente);

      if (response) {
        console.log("Cliente atualizado:", cliente);
        setSucesso(true);
        setTimeout(() => {
          navigate("/clientes");
        }, 1500);
      } else {
        setErro(
          "Erro ao atualizar cliente: A API não retornou uma resposta válida."
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      setErro("Erro ao atualizar cliente. Tente novamente.");
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
      background: "linear-gradient(to bottom, #f9f5ff, #ffffff)",
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
            onClick={() => navigate("/clientes")}
            sx={styles.backButton}
          >
            Voltar
          </Button>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              textAlign: "left",
              mb: 2,
              fontWeight: "bold",
              color: "#000000",
              mt: 3,
            }}
          >
            Editar Cliente - ID: {id}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Dados Pessoais */}
            <Grid item xs={12}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "left",
                  mb: 2,
                  color: "#000000",
                  fontWeight: "bold",
                  mt: 3,
                  whiteSpace: "nowrap",
                }}
              >
                Dados Pessoais
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nome Completo"
                name="nome"
                value={cliente.nome}
                onChange={handleChange}
                required
                sx={styles.textField}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Telefone"
                name="telefone"
                value={cliente.telefone}
                onChange={handleChange}
                required
                sx={styles.textField}
              />
            </Grid>

            {/* Endereço */}
            <Grid item xs={12} container alignItems="center" spacing={3}>
              <Grid item xs={12} sm={3}>
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: "left",
                    mb: 2,
                    fontWeight: "bold",
                    color: "#000000",
                    mt: 3,
                    whiteSpace: "nowrap",
                  }}
                >
                  Endereço
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} ms={3}>
                  <TextField
                    fullWidth
                    label="Endereço"
                    name="endereco"
                    value={cliente.endereco}
                    onChange={handleChange}
                    sx={styles.textField}
                  />
                </Grid>

                <Grid item xs={12} ms={9}>
                  <TextField
                    fullWidth
                    label="Logradouro"
                    name="logradouro"
                    value={cliente.logradouro}
                    onChange={handleChange}
                    sx={styles.textField}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Número"
                    name="numero"
                    value={cliente.numero}
                    onChange={handleChange}
                    sx={styles.textField}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Bairro"
                    name="bairro"
                    value={cliente.bairro}
                    onChange={handleChange}
                    sx={styles.textField}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="CEP"
                    name="cep"
                    value={cliente.cep}
                    onChange={handleChange}
                    sx={styles.textField}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="E-mail"
                name="email"
                type="email"
                value={cliente.email}
                onChange={handleChange}
                required
                sx={styles.textField}
              />
            </Grid>

            {/* Ações */}
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
                {carregando ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Feedback de erro */}
      <Snackbar
        open={!!erro}
        autoHideDuration={6000}
        onClose={() => setErro("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setErro("")}
          severity="error"
          sx={{
            width: "100%",
            bgcolor: "error.light",
            color: "error.contrastText",
          }}
        >
          {erro}
        </Alert>
      </Snackbar>

      {/* Feedback de sucesso */}
      <Snackbar
        open={sucesso}
        autoHideDuration={6000}
        onClose={() => setSucesso(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSucesso(false)}
          severity="success"
          sx={{
            width: "100%",
            bgcolor: "success.light",
            color: "success.contrastText",
          }}
        >
          Cliente atualizado com sucesso!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default EditarCliente;
