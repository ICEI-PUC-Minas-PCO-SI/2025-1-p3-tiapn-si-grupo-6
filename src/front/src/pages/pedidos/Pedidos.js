import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useEffect, useState } from "react";
import { getPedidos, excluirPedido } from "../../api/pedidos";
import BotaoPesquisar from "../../components/ui/BotaoPesquisar";
import { BotaoCadastrar } from "../../components/ui/BotaoCadastrar";
import { BotaoEditar } from "../../components/ui/BotaoEditar";
import { BotaoExcluir } from "../../components/ui/BotaoExcluir";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [pedidosOriginais, setPedidosOriginais] = useState([]);
  const [busca, setBusca] = useState("");
  const [pedidoParaExcluir, setPedidoParaExcluir] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [filtroStatus, setFiltroStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    carregarPedidos();
  }, []);

  const carregarPedidos = async () => {
    try {
      setCarregando(true);
      const data = await getPedidos();
      setPedidos(data);
      setPedidosOriginais(data);
    } catch (error) {
      mostrarMensagem("Erro ao carregar pedidos", "error");
    } finally {
      setCarregando(false);
    }
  };

  const handlePesquisar = () => {
    const resultados = pedidosOriginais.filter((p) => {
      const fornecedorNome = p.fornecedor?.nome?.toLowerCase() || "";
      const fornecedorMatch = fornecedorNome.includes(busca.toLowerCase());
      const statusMatch = filtroStatus ? p.status === filtroStatus : true;
      return fornecedorMatch && statusMatch;
    });
    setPedidos(resultados);
  };

  const handleExcluirPedido = async () => {
    try {
      await excluirPedido(pedidoParaExcluir.id);
      mostrarMensagem("Pedido excluído com sucesso", "success");
      setPedidoParaExcluir(null);
      carregarPedidos();
    } catch (error) {
      mostrarMensagem("Erro ao excluir pedido", "error");
    }
  };

  const mostrarMensagem = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "#f3f4f6",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "1rem",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
            gap: "8px",
          }}
        >
          <ArrowBackIcon
            style={{
              fontSize: 28,
              color: "#6b7280",
              cursor: "pointer",
            }}
            onClick={() => navigate(-1)}
          />
          <ReceiptLongIcon style={{ fontSize: 32, color: "#6b7280" }} />
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            Gestão de Pedidos
          </h1>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Pesquisar por fornecedor"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{
              flex: 1,
              padding: "0.75rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
            aria-label="Pesquisar por fornecedor"
          />
          <BotaoPesquisar onClick={handlePesquisar} />
          <BotaoCadastrar onClick={() => navigate("/pedidos/cadastrar")} />
        </div>

        <div style={{ overflowX: "auto" }}>
          {carregando ? (
            <p style={{ textAlign: "center", padding: "1rem" }}>
              Carregando pedidos...
            </p>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "800px",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#f3f4f6" }}>
                  <th style={{ padding: "12px", textAlign: "left" }}>ID</th>
                  <th style={{ padding: "12px", textAlign: "left" }}>
                    Fornecedor
                  </th>
                  <th style={{ padding: "12px", textAlign: "left" }}>
                    Data do Pedido
                  </th>
                  <th style={{ padding: "12px", textAlign: "left" }}>Status</th>
                  <th style={{ padding: "12px", textAlign: "right" }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      style={{ padding: "12px", textAlign: "center" }}
                    >
                      Nenhum pedido encontrado.
                    </td>
                  </tr>
                ) : (
                  pedidos.map((pedido) => (
                    <tr
                      key={pedido.id}
                      style={{ borderBottom: "1px solid #e5e7eb" }}
                    >
                      <td style={{ padding: "12px" }}>{pedido.id}</td>
                      <td style={{ padding: "12px" }}>
                        {pedido.fornecedor?.nome || "Fornecedor não informado"}
                      </td>
                      <td style={{ padding: "12px" }}>
                        {pedido.dataPedido
                          ? new Date(pedido.dataPedido).toLocaleDateString()
                          : "Data não informada"}
                      </td>
                      <td style={{ padding: "12px" }}>{pedido.status}</td>
                      <td style={{ padding: "12px", textAlign: "right" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "0.5rem",
                          }}
                        >
                          <BotaoEditar
                            onClick={() =>
                              navigate(`/pedidos/editar/${pedido.id}`)
                            }
                          />
                          <BotaoExcluir
                            onClick={() => setPedidoParaExcluir(pedido)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Dialog de confirmação de exclusão */}
      <Dialog
        open={!!pedidoParaExcluir}
        onClose={() => setPedidoParaExcluir(null)}
        aria-labelledby="confirmar-exclusao-dialog"
      >
        <DialogTitle id="confirmar-exclusao-dialog">
          Confirmar Exclusão
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir o pedido do fornecedor{" "}
            <strong>{pedidoParaExcluir?.fornecedor?.nome}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPedidoParaExcluir(null)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleExcluirPedido} color="error" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar de mensagens */}
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
    </div>
  );
}
