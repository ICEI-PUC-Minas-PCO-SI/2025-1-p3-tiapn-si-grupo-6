import React, { useState, useEffect } from "react";
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

// Componente de input reutilizável
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

function CadastrarFornecedor() {
  const navigate = useNavigate();

  const [fornecedor, setFornecedor] = useState({
    nome: "",
    telefone: "",
    email: "",
    responsavel: "",
    observacoes: "",
    cep: "",
    logradouro: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let valorFormatado = value;

    if (name === "cep") valorFormatado = formatarCep(value);
    if (name === "telefone") valorFormatado = formatarTelefone(value);

    setFornecedor((prev) => ({ ...prev, [name]: valorFormatado }));
  };

  const validarCampos = () => {
    if (!fornecedor.nome.trim()) {
      setErro("O campo Nome é obrigatório.");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(fornecedor.email)) {
      setErro("E-mail inválido.");
      return false;
    }
    if (
      fornecedor.telefone &&
      !/^\d{10,11}$/.test(fornecedor.telefone.replace(/\D/g, ""))
    ) {
      setErro("Telefone inválido. Informe apenas números.");
      return false;
    }
    return true;
  };

  const formatarCep = (cep) =>
    cep
      .replace(/\D/g, "")
      .replace(/^(\d{5})(\d)/, "$1-$2")
      .slice(0, 9);

  const formatarTelefone = (telefone) => {
    const numero = telefone.replace(/\D/g, "").slice(0, 11);
    if (numero.length <= 10) {
      return numero.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else {
      return numero.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    }
  };

  // 🔥 Busca automática do endereço via ViaCEP
  useEffect(() => {
    const buscarEndereco = async () => {
      const cepLimpo = fornecedor.cep.replace(/\D/g, "");
      if (cepLimpo.length === 8) {
        try {
          const res = await axios.get(
            `https://viacep.com.br/ws/${cepLimpo}/json/`
          );
          if (!res.data.erro) {
            setFornecedor((prev) => ({
              ...prev,
              logradouro: res.data.logradouro || "",
              bairro: res.data.bairro || "",
              cidade: res.data.localidade || "",
              estado: res.data.uf || "",
            }));
          }
        } catch {
          console.log("Erro ao buscar CEP.");
        }
      }
    };
    buscarEndereco();
  }, [fornecedor.cep]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso(false);

    if (!validarCampos()) return;

    setCarregando(true);
    try {
      console.log(fornecedor.logradouro);
      const response = await axios.post(
        "http://localhost:8080/fornecedores/cadastrar",
        fornecedor
      );
      if (response.status === 201 || response.status === 200) {
        setSucesso(true);
        setFornecedor({
          nome: "",
          telefone: "",
          email: "",
          responsavel: "",
          observacoes: "",
          cep: "",
          logradouro: "",
          bairro: "",
          cidade: "",
          estado: "",
        });
      }
    } catch {
      setErro(
        "Erro ao cadastrar fornecedor. Verifique o backend e tente novamente."
      );
    } finally {
      setCarregando(false);
    }
  };

  const handleCancelar = () => {
    setFornecedor({
      nome: "",
      telefone: "",
      email: "",
      responsavel: "",
      observacoes: "",
      cep: "",
      logradouro: "",
      bairro: "",
      cidade: "",
      estado: "",
    });
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
          maxWidth: 950,
          p: 4,
          borderRadius: "16px",
          border: "1px solid #6a1b9a", // 🔥 Adiciona a borda roxa
          bgcolor: "white", // Fundo branco para destacar
        }}
        elevation={5} // Opcional: remove sombra se quiser só a borda
      >
        <Typography
          variant="h4"
          mb={3}
          align="center"
          sx={{ color: "#6a1b9a", fontWeight: "bold" }}
        >
          Cadastrar Fornecedor 🐾
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Coluna Dados Pessoais */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ color: "#6a1b9a" }}>
                Dados Pessoais
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <InputField
                label="Nome"
                name="nome"
                value={fornecedor.nome}
                onChange={handleChange}
                required
              />
              <InputField
                label="Telefone"
                name="telefone"
                value={fornecedor.telefone}
                onChange={handleChange}
              />
              <InputField
                label="Email"
                name="email"
                value={fornecedor.email}
                onChange={handleChange}
                required
                type="email"
              />
              <InputField
                label="Responsável"
                name="responsavel"
                value={fornecedor.responsavel}
                onChange={handleChange}
              />
              <InputField
                label="Observações"
                name="observacoes"
                value={fornecedor.observacoes}
                onChange={handleChange}
              />
            </Grid>

            {/* Coluna Endereço */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ color: "#6a1b9a" }}>
                Endereço
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <InputField
                label="CEP"
                name="cep"
                value={fornecedor.cep}
                onChange={handleChange}
              />
              <InputField
                label="Logradouro"
                name="logradouro"
                value={fornecedor.logradouro}
                onChange={handleChange}
              />
              <InputField
                label="Bairro"
                name="bairro"
                value={fornecedor.bairro}
                onChange={handleChange}
              />
              <InputField
                label="Cidade"
                name="cidade"
                value={fornecedor.cidade}
                onChange={handleChange}
              />
              <InputField
                label="Estado"
                name="estado"
                value={fornecedor.estado}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          {/* Botões */}
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
              onClick={() => navigate(-1)}
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

      {/* Snackbar Erro */}
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

      {/* Snackbar Sucesso */}
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
          Fornecedor cadastrado com sucesso!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CadastrarFornecedor;
