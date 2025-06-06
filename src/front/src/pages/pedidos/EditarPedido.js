import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { buscarPedidoPorId, editarPedido } from "../../api/pedidos";

const EditarPedido = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pedido, setPedido] = useState({
    cliente: "",
    data: "",
    status: "",
    itens: [],
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const carregarPedido = async () => {
      try {
        const dados = await buscarPedidoPorId(id);
        setPedido({
          cliente: dados.cliente,
          data: dados.data,
          status: dados.status,
          itens: dados.itens || [],
        });
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Erro ao carregar pedido",
          severity: "error",
        });
      }
    };

    carregarPedido();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPedido((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSalvar = async () => {
    try {
      await editarPedido(id, pedido);
      setSnackbar({
        open: true,
        message: "Pedido atualizado com sucesso!",
        severity: "success",
      });
      setTimeout(() => {
        navigate("/pedidos");
      }, 1500);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Erro ao atualizar pedido",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
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
          maxWidth: "900px", // aumentei aqui
          margin: "0 auto",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            fontSize: "1.75rem",
            fontWeight: "bold",
            marginBottom: "1.5rem",
          }}
        >
          Editar Pedido - ID {id}
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <TextField
            label="Cliente"
            name="cliente"
            value={pedido.cliente}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Data"
            name="data"
            type="date"
            value={pedido.data}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            select
            label="Status"
            name="status"
            value={pedido.status}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="Pendente">Pendente</MenuItem>
            <MenuItem value="Em Andamento">Em Andamento</MenuItem>
            <MenuItem value="Concluído">Concluído</MenuItem>
            <MenuItem value="Cancelado">Cancelado</MenuItem>
          </TextField>

          {/* Lista dos itens do pedido */}
          <Typography variant="h6" style={{ marginTop: "1rem" }}>
            Itens do Pedido
          </Typography>
          {pedido.itens.length === 0 ? (
            <Typography variant="body2" color="textSecondary">
              Nenhum item no pedido.
            </Typography>
          ) : (
            <Paper variant="outlined" style={{ overflowX: "auto" }}>
              <Table size="small" aria-label="Itens do pedido">
                <TableHead>
                  <TableRow>
                    <TableCell>Produto</TableCell>
                    <TableCell align="right">Quantidade</TableCell>
                    <TableCell align="right">Preço Unitário</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pedido.itens.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.produto}</TableCell>
                      <TableCell align="right">{item.quantidade}</TableCell>
                      <TableCell align="right">
                        R$ {item.preco.toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        R$ {(item.preco * item.quantidade).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          )}

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
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
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
    </div>
  );
};

export default EditarPedido;
