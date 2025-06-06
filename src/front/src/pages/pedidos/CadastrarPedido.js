import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Autocomplete,
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
import { Pencil } from "lucide-react";
import DeleteIcon from "@mui/icons-material/Delete";
import { criarPedido } from "../../api/pedidos";
import { listarFornecedores } from "../../api/fornecedores";

const STATUS_OPTIONS = ["Não atendido", "Atendido", "Cancelado"];

const INITIAL_ITEM_STATE = {
  nome: "",
  codigo: "",
  valorUnitario: "",
  quantidade: "",
};

export default function CadastroPedido() {
  const navigate = useNavigate();

  const [pedido, setPedido] = useState({
    fornecedor: "",
    numero: "",
    data: new Date().toISOString().split("T")[0],
    total: 0,
    status: STATUS_OPTIONS[0],
    produtos: [],
    cnpj: "",
    contato: "",
    responsavel: "",
  });

  const [item, setItem] = useState(INITIAL_ITEM_STATE);

  const [fornecedores, setFornecedores] = useState([]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Busca fornecedores uma única vez
  useEffect(() => {
    (async () => {
      try {
        const dados = await listarFornecedores();
        setFornecedores(dados);
      } catch (error) {
        console.error("Erro ao buscar fornecedores", error);
        showSnackbar("Erro ao buscar fornecedores.", "error");
      }
    })();
  }, []);

  // Função para mostrar snackbar
  const showSnackbar = useCallback((message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  }, []);

  // Atualiza campos do pedido (exceto produtos e total)
  const handlePedidoChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setPedido((prev) => ({ ...prev, [name]: value }));
    },
    [setPedido]
  );

  // Atualiza campos do item
  const handleItemChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setItem((prev) => ({ ...prev, [name]: value }));
    },
    [setItem]
  );

  // Adiciona item ao pedido
  const adicionarItem = useCallback(() => {
    const { nome, codigo, valorUnitario, quantidade } = item;

    if (!nome.trim() || !codigo.trim() || !valorUnitario || !quantidade) {
      showSnackbar("Preencha todos os campos do item corretamente!", "warning");
      return;
    }

    const qtd = Number(quantidade);
    const valor = Number(valorUnitario);

    if (isNaN(qtd) || isNaN(valor) || qtd <= 0 || valor <= 0) {
      showSnackbar(
        "Quantidade e valor devem ser números positivos!",
        "warning"
      );
      return;
    }

    const novoItem = {
      nome: nome.trim(),
      codigo: codigo.trim(),
      valorUnitario: valor,
      quantidade: qtd,
      total: valor * qtd,
    };

    setPedido((prev) => {
      const novosProdutos = [...prev.produtos, novoItem];
      const novoTotal = novosProdutos.reduce(
        (acc, curr) => acc + curr.total,
        0
      );
      return { ...prev, produtos: novosProdutos, total: novoTotal };
    });

    setItem(INITIAL_ITEM_STATE);
  }, [item, showSnackbar]);

  // Remove item da lista pelo índice
  const removerItem = useCallback(
    (index) => {
      setPedido((prev) => {
        const novosProdutos = prev.produtos.filter((_, i) => i !== index);
        const novoTotal = novosProdutos.reduce(
          (acc, curr) => acc + curr.total,
          0
        );
        return { ...prev, produtos: novosProdutos, total: novoTotal };
      });
    },
    [setPedido]
  );

  // Submissão do pedido
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!pedido.fornecedor) {
        showSnackbar("Selecione um fornecedor antes de salvar!", "warning");
        return;
      }

      if (pedido.produtos.length === 0) {
        showSnackbar("Adicione pelo menos um item ao pedido!", "warning");
        return;
      }

      try {
        await criarPedido(pedido);
        showSnackbar("Pedido cadastrado com sucesso!", "success");
        navigate("/pedidos");
      } catch (error) {
        console.error("Erro ao cadastrar pedido", error);
        showSnackbar("Erro ao cadastrar pedido.", "error");
      }
    },
    [pedido, navigate, showSnackbar]
  );

  const handleCloseSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  // Atualiza dados do fornecedor selecionado no Autocomplete
  const handleFornecedorChange = useCallback(
    (_, newFornecedor) => {
      if (!newFornecedor) {
        setPedido((prev) => ({
          ...prev,
          fornecedor: "",
          cnpj: "",
          contato: "",
          responsavel: "",
        }));
        return;
      }
      setPedido((prev) => ({
        ...prev,
        fornecedor: newFornecedor.nome,
        cnpj: newFornecedor.cnpj,
        contato: newFornecedor.telefone,
        responsavel: newFornecedor.responsavel,
      }));
    },
    [setPedido]
  );

  return (
    <Paper sx={{ p: 4, maxWidth: 1200, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        🛒 Montar Pedido de Compra
      </Typography>

      {/* Dados do Fornecedor */}
      <Box sx={{ mb: 3 }}>
        <Autocomplete
          options={fornecedores}
          getOptionLabel={(option) => option.nome || ""}
          onChange={handleFornecedorChange}
          isOptionEqualToValue={(option, value) => option.nome === value.nome}
          renderInput={(params) => (
            <TextField {...params} label="Fornecedor" fullWidth />
          )}
          clearOnEscape
        />

        {pedido.fornecedor && (
          <Typography sx={{ mt: 1 }} component="div" aria-live="polite">
            <strong>Nome:</strong> {pedido.fornecedor} — <strong>CNPJ:</strong>{" "}
            {pedido.cnpj}
            <br />
            <strong>Responsável:</strong> {pedido.responsavel}
            <br />
            <strong>Contato:</strong> {pedido.contato}
          </Typography>
        )}
      </Box>

      {/* Buscar Item */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
          alignItems="center"
        >
          <Typography variant="h6">Buscar Item</Typography>
          <IconButton
            color="primary"
            aria-label="Editar produto"
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
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sm={3} md={2}>
            <TextField
              label="Código Item"
              name="codigo"
              value={item.codigo}
              onChange={handleItemChange}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sm={3} md={2}>
            <TextField
              label="Valor referência (Un)"
              name="valorUnitario"
              value={item.valorUnitario}
              onChange={handleItemChange}
              type="number"
              inputProps={{ min: 0, step: 0.01 }}
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
              inputProps={{ min: 0, step: 1 }}
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
                !item.nome.trim() ||
                !item.codigo.trim() ||
                Number(item.valorUnitario) <= 0 ||
                Number(item.quantidade) <= 0
              }
              aria-label="Adicionar item ao pedido"
            >
              Adicionar
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabela de Produtos */}
      {pedido.produtos.length > 0 && (
        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table aria-label="Tabela de produtos adicionados">
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
                <TableRow key={`${prod.codigo}-${index}`}>
                  <TableCell>{prod.nome}</TableCell>
                  <TableCell>{prod.codigo}</TableCell>
                  <TableCell>{prod.quantidade}</TableCell>
                  <TableCell>R$ {prod.valorUnitario.toFixed(2)}</TableCell>
                  <TableCell>R$ {prod.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      aria-label={`Editar produto ${prod.nome}`}
                      onClick={() => navigate("/editarproduto")}
                    >
                      <Pencil />
                    </IconButton>
                    <IconButton
                      color="error"
                      aria-label={`Remover produto ${prod.nome}`}
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
          <IconButton
            color="primary"
            aria-label="Editar pedido"
            onClick={() => navigate("/editarpedido")}
          >
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
              autoComplete="off"
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
              aria-readonly="true"
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
              {STATUS_OPTIONS.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
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
          aria-disabled={!pedido.fornecedor || pedido.produtos.length === 0}
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
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          elevation={6}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
