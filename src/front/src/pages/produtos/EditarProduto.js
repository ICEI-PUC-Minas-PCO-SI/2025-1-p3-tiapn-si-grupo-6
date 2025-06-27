import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container, Typography, TextField, Button, Grid, Paper, Box,
  Snackbar, Alert, useTheme, useMediaQuery, MenuItem, Divider
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { buscarPorId, editarProduto, enviarFotoProduto } from "../../api/produtos";
import api from "../../api/axiosConfig";

function EditarProduto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [produto, setProduto] = useState({
    nome: "",
    descricao: "",
    preco: "",
    quantidade: "",
    categoria: { id: "" },
    fornecedor: { id: "" },
    disponivel: "",
    dataValidade: "",
    foto: "",
    nomeFoto: "",
    tipoFoto: "",
  });

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const [resCategorias, resFornecedores] = await Promise.all([
          api.get('/categorias'),
          api.get('/fornecedores/listar')
        ]);

        setCategorias(resCategorias.data);
        setFornecedores(resFornecedores.data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setErro("Erro ao carregar categorias e fornecedores.");
      }
    };

    const fetchProduto = async () => {
      try {
        const dados = await buscarPorId(id);
        setProduto({
          ...dados,
          categoria: dados.categoria || { id: "" },
          fornecedor: dados.fornecedor || { id: "" },
          tipoFoto: dados.tipoFoto || "",
          nomeFoto: dados.nomeFoto || "",
          foto: dados.foto ? `data:${dados.tipoFoto};base64,${dados.foto}` : "",
        });
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
        setErro("Erro ao carregar dados do produto.");
      }
    };

    fetchDados();
    fetchProduto();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "categoriaId") {
      setProduto((prev) => ({ ...prev, categoria: { id: value } }));
    } else if (name === "fornecedorId") {
      setProduto((prev) => ({ ...prev, fornecedor: { id: value } }));
    } else if (name === "disponivel") {
      setProduto((prev) => ({ ...prev, disponivel: value === "true" }));
    } else {
      setProduto((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(",")[1];

        setProduto((prev) => ({
          ...prev,
          fotoBase64Arquivo: file, // se quiser guardar o File, opcional
          foto: `data:${file.type};base64,${base64String}`,
          nomeFoto: file.name,
          tipoFoto: file.type,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    if (!produto.nome || !produto.preco) {
      setErro("Nome e preço são obrigatórios.");
      return;
    }

    try {
      setCarregando(true);

      const base64SemPrefixo = produto.foto?.split(",")[1] || "";

      const produtoParaEnviar = {
        id: produto.id,
        nome: produto.nome,
        descricao: produto.descricao,
        quantidade: Number(produto.quantidade),
        disponivel: produto.disponivel,
        preco: Number(produto.preco),
        tipoFoto: produto.tipoFoto || "",
        nomeFoto: produto.nomeFoto || "",
        foto: base64SemPrefixo,
        dataValidade: ajustarData(produto.dataValidade),
        categoria:
          categorias.find((cat) => cat.id === Number(produto.categoria.id)) || { id: Number(produto.categoria.id) },
        fornecedor:
          fornecedores.find((forn) => forn.id === Number(produto.fornecedor.id)) || { id: Number(produto.fornecedor.id) },
      };

      const response = await editarProduto(id, produtoParaEnviar);

      if (produto.fotoBase64Arquivo) {
        await enviarFotoProduto(id, produto.fotoBase64Arquivo);
      }

      if (response) {
        setSucesso(true);
        setTimeout(() => navigate("/produtos"), 1500);
      } else {
        setErro("Erro ao atualizar produto.");
      }
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      setErro("Erro ao atualizar produto. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  const styles = {
    container: { mt: 4, mb: 4, px: isSmallScreen ? 2 : 4 },
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
    label: {
      fontWeight: 500,
      fontSize: "0.95rem",
      color: "rgb(102, 102, 102)",
      marginBottom: "0.3rem",
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
          sx={{ color: "#6a1b9a", fontWeight: "bold" }}
        >
          Editar Produto 🛠️
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Coluna Esquerda */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ color: "#6a1b9a" }}>
                Dados Básicos
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Typography variant="subtitle2" sx={{ mb: 0.5, color: "rgb(102, 102, 102)" }}>Nome</Typography>
              <TextField
                name="nome"
                value={produto.nome}
                onChange={handleChange}
                fullWidth
                size="small"
                required
                sx={{ mb: 1.5 }}
                label={null}
              />

              <Typography variant="subtitle2" sx={{ mb: 0.5, color: "rgb(102, 102, 102)" }}>Descrição</Typography>
              <TextField
                name="descricao"
                value={produto.descricao}
                onChange={handleChange}
                fullWidth
                size="small"
                required
                sx={{ mb: 1.5 }}
                label={null}
              />

              <Typography variant="subtitle2" sx={{ mb: 0.5, color: "rgb(102, 102, 102)" }}>Quantidade</Typography>
              <TextField
                name="quantidade"
                type="number"
                value={produto.quantidade}
                onChange={handleChange}
                fullWidth
                size="small"
                required
                sx={{ mb: 1.5 }}
                label={null}
              />

              <Typography variant="subtitle2" sx={{ mb: 0.5, color: "rgb(102, 102, 102)" }}>Preço</Typography>
              <TextField
                name="preco"
                type="number"
                value={produto.preco}
                onChange={handleChange}
                fullWidth
                size="small"
                required
                inputProps={{ step: "0.01" }}
                sx={{ mb: 1.5 }}
                label={null}
              />

              <Typography variant="subtitle2" sx={{ mb: 0.5, color: "rgb(102, 102, 102)" }}>Data de Validade</Typography>
              <TextField
                name="dataValidade"
                type="date"
                value={produto.dataValidade ? produto.dataValidade.slice(0, 10) : ""}
                onChange={handleChange}
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
                label={null}
              />
            </Grid>

            {/* Coluna Direita */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ color: "#6a1b9a" }}>
                Informações Adicionais
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Typography variant="subtitle2" sx={{ mb: 0.5, color: "rgb(102, 102, 102)" }}>
                Foto
              </Typography>
              <TextField
                type="file"
                name="foto"
                onChange={handleFotoChange}
                fullWidth
                size="small"
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    "& fieldset": { borderColor: "#c2c2c2" },
                    "&:hover fieldset": { borderColor: "#6a1b9a" },
                    "&.Mui-focused fieldset": { borderColor: "#6a1b9a" },
                  },
                }}
                InputLabelProps={{ shrink: true }}
                label={null}
              />
              {produto.foto && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="caption" color="text.secondary">Imagem atual:</Typography>
                  <Box
                    component="img"
                    src={produto.foto}
                    alt="Foto atual"
                    sx={{
                      maxWidth: 70,
                      maxHeight: 70,
                      width: "auto",
                      height: "auto",
                      borderRadius: 2,
                      mt: 1,
                      objectFit: "contain",
                      boxShadow: "0 0 5px rgba(0,0,0,0.1)"
                    }}
                  />
                </Box>
              )}


              <Typography variant="subtitle2" sx={{ mb: 0.5, color: "rgb(102, 102, 102)" }}>Categoria</Typography>
              <TextField
                select
                fullWidth
                name="categoriaId"
                value={produto.categoria?.id || ""}
                onChange={handleChange}
                required
                size="small"
                sx={{ mb: 1.5 }}
                label={null}
              >
                {categorias.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.nome}
                  </MenuItem>
                ))}
              </TextField>

              <Typography variant="subtitle2" sx={{ mb: 0.5, color: "rgb(102, 102, 102)" }}>Fornecedor</Typography>
              <TextField
                select
                fullWidth
                name="fornecedorId"
                value={produto.fornecedor?.id || ""}
                onChange={handleChange}
                required
                size="small"
                sx={{ mb: 1.5 }}
                label={null}
              >
                {fornecedores.map((forn) => (
                  <MenuItem key={forn.id} value={forn.id}>
                    {forn.nome}
                  </MenuItem>
                ))}
              </TextField>

              <Typography variant="subtitle2" sx={{ mb: 0.5, color: "rgb(102, 102, 102)" }}>Disponível</Typography>
              <TextField
                select
                fullWidth
                name="disponivel"
                value={produto.disponivel ? "true" : "false"}
                onChange={handleChange}
                size="small"
                sx={{ mb: 2 }}
                label={null}
              >
                <MenuItem value="true">Sim</MenuItem>
                <MenuItem value="false">Não</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          {/* Botões */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button startIcon={<ArrowBackIcon />} variant="outlined" color="secondary" onClick={() => navigate(-1)}>Voltar</Button>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="outlined" color="secondary" onClick={() => navigate("/produtos")} disabled={carregando}>Cancelar</Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ bgcolor: "#6a1b9a", "&:hover": { bgcolor: "#4a148c" } }}
                disabled={carregando}
              >
                {carregando ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </Box>
          </Box>
        </form>

        <Snackbar open={!!erro} autoHideDuration={6000} onClose={() => setErro("")} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
          <Alert onClose={() => setErro("")} severity="error" sx={{ width: "100%" }}>{erro}</Alert>
        </Snackbar>

        <Snackbar open={sucesso} autoHideDuration={6000} onClose={() => setSucesso(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
          <Alert onClose={() => setSucesso(false)} severity="success" sx={{ width: "100%" }}>Produto atualizado com sucesso!</Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
}

function ajustarData(data) {
  if (!data) return null;
  if (data.includes("T")) return data;
  return data + "T00:00:00";
}

export default EditarProduto;
