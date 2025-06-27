import React, { useState, useEffect } from "react";
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
  MenuItem,
  IconButton,
  InputAdornment,
  CircularProgress,
  Chip
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  AttachMoney as AttachMoneyIcon,
  Person as PersonIcon,
  Description as DescriptionIcon,
  ShoppingCart as ShoppingCartIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";

function CadastrarVenda() {
  const navigate = useNavigate();


  const [venda, setVenda] = useState({
    observacoes: "",
    clienteId: "",
  });
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [itens, setItens] = useState([{ produtoId: "", quantidade: 1 }]);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);


  const themeColors = {
    primary: '#6a1b9a',
    primaryLight: '#f3e5f5',
    primaryDark: '#4a148c',
    textOnPrimary: '#ffffff'
  };


  useEffect(() => {
    const buscarDados = async () => {
      try {
        const [resProdutos, resClientes] = await Promise.all([
          api.get("/produtos"),
          api.get("/clientes/ativos")
        ]);
        setProdutos(resProdutos.data);
        setClientes(resClientes.data);
      } catch (err) {
        setErro("Erro ao carregar dados iniciais");
      }
    };
    buscarDados();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenda(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const novosItens = [...itens];
    novosItens[index][field] = value;
    setItens(novosItens);
  };

  const adicionarItem = () => {
    setItens(prev => [...prev, { produtoId: "", quantidade: 1 }]);
  };

  const removerItem = (index) => {
    if (itens.length > 1) {
      setItens(prev => prev.filter((_, i) => i !== index));
    }
  };

  const calcularValorTotal = () => {
    return itens.reduce((total, item) => {
      const produto = produtos.find(p => p.id === parseInt(item.produtoId));
      return total + (produto?.preco || 0) * (parseInt(item.quantidade) || 0);
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso(false);
    setCarregando(true);

    try {
      const payload = {
        ...venda,
        valorTotal: calcularValorTotal(),
        clienteId: venda.clienteId ? parseInt(venda.clienteId) : null,
        itens: itens
          .filter(item => item.produtoId && item.quantidade > 0)
          .map(item => ({
            produtoId: parseInt(item.produtoId),
            quantidade: parseInt(item.quantidade),
            precoUnitario: produtos.find(p => p.id === parseInt(item.produtoId))?.preco || 0,
          })),
      };

      await api.post("/vendas", payload);
      setSucesso(true);
      setVenda({ observacoes: "", clienteId: "" });
      setItens([{ produtoId: "", quantidade: 1 }]);
    } catch (err) {
      setErro(err.response?.data?.message || "Erro ao cadastrar venda");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        p: { xs: 2, md: 4 },
        bgcolor: "#f5f5f5"
      }}
    >
      <Paper
        sx={{
          width: "100%",
          maxWidth: 800,
          p: { xs: 2, md: 4 },
          borderRadius: 2,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          bgcolor: "background.paper"
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <IconButton onClick={() => navigate(-1)} sx={{ mr: 2, color: themeColors.primary }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" sx={{ fontWeight: 600, color: themeColors.primary }}>
            <ShoppingCartIcon sx={{ verticalAlign: "middle", mr: 1 }} />
            Nova Venda
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Cliente"
                name="clienteId"
                select
                value={venda.clienteId}
                onChange={handleChange}
                variant="outlined"
                size="medium"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: themeColors.primary }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: themeColors.primary,
                  }
                }}
              >
                <MenuItem value="">
                  <em>Selecione um cliente</em>
                </MenuItem>
                {clientes.map(cliente => (
                  <MenuItem key={cliente.id} value={cliente.id}>
                    {cliente.nome}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Observações"
                name="observacoes"
                value={venda.observacoes}
                onChange={handleChange}
                variant="outlined"
                size="medium"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon sx={{ color: themeColors.primary }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: themeColors.primary,
                  }
                }}
              />
            </Grid>
          </Grid>
          <Box sx={{ mb: 3 }}>
            <Divider sx={{ mb: 2 }}>
              <Chip 
                label="Produtos" 
                sx={{ 
                  bgcolor: themeColors.primaryLight, 
                  color: themeColors.primary,
                  fontWeight: 500
                }} 
              />
            </Divider>
            
            {itens.map((item, index) => (
              <Grid
                container
                spacing={2}
                key={index}
                sx={{ mb: 2, alignItems: "center" }}
              >
                <Grid item xs={12} sm={7} md={8}>
                  <TextField
                    select
                    label="Produto"
                    name="produtoId"
                    value={item.produtoId}
                    onChange={(e) => handleItemChange(index, "produtoId", e.target.value)}
                    fullWidth
                    variant="outlined"
                    size="medium"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                      "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: themeColors.primary,
                      }
                    }}
                  >
                    <MenuItem value="">
                      <em>Selecione um produto</em>
                    </MenuItem>
                    {produtos.map(p => (
                      <MenuItem key={p.id} value={p.id}>
                        {p.nome} - R$ {p.preco.toFixed(2)}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={8} sm={3} md={2}>
                  <TextField
                    label="Quantidade"
                    name="quantidade"
                    type="number"
                    value={item.quantidade}
                    onChange={(e) => handleItemChange(index, "quantidade", e.target.value)}
                    fullWidth
                    variant="outlined"
                    size="medium"
                    inputProps={{ min: 1 }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                      "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: themeColors.primary,
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={4} sm={2} md={2} sx={{ textAlign: "center" }}>
                  <IconButton 
                    onClick={() => removerItem(index)}
                    disabled={itens.length <= 1}
                    sx={{
                      bgcolor: itens.length <= 1 ? '#e0e0e0' : themeColors.primaryLight,
                      color: itens.length <= 1 ? '#9e9e9e' : themeColors.primary,
                      "&:hover": { 
                        bgcolor: itens.length <= 1 ? '#e0e0e0' : themeColors.primaryDark,
                        color: themeColors.textOnPrimary
                      },
                      borderRadius: 2,
                      p: 1.5
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}

            <Button
              onClick={adicionarItem}
              startIcon={<AddIcon />}
              variant="outlined"
              sx={{
                mt: 1,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 500,
                color: themeColors.primary,
                borderColor: themeColors.primary,
                "&:hover": {
                  bgcolor: themeColors.primaryLight,
                  borderColor: themeColors.primaryDark
                }
              }}
            >
              Adicionar produto
            </Button>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: themeColors.primaryLight,
                borderRadius: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: `1px solid ${themeColors.primary}`
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, color: themeColors.primary }}>
                Valor Total:
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, color: themeColors.primary }}>
                <AttachMoneyIcon sx={{ verticalAlign: "text-top" }} />
                {calcularValorTotal().toFixed(2)}
              </Typography>
            </Paper>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => navigate(-1)}
              sx={{
                borderRadius: 2,
                px: 4,
                textTransform: "none",
                fontWeight: 500,
                color: themeColors.primary,
                borderColor: themeColors.primary,
                "&:hover": {
                  bgcolor: themeColors.primaryLight,
                  borderColor: themeColors.primaryDark
                }
              }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={carregando}
              sx={{
                borderRadius: 2,
                px: 4,
                textTransform: "none",
                fontWeight: 500,
                minWidth: 120,
                bgcolor: themeColors.primary,
                "&:hover": {
                  bgcolor: themeColors.primaryDark
                }
              }}
            >
              {carregando ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Finalizar Venda"
              )}
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
        <Alert severity="error" onClose={() => setErro("")} sx={{ width: "100%" }}>
          {erro}
        </Alert>
      </Snackbar>

      <Snackbar
        open={sucesso}
        autoHideDuration={4000}
        onClose={() => setSucesso(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert 
          severity="success" 
          onClose={() => setSucesso(false)} 
          sx={{ 
            width: "100%",
            bgcolor: themeColors.primary,
            color: themeColors.textOnPrimary
          }}
        >
          Venda cadastrada com sucesso!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CadastrarVenda;