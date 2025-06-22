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
   Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { buscarClientePorId, editarCliente } from "../../api/cliente";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import api from '../../api/axiosConfig';


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

function EditarCliente() {
  const { id } = useParams();
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
  const [clienteOriginal, setClienteOriginal] = useState({});

  useEffect(() => {
    const carregarCliente = async () => {
        try {
            const data = await buscarClientePorId(id);
            setCliente({
                id: data.id,
                nome: data.nome || "",
                email: data.email || "",
                telefone: data.telefone || "",
                cep: data.cep || "",
                logradouro: data.logradouro || "",
                bairro: data.bairro || "",
                cidade: data.localidade || "", 
                estado: data.uf || "",       
                numero: data.numero || "",
            });
            setClienteOriginal(data); 
        } catch (error) {
            console.error("Erro detalhado ao carregar cliente:", error);
            if (error.response) {
                console.error("Dados do erro (resposta):", error.response.data);
                console.error("Status do erro (resposta):", error.response.status);
                if (error.response.status === 404) {
                    setErro("Cliente não encontrado.");
                } else if (error.response.status === 403) {
                    setErro("Acesso negado para carregar dados do cliente.");
                } else if (error.response.status === 401) {
                    setErro("Não autorizado. Faça login novamente.");
                } else {
                    setErro("Erro ao carregar cliente para edição. Tente novamente mais tarde.");
                }
            } else if (error.request) {
                setErro("Nenhuma resposta do servidor ao tentar carregar o cliente.");
            } else {
                setErro("Erro interno ao preparar a requisição: " + error.message);
            }
        }
    };

    if (id) {
        carregarCliente();
    }
}, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let valorFormatado = value;

    if (name === "cep") valorFormatado = formatarCep(value);
    if (name === "telefone") valorFormatado = formatarTelefone(value);

    setCliente((prev) => ({ ...prev, [name]: valorFormatado }));
  };

  const validarCampos = () => {
  if (!cliente.nome.trim()) {
    setErro("O campo Nome é obrigatório.");
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


  const formatarCep = (cep) =>
    cep
      .replace(/\D/g, "")
      .replace(/^(\d{5})(\d)/, "$1-$2")
      .slice(0, 9);

  const formatarTelefone = (telefone) => {
    const numTel = telefone.replace(/\D/g, "").slice(0, 11);
    if (numTel.length <= 10) {
      return numTel.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else {
      return numTel.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    }
  };

  // Busca automática do endereço via ViaCEP ao alterar o CEP
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
        } catch {
          console.log("Erro ao buscar CEP.");
        }
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
      // Envia objeto completo, incluindo id para backend saber qual atualizar
      await editarCliente(cliente.id, cliente);
      setSucesso(true);
      setTimeout(() => {
        navigate(-1); // volta para tela anterior após sucesso
      }, 1500);
    } catch {
      setErro(
        "Erro ao editar cliente. Verifique o backend e tente novamente."
      );
    } finally {
      setCarregando(false);
    }
  };

  const handleCancelar = () => {
    navigate(-1);
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
          Editar Cliente <EditIcon />
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Dados Pessoais */}
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
            {/* Endereço */}
            
  <Grid xs={12} md={6}>
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
            </Grid>
         </Grid>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              variant="outlined"
              color="secondary"
              onClick={handleCancelar}
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
        <Alert severity="error" onClose={() => setErro("")}>
          {erro}
        </Alert>
      </Snackbar>

      <Snackbar
        open={sucesso}
        autoHideDuration={4000}
        onClose={() => setSucesso(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setSucesso(false)}>
          Cliente editado com sucesso!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default EditarCliente;

