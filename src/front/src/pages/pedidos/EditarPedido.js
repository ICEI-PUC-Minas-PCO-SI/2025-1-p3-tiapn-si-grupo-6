  import React, { useEffect, useState, useCallback } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  import {
    TextField,
    Button,
    Snackbar,
    Alert,
    MenuItem,
    Typography,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    IconButton,
  } from "@mui/material";
  import DeleteIcon from "@mui/icons-material/Delete";
  import {
    buscarPedidoPorId,
    editarPedido,
    buscarFornecedoresParaPedido,
  } from "../../api/pedidos";
  import Autocomplete from "@mui/material/Autocomplete";

  const STATUS_OPTIONS = ["Não atendido", "Atendido", "Cancelado"];

  const EditarPedido = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [pedido, setPedido] = useState({
      fornecedor: null,
      data: "",
      status: STATUS_OPTIONS[0],
      produtos: [],
      total: 0,
    });

    const [fornecedores, setFornecedores] = useState([]);
    const [snackbar, setSnackbar] = useState({
      open: false,
      message: "",
      severity: "success",
    });

    // Carregar fornecedores e pedido
    useEffect(() => {
      const carregarDados = async () => {
        try {
          const fornecedoresData = await buscarFornecedoresParaPedido();
          setFornecedores(fornecedoresData);

          const dados = await buscarPedidoPorId(id);
          console.log("🔎 Pedido carregado do backend:", dados); 
          setPedido({
            fornecedor: dados.fornecedor || null,
            data: dados.data ? dados.data.split("T")[0] : "",
            status: dados.status || STATUS_OPTIONS[0],
            produtos: dados.itens || [], // <-- Aqui é o ponto principal
            total: dados.total || 0,
          });
        } catch (error) {
          setSnackbar({
            open: true,
            message: "Erro ao carregar dados",
            severity: "error",
          });
        }
      };

      carregarDados();
    }, [id]);

    const handleChange = useCallback((e) => {
      const { name, value } = e.target;
      setPedido((prev) => ({ ...prev, [name]: value }));
    }, []);

    const removerProduto = useCallback((index) => {
      setPedido((prev) => {
        const novosProdutos = prev.produtos.filter((_, i) => i !== index);
        const novoTotal = novosProdutos.reduce(
          (acc, item) => acc + item.valorUnitario * item.quantidade,
          0
        );
        return { ...prev, produtos: novosProdutos, total: novoTotal };
      });
    }, []);

    const handleProdutoChange = useCallback((index, field, value) => {
      setPedido((prev) => {
        const novosProdutos = [...prev.produtos];
        novosProdutos[index] = {
          ...novosProdutos[index],
          [field]: Number(value),
        };
        const novoTotal = novosProdutos.reduce(
          (acc, item) => acc + item.valorUnitario * item.quantidade,
          0
        );
        return { ...prev, produtos: novosProdutos, total: novoTotal };
      });
    }, []);

    const handleSalvar = async () => {
      try {
        const dadosParaSalvar = {
          fornecedorId: pedido.fornecedor?.id,
          data: pedido.data,
          status: pedido.status,
          itens: pedido.produtos.map((item) => ({
            produtoId: item.produtoId || item.produto?.id,
            quantidade: item.quantidade,
            valorUnitario: item.valorUnitario,
          })),
        };

        await editarPedido(id, dadosParaSalvar);

        setSnackbar({
          open: true,
          message: "Pedido atualizado com sucesso!",
          severity: "success",
        });

        setTimeout(() => navigate("/pedidos"), 1500);
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Erro ao atualizar pedido",
          severity: "error",
        });
      }
    };

    const handleCloseSnackbar = () => {
      setSnackbar((prev) => ({ ...prev, open: false }));
    };

    return (
      <div
        style={{
          padding: "1.5rem",
          backgroundColor: "#f3f4f6",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "1.5rem",
            maxWidth: "900px",
            margin: "0 auto",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Editar Pedido - ID {id}
          </Typography>

          {/* Autocomplete Fornecedor */}
          <Autocomplete
            options={fornecedores}
            getOptionLabel={(option) => option.nome || ""}
            value={pedido.fornecedor}
            onChange={(_, newValue) =>
              setPedido((prev) => ({ ...prev, fornecedor: newValue }))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Fornecedor"
                margin="normal"
                fullWidth
              />
            )}
          />

          <TextField
            label="Data"
            name="data"
            type="date"
            value={pedido.data}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            select
            label="Status"
            name="status"
            value={pedido.status}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            {STATUS_OPTIONS.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>

          <Typography variant="h6" sx={{ mt: 3 }}>
            Itens do Pedido
          </Typography>

          {pedido.produtos.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Nenhum item no pedido.
            </Typography>
          ) : (
            <Paper variant="outlined" sx={{ mt: 1, overflowX: "auto" }}>
              <Table size="small" aria-label="Itens do pedido">
                <TableHead>
                  <TableRow>
                    <TableCell>Produto</TableCell>
                    <TableCell align="right">Quantidade</TableCell>
                    <TableCell align="right">Preço Unitário</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="center">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pedido.produtos.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.nome || "Produto"}</TableCell>
                      <TableCell align="right">
                        <TextField
                          type="number"
                          value={item.quantidade}
                          onChange={(e) =>
                            handleProdutoChange(
                              index,
                              "quantidade",
                              e.target.value
                            )
                          }
                          inputProps={{ min: 1 }}
                          size="small"
                          sx={{ maxWidth: 100 }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          type="number"
                          value={item.valorUnitario}
                          onChange={(e) =>
                            handleProdutoChange(
                              index,
                              "valorUnitario",
                              e.target.value
                            )
                          }
                          inputProps={{ min: 0, step: "0.01" }}
                          size="small"
                          sx={{ maxWidth: 120 }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        R$ {(item.valorUnitario * item.quantidade).toFixed(2)}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="error"
                          onClick={() => removerProduto(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          )}

          <Typography variant="h6" sx={{ mt: 3 }}>
            Total do Pedido: R$ {pedido.total.toFixed(2)}
          </Typography>

          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
            <Button variant="contained" color="primary" onClick={handleSalvar}>
              Salvar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/pedidos")}
            >
              Cancelar
            </Button>
          </div>
        </div>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    );
  };

  export default EditarPedido;
