import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@mui/material";
import { criarPedido } from "../../api/pedidos";

export default function VisualizarPedido() {
  const location = useLocation();
  const navigate = useNavigate();
  const pedido = location.state?.pedido;

  const [openDialog, setOpenDialog] = useState({ tipo: null, open: false });

  if (!pedido) {
    return (
      <Typography variant="h6" color="error">
        Nenhum pedido para visualizar.
      </Typography>
    );
  }

  const handleOpenDialog = (tipo) => {
    setOpenDialog({ tipo, open: true });
  };

  const handleCloseDialog = () => {
    setOpenDialog({ tipo: null, open: false });
  };

  const handleConfirmDialog = async () => {
    if (openDialog.tipo === "confirmar") {
      try {
        await criarPedido(pedido);
        navigate("/pedidos");
      } catch (error) {
        console.error("Erro ao salvar pedido", error);
        alert("Erro ao salvar pedido!");
      }
    } else if (openDialog.tipo === "cancelar") {
      navigate("/pedidos");
    } else if (openDialog.tipo === "voltar") {
      navigate(-1);
    }
    handleCloseDialog();
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 1000, mx: "auto", mt: 4, boxShadow: 5 }}>
      <Typography variant="h5" gutterBottom>
        📋 Revisar Pedido Antes de Salvar
      </Typography>

      <Typography sx={{ mb: 2 }}>
        <strong>Fornecedor:</strong> {pedido.fornecedor} <br />
        <strong>Responsável:</strong> {pedido.responsavel} <br />
        <strong>Contato:</strong> {pedido.contato} <br />
        <strong>Número:</strong> {pedido.numero} <br />
        <strong>Data:</strong> {pedido.data} <br />
        <strong>Status:</strong> {pedido.status} <br />
        <strong>Total:</strong> R$ {pedido.total.toFixed(2)} <br />
      </Typography>

      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
        Itens do Pedido:
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: "#4B0082",
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Nome
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#4B0082",
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Código
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#4B0082",
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Quantidade
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#4B0082",
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Valor Unitário
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#4B0082",
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Total
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pedido.produtos.map((item, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
                }}
              >
                <TableCell>{item.nome}</TableCell>
                <TableCell align="center">{item.codigo}</TableCell>
                <TableCell align="center">{item.quantidade}</TableCell>
                <TableCell align="center">
                  R$ {item.valorUnitario.toFixed(2)}
                </TableCell>
                <TableCell align="center">R$ {item.total.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Botões */}
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <Button variant="outlined" onClick={() => handleOpenDialog("voltar")}>
          Voltar
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => handleOpenDialog("confirmar")}
        >
          Confirmar
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleOpenDialog("cancelar")}
        >
          Cancelar
        </Button>
      </div>

      {/* Dialog de Confirmação */}
      <Dialog open={openDialog.open} onClose={handleCloseDialog}>
        <DialogTitle>Confirmação</DialogTitle>
        <DialogContent>
          Tem certeza que deseja{" "}
          {openDialog.tipo === "voltar" && "voltar para a tela anterior?"}
          {openDialog.tipo === "confirmar" && "confirmar e salvar este pedido?"}
          {openDialog.tipo === "cancelar" &&
            "cancelar este pedido e voltar para a lista?"}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Não</Button>
          <Button
            onClick={handleConfirmDialog}
            autoFocus
            color={openDialog.tipo === "cancelar" ? "error" : "primary"}
          >
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
