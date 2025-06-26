cliente;
import React, { useEffect, useState } from "react";
import {
  getClientes,
  cadastrarCliente,
  buscarPorNome,
  editarCliente,
  excluirCliente,
  getClientesListarTodos,
} from "../../api/cliente";
import PeopleIcon from "@mui/icons-material/People";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
  TextField,
  Checkbox,
  FormControlLabel,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    padding: "1rem",
  },
  wrapper: {
    width: "100%",
    maxWidth: "calc(100vw - 240px)",
    margin: "0 auto",
    padding: "1rem",
    boxSizing: "border-box",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "0.5rem",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    overflow: "hidden",
  },
  header: {
    padding: "1.5rem",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    gap: "12px",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#1f2937",
  },
  searchBar: {
    padding: "1.5rem",
    borderBottom: "1px solid #e5e7eb",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  tableContainer: {
    overflowX: "auto",
    backgroundColor: "#f9fafb",
  },
  table: {
    width: "100%",
    minWidth: "1200px",
    borderCollapse: "separate",
    borderSpacing: "0",
  },
  tableHead: {
    backgroundColor: "#f3f4f6",
  },
  tableHeaderCell: {
    padding: "1rem 2rem",
    textAlign: "left",
    fontSize: "0.75rem",
    fontWeight: "500",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  tableBody: {
    backgroundColor: "white",
  },
  tableCell: {
    padding: "1.25rem 2rem",
    fontSize: "0.875rem",
    color: "#374151",
    verticalAlign: "middle",
  },
  loadingText: {
    padding: "2rem",
    textAlign: "center",
    color: "#6b7280",
  },
  actionButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "0.75rem",
  },
};

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [mostrarExcluidos, setMostrarExcluidos] = useState(false);
  const [clienteParaExcluir, setClienteParaExcluir] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();

  useEffect(() => {
    carregarClientes();
  }, [mostrarExcluidos]);

  const carregarClientes = async () => {
    try {
      setCarregando(true);

      const data = mostrarExcluidos
        ? await getClientesListarTodos()
        : await getClientes();

      const ids = new Set();
      data.forEach((c) => {
        if (!c.id) console.error("ID inválido:", c);
        else if (ids.has(c.id)) {
          console.error("ID duplicado:", c.id, c.nome);
        }
        ids.add(c.id);
      });

      setClientes(data);
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
      mostrarMensagem("Erro ao carregar clientes", "error");
    } finally {
      setCarregando(false);
    }
  };

  const handlePesquisar = async () => {
    try {
      setCarregando(true);
      const data = await buscarPorNome(busca);
      const clientesPesquisados = data.filter(
        (cliente) =>
          mostrarExcluidos ||
          cliente.status === "ativo" ||
          cliente.ativo === true
      );
      setClientes(clientesPesquisados);
    } catch (error) {
      console.error("Erro ao pesquisar cliente:", error);
      mostrarMensagem("Erro ao pesquisar cliente", "error");
    } finally {
      setCarregando(false);
    }
  };

  const handleExcluirCliente = async () => {
    try {
      setCarregando(true);
      await excluirCliente(clienteParaExcluir.id);
      mostrarMensagem("Cliente excluído com sucesso", "success");
      setClienteParaExcluir(null);
      await carregarClientes();
    } catch (error) {
      mostrarMensagem("Erro ao excluir cliente", "error");
    } finally {
      setCarregando(false);
    }
  };

  const mostrarMensagem = (message, severity) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <div style={styles.header}>
            <IconButton onClick={() => navigate("/")} aria-label="voltar">
              <ArrowBackIcon />
            </IconButton>
            <img
              src="/imgs/Cliente sem fundo.png"
              alt="Cliente"
              style={{ width: 50, height: 50 }}
            />
            <h1 style={styles.title}>Gestão de Clientes</h1>
          </div>

          <div style={styles.searchBar}>
            <Box sx={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <TextField
                type="text"
                placeholder="Pesquisar cliente"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                variant="outlined"
                size="small"
                sx={{ flexGrow: 1 }}
              />
              <BotaoPesquisar onClick={handlePesquisar} />
              <BotaoCadastrar onClick={() => navigate("/clientes/cadastrar")} />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={mostrarExcluidos}
                    onChange={(e) => setMostrarExcluidos(e.target.checked)}
                    sx={{
                      color: "#7e57c2",
                      "&.Mui-checked": {
                        color: "#5e35b1",
                      },
                    }}
                  />
                }
                label="Mostrar excluídos"
              />
            </Box>
          </div>

          <TableContainer component={Paper} style={styles.tableContainer}>
            {carregando ? (
              <div style={styles.loadingText}>Carregando clientes...</div>
            ) : (
              <Table style={styles.table}>
                <TableHead style={styles.tableHead}>
                  <TableRow>
                    <TableCell style={styles.tableHeaderCell}>
                      Nome Completo
                    </TableCell>
                    <TableCell style={styles.tableHeaderCell}>Email</TableCell>
                    <TableCell style={styles.tableHeaderCell}>
                      Telefone
                    </TableCell>
                    <TableCell style={styles.tableHeaderCell}>
                      Logradouro
                    </TableCell>
                    <TableCell
                      style={{ ...styles.tableHeaderCell, textAlign: "center" }}
                    >
                      Ações
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={styles.tableBody}>
                  {clientes.map((cliente, index) => (
                    <TableRow
                      key={`cliente-${cliente?.id ?? index}`}
                      sx={{
                        backgroundColor:
                          cliente.status === "inativo" ||
                          cliente.ativo === false
                            ? "#ffebee"
                            : "inherit",
                      }}
                    >
                      <TableCell style={styles.tableCell}>
                        {cliente.nome}
                      </TableCell>
                      <TableCell style={styles.tableCell}>
                        {cliente.email}
                      </TableCell>
                      <TableCell style={styles.tableCell}>
                        {cliente.telefone}
                      </TableCell>
                      <TableCell style={styles.tableCell}>
                        {cliente.logradouro}
                      </TableCell>
                      <TableCell
                        style={{ ...styles.tableCell, textAlign: "center" }}
                      >
                        <div style={styles.actionButtons}>
                          <BotaoEditar
                            onClick={() =>
                              navigate(`/clientes/editar/${cliente.id}`)
                            }
                          />
                          <BotaoExcluir
                            onClick={() => setClienteParaExcluir(cliente)}
                            disabled={
                              mostrarExcluidos ||
                              cliente.status === "inativo" ||
                              cliente.ativo === false
                            }
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </div>
      </div>

      {/* Modal de confirmação de exclusão */}
      <Dialog
        open={!!clienteParaExcluir}
        onClose={() => setClienteParaExcluir(null)}
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir o cliente{" "}
            <strong>{clienteParaExcluir?.nome}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setClienteParaExcluir(null)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleExcluirCliente} color="error" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
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
