import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container, Typography, TextField, Button, Grid, Paper, Box,
  Snackbar, Alert, useTheme, useMediaQuery, MenuItem
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { buscarPorId, editarProduto } from "../../api/produtos";
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
    linkFoto: ""
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

  const handleSubmit = async (e) => {
    
    e.preventDefault();
      console.log("Tentando editar produto com id:", id);
  console.log("Dados que serão enviados:", produto);
    setErro("");
    if (!produto.nome || !produto.preco) {
      setErro("Nome e preço são obrigatórios.");
      return;
    }

    try {
      setCarregando(true);

const produtoParaEnviar = {
  id: produto.id,
  nome: produto.nome,
  descricao: produto.descricao,
  quantidade: Number(produto.quantidade),  // Certifique que é número
  disponivel: produto.disponivel,
  preco: Number(produto.preco),            // Também número
  linkFoto: produto.linkFoto,
  dataValidade: ajustarData(produto.dataValidade),
  categoria: categorias.find(cat => cat.id === Number(produto.categoria.id)) || { id: Number(produto.categoria.id) },
  fornecedor: fornecedores.find(forn => forn.id === Number(produto.fornecedor.id)) || { id: Number(produto.fornecedor.id) }
};


      const response = await editarProduto(id, produtoParaEnviar);

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
    <Container maxWidth="md" sx={styles.container}>
      <Paper elevation={3} sx={styles.paper}>
        <Box sx={styles.header}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/produtos")}
            sx={styles.backButton}
          >
            Voltar
          </Button>
          <Typography variant="h5">Editar Produto - {produto.nome || "..."}</Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField fullWidth label="Nome" name="nome" value={produto.nome} onChange={handleChange} required sx={styles.textField} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Descrição" name="descricao" value={produto.descricao} onChange={handleChange} required sx={styles.textField} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Quantidade" name="quantidade" type="number" value={produto.quantidade} onChange={handleChange} required sx={styles.textField} />
            </Grid>
            <Grid item xs={12}>
              <TextField select fullWidth label="Disponível" name="disponivel" value={produto.disponivel ? "true" : "false"} onChange={handleChange} sx={styles.textField}>
                <MenuItem value="true">Sim</MenuItem>
                <MenuItem value="false">Não</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Preço" name="preco" type="number" value={produto.preco} onChange={handleChange} required sx={styles.textField} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Data de Validade" name="dataValidade" type="date" value={produto.dataValidade ? new Date(produto.dataValidade).toISOString().slice(0, 10) : ""} onChange={handleChange} InputLabelProps={{ shrink: true }} sx={styles.textField} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Link da Foto" name="linkFoto" value={produto.linkFoto || ""} onChange={handleChange} sx={styles.textField} />
            </Grid>
            <Grid item xs={12}>
              <TextField select fullWidth label="Categoria" name="categoriaId" value={produto.categoria?.id || ""} onChange={handleChange} required sx={styles.textField}>
                {categorias.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.nome}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField select fullWidth label="Fornecedor" name="fornecedorId" value={produto.fornecedor?.id || ""} onChange={handleChange} required sx={styles.textField}>
                {fornecedores.map((forn) => (
                  <MenuItem key={forn.id} value={forn.id}>
                    {forn.nome}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
              <Button variant="contained" type="submit" disabled={carregando} sx={styles.button}>
                {carregando ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </Grid>
          </Grid>
        </form>

        {/* Feedbacks */}
        <Snackbar open={!!erro} autoHideDuration={6000} onClose={() => setErro("")} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
          <Alert onClose={() => setErro("")} severity="error" sx={{ width: "100%" }}>
            {erro}
          </Alert>
        </Snackbar>

        <Snackbar open={sucesso} autoHideDuration={6000} onClose={() => setSucesso(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
          <Alert onClose={() => setSucesso(false)} severity="success" sx={{ width: "100%" }}>
            Produto atualizado com sucesso!
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
}

function ajustarData(data) {
  if (!data) return null;
  if (data.includes("T")) return data;
  return data + "T00:00:00";
}

export default EditarProduto;
