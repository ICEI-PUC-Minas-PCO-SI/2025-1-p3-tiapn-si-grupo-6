import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Autocomplete } from "@mui/material";
import { Pencil } from "lucide-react";
import { criarPedido } from "../../api/pedidos";
import { listarFornecedores } from "../../api/fornecedores";
import {
  TextField,
  Button,
  Snackbar,
  Alert,
  Paper,
  Typography,
  Box,
  Grid,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CadastroPedido() {
  const navigate = useNavigate();

  const [pedido, setPedido] = useState({
    fornecedor: "",
    numero: "",
    data: "",
    total: 0,
    status: "Não atendido",
    produtos: [],
    cnpj: "",
    contato: "",
    responsavel: "",
  });

  const [item, setItem] = useState({
    nome: "",
    codigo: "",
    valorUnitario: "",
    quantidade: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [fornecedores, setFornecedores] = useState([]);

  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const dados = await listarFornecedores();
        setFornecedores(dados);
      } catch (error) {
        console.error("Erro ao buscar fornecedores", error);
      }
    };
    fetchFornecedores();
  }, []);

  const handlePedidoChange = (e) => {
    const { name, value } = e.target;
    setPedido({ ...pedido, [name]: value });
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const adicionarItem = () => {
    const { nome, codigo, valorUnitario, quantidade } = item;

    if (!nome || !codigo || !valorUnitario || !quantidade) {
      setSnackbar({
        open: true,
        message: "Preencha todos os campos do item corretamente!",
        severity: "warning",
      });
      return;
    }

    const qtd = Number(quantidade);
    const valor = Number(valorUnitario);

    if (isNaN(qtd) || isNaN(valor) || qtd <= 0 || valor <= 0) {
      setSnackbar({
        open: true,
        message: "Quantidade e valor devem ser números positivos!",
        severity: "warning",
      });
      return;
    }

    const novoItem = {
      ...item,
      valorUnitario: valor,
      quantidade: qtd,
      total: qtd * valor,
    };

    const novosProdutos = [...pedido.produtos, novoItem];
    const novoTotal = novosProdutos.reduce(
      (acc, curr) => acc + Number(curr.total),
      0
    );

    setPedido({ ...pedido, produtos: novosProdutos, total: novoTotal });
    setItem({ nome: "", codigo: "", valorUnitario: "", quantidade: "" });
  };

  const removerItem = (index) => {
    const novosProdutos = [...pedido.produtos];
    novosProdutos.splice(index, 1);

    const novoTotal = novosProdutos.reduce(
      (acc, curr) => acc + Number(curr.total),
      0
    );

    setPedido({ ...pedido, produtos: novosProdutos, total: novoTotal });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pedido.fornecedor) {
      setSnackbar({
        open: true,
        message: "Selecione um fornecedor antes de salvar!",
        severity: "warning",
      });
      return;
    }

    if (pedido.produtos.length === 0) {
      setSnackbar({
        open: true,
        message: "Adicione pelo menos um item ao pedido!",
        severity: "warning",
      });
      return;
    }

    try {
      await criarPedido(pedido);
      setSnackbar({
        open: true,
        message: "Pedido cadastrado com sucesso!",
        severity: "success",
      });
      navigate("/pedidos");
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Erro ao cadastrar pedido.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 1200, margin: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        🛒 Montar Pedido de Compra
      </Typography>

      {/* Dados do Fornecedor */}
      <Box sx={{ mb: 3 }}>
        <Autocomplete
          options={fornecedores}
          getOptionLabel={(option) => option.nome}
          onChange={(event, newValue) => {
            setPedido({
              ...pedido,
              fornecedor: newValue ? newValue.nome : "",
              cnpj: newValue ? newValue.cnpj : "",
              contato: newValue ? newValue.telefone : "",
              responsavel: newValue ? newValue.responsavel : "",
            });
          }}
          renderInput={(params) => (
            <TextField {...params} label="Fornecedor" fullWidth />
          )}
        />

        {pedido.fornecedor && (
          <Typography sx={{ mt: 1 }}>
            Nome: {pedido.fornecedor} - CNPJ: {pedido.cnpj}
            <br />
            Responsável: {pedido.responsavel}
            <br />
            Contato: {pedido.contato}
          </Typography>
        )}
      </Box>

      {/* Buscar Item */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="h6">Buscar Item</Typography>
          <IconButton
            color="primary"
            onClick={() => navigate("/editarproduto")}
          >
            <Pencil />
          </IconButton>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Nome"
              name="nome"
              value={item.nome}
              onChange={handleItemChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3} md={2}>
            <TextField
              label="Código Item"
              name="codigo"
              value={item.codigo}
              onChange={handleItemChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3} md={2}>
            <TextField
              label="Valor referência (Un)"
              name="valorUnitario"
              value={item.valorUnitario}
              onChange={handleItemChange}
              type="number"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3} md={2}>
            <TextField
              label="Quantidade"
              name="quantidade"
              value={item.quantidade}
              onChange={handleItemChange}
              type="number"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3} md={2}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ height: "100%" }}
              onClick={adicionarItem}
              disabled={
                !item.nome ||
                !item.codigo ||
                Number(item.valorUnitario) <= 0 ||
                Number(item.quantidade) <= 0
              }
            >
              Adicionar
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabela de Produtos */}
      {pedido.produtos.length > 0 && (
        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Produto</TableCell>
                <TableCell>Código</TableCell>
                <TableCell>Quantidade</TableCell>
                <TableCell>Preço Unitário</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pedido.produtos.map((prod, index) => (
                <TableRow key={index}>
                  <TableCell>{prod.nome}</TableCell>
                  <TableCell>{prod.codigo}</TableCell>
                  <TableCell>{prod.quantidade}</TableCell>
                  <TableCell>
                    R$ {Number(prod.valorUnitario).toFixed(2)}
                  </TableCell>
                  <TableCell>R$ {Number(prod.total).toFixed(2)}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => navigate("/editarproduto")}
                    >
                      <Pencil />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => removerItem(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pedido */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="h6">Pedido de Compra</Typography>
          <IconButton color="primary" onClick={() => navigate("/editarpedido")}>
            <Pencil />
          </IconButton>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Número"
              name="numero"
              value={pedido.numero}
              onChange={handlePedidoChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Data"
              name="data"
              type="date"
              value={pedido.data}
              onChange={handlePedidoChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Total"
              name="total"
              value={pedido.total.toFixed(2)}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Status"
              name="status"
              select
              value={pedido.status}
              onChange={handlePedidoChange}
              fullWidth
            >
              <MenuItem value="Não atendido">Não atendido</MenuItem>
              <MenuItem value="Atendido">Atendido</MenuItem>
              <MenuItem value="Cancelado">Cancelado</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {/* Botões */}
      <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/pedidos")}
        >
          Consultar pedidos
        </Button>
        <Button
          variant="contained"
          type="submit"
          onClick={handleSubmit}
          disabled={!pedido.fornecedor || pedido.produtos.length === 0}
        >
          Salvar pedido
        </Button>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Voltar
        </Button>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
