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
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { editarUsuario, getUsuarioById } from "./../../api/usuarios";
import axios from "axios"; // Importar axios para ViaCEP

const InputField = ({
  label,
  name,
  value,
  onChange,
  required = false,
  type = "text",
}) => (
  <Box sx={{ mb: 2 }}>
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

function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false); // Mantido para o submit
  const [loading, setLoading] = useState(true); // Para carregar os dados iniciais
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    login: "",
    estado: "",
    bairro: "",
    logradouro: "",
    numero: "",
    cep: "",
    cidade: "",
    senhaPura: "",
    confirmarSenha: "",
  });

  useEffect(() => {
    let mounted = true;

    const carregarUsuario = async () => {
      try {
        const data = await getUsuarioById(id);
        console.log("Dados recebidos para edição:", data);

        if (mounted) {
          setUsuario({
            nome: data.nome || "",
            email: data.email || "",
            login: data.login || "",
            estado: data.estado || "",
            bairro: data.bairro || "",
            logradouro: data.logradouro || "",
            numero: data.numero || "",
            cep: data.cep || "",
            cidade: data.cidade || "",
            senhaPura: "",
            confirmarSenha: "",
          });
        }
      } catch (error) {
        console.error("Erro ao carregar usuário para edição:", error);
        setErro("Erro ao carregar dados do usuário."); // Use setErro para o Snackbar
        setTimeout(() => navigate("/usuarios"), 2000); // Redireciona após mostrar o erro
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    carregarUsuario();

    return () => {
      mounted = false;
    };
  }, [id, navigate]);

  // Busca automática do endereço via ViaCEP ao alterar o CEP
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
          } else {
            // Se o CEP for inválido pelo ViaCEP, limpa os campos de endereço
            setUsuario((prev) => ({
              ...prev,
              logradouro: "",
              bairro: "",
              cidade: "",
              estado: "",
            }));
            setErro("CEP não encontrado ou inválido.");
          }
        } catch (err) {
          console.error("Erro ao buscar CEP no ViaCEP:", err);
        }
      } else if (cepLimpo.length < 8) {
        // Limpar campos de endereço se o CEP estiver incompleto
        setUsuario((prev) => ({
          ...prev,
          logradouro: "",
          bairro: "",
          cidade: "",
          estado: "",
        }));
      }
    };
    const handler = setTimeout(() => {
      buscarEndereco();
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [usuario.cep]); // Dispara o efeito sempre que o CEP muda

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Impede que 'numero' aceite não-dígitos
    if (name === "numero") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length > 0) {
        setUsuario((prev) => ({
          ...prev,
          [name]: numericValue,
        }));
      } else {
        setUsuario((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
      return;
    }

    // Formata o CEP
    if (name === "cep") {
      const cepNumeros = value.replace(/\D/g, "");
      let cepFormatado = cepNumeros;

      if (cepNumeros.length > 5) {
        cepFormatado = cepNumeros.slice(0, 5) + "-" + cepNumeros.slice(5, 8);
      }

      setUsuario((prev) => ({
        ...prev,
        [name]: cepFormatado,
      }));
      return;
    }

    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso(false);
    setCarregando(true);

    if (usuario.senhaPura && usuario.senhaPura !== usuario.confirmarSenha) {
      setErro("As senhas não coincidem!");
      setCarregando(false);
      return;
    }
    if (usuario.senhaPura && usuario.senhaPura.length < 6) {
      setErro("A nova senha deve ter pelo menos 6 caracteres.");
      setCarregando(false);
      return;
    }
    // Adicionar validação para campos obrigatórios
    if (
      !usuario.nome ||
      !usuario.email ||
      !usuario.login ||
      !usuario.cep ||
      !usuario.logradouro ||
      !usuario.bairro ||
      !usuario.cidade ||
      !usuario.estado ||
      !usuario.numero
    ) {
      setErro(
        "Por favor, preencha todos os campos obrigatórios, incluindo o endereço."
      );
      setCarregando(false);
      return;
    }

    try {
      const dadosAtualizacao = {
        nome: usuario.nome,
        email: usuario.email,
        login: usuario.login,
        estado: usuario.estado,
        bairro: usuario.bairro,
        logradouro: usuario.logradouro,
        numero: usuario.numero,
        cep: usuario.cep.replace(/\D/g, ""),
        cidade: usuario.cidade,
      };

      if (usuario.senhaPura) {
        dadosAtualizacao.senhaPura = usuario.senhaPura;
      }

      let response = await editarUsuario(id, dadosAtualizacao);

      if (response) {
        setSucesso(true);
        setTimeout(() => {
          navigate("/usuarios");
        }, 1500);
      } else {
        setErro(
          "Erro ao atualizar usuário: A API não retornou uma resposta válida."
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      const errorMessage =
        error.response?.data?.message || "Erro ao atualizar usuário";
      setErro(errorMessage);
    } finally {
      setCarregando(false);
    }
  };

  if (loading) {
    return (
      <Container
        maxWidth="md"
        sx={{ display: "flex", justifyContent: "center", mt: 4 }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/usuarios")}
            sx={{ mr: 2 }}
          >
            Voltar
          </Button>
          <Typography variant="h5" component="h1" sx={{ color: "#6a1b9a" }}>
            Editar Usuário - {usuario.nome}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Dados Pessoais */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom sx={{ color: "#6a1b9a" }}>
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
              />
              <InputField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={usuario.email}
                onChange={handleChange}
                required
              />
              <InputField
                fullWidth
                label="Login"
                name="login"
                value={usuario.login}
                onChange={handleChange}
                required
              />

              {/* Senha */}
              <InputField
                fullWidth
                label="Nova Senha (deixe em branco para manter a atual)"
                name="senhaPura"
                type="password"
                value={usuario.senhaPura}
                onChange={handleChange}
              />
              <InputField
                fullWidth
                label="Confirmar Nova Senha"
                name="confirmarSenha"
                type="password"
                value={usuario.confirmarSenha}
                onChange={handleChange}
              />
            </Grid>

            {/* Endereço */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ color: "#6a1b9a" }}>
                Endereço
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <InputField
                fullWidth
                label="CEP"
                name="cep"
                value={usuario.cep}
                onChange={handleChange}
                inputProps={{ maxLength: 9 }}
              />
              <InputField
                fullWidth
                label="Logradouro"
                name="logradouro"
                value={usuario.logradouro}
                onChange={handleChange}
                required
              />
              <InputField
                fullWidth
                label="Número"
                name="numero"
                value={usuario.numero}
                onChange={handleChange}
                required
              />

              <InputField
                fullWidth
                label="Bairro"
                name="bairro"
                value={usuario.bairro}
                onChange={handleChange}
                required
              />

              <InputField
                fullWidth
                label="Cidade"
                name="cidade"
                value={usuario.cidade}
                onChange={handleChange}
                required
              />

              <InputField
                fullWidth
                label="Estado"
                name="estado"
                value={usuario.estado}
                onChange={handleChange}
                inputProps={{ maxLength: 2 }}
                required
              />
            </Grid>
          </Grid>

          {/* Botão de submit */}
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
          >
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={carregando}
              sx={{
                backgroundColor: "#C0A8FE",
                "&:hover": { backgroundColor: "#9F7AEA" },
              }}
            >
              {carregando ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </Grid>
        </form>

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
            Usuário atualizado com sucesso!
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
}

export default EditarUsuario;
