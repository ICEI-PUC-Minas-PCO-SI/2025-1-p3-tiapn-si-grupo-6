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

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    padding: "1rem",
  },
  wrapper: {
    width: '100%',
    maxWidth: 'calc(100vw - 240px)',
    margin: '0 auto',
    padding: '1rem',
    boxSizing: 'border-box',
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
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginLeft: "0.75rem",
  },
  searchBar: {
    padding: "1.5rem",
    borderBottom: "1px solid #e5e7eb",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    flexGrow: 1,
    padding: "0.75rem",
    border: "1px solid #d1d5db",
    borderRadius: "0.375rem",
    outline: "none",
    transition: "all 0.2s",
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
    justifyContent: "flex-end",
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
      setClientes(data);
    } catch (error) {
      mostrarMensagem("Erro ao carregar clientes", "error");
    } finally {
      setCarregando(false);
    }
  };

  const handlePesquisar = async () => {
    try {
      setCarregando(true);
      const data = await buscarPorNome(busca);
      setClientes(data);
    } catch (error) {
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
  function MeuComponente() {
    return (
      <div>
        <img
          src="/imgs/Cliente sem fundo.png"
          alt="Cliente"
          style={{ width: 40, height: 40, objectFit: "contain" }}
        />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.card}>
          {/* Header */}
          <div style={{ ...styles.header, gap: "12px" }}>
            <img
              src="/imgs/Cliente sem fundo.png"
              alt="Cliente"
              style={{ width: 50, height: 50 }}
            />
            <h1 style={styles.title}>Gestão de Clientes</h1>
          </div>

          {/* Search */}
          <div style={styles.searchBar}>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <input
                type="text"
                placeholder="Pesquisar"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                style={styles.input}
              />
              <BotaoPesquisar onClick={handlePesquisar} />
              <BotaoCadastrar onClick={() => navigate("/clientes/cadastrar")} />
            </div>
          </div>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginLeft: "auto",
            }}
          >
            <input
              type="checkbox"
              checked={mostrarExcluidos}
              onChange={(e) => setMostrarExcluidos(e.target.checked)}
            />
            Mostrar excluídos
          </label>
          {/* Tabela */}
          <div style={styles.tableContainer}>
            {carregando ? (
              <div style={styles.loadingText}>Carregando clientes...</div>
            ) : (
              <table style={styles.table}>
                <thead style={styles.tableHead}>
                  <tr>
                    <th style={{ ...styles.tableHeaderCell, width: "20%" }}>
                      Nome Completo
                    </th>
                    <th style={{ ...styles.tableHeaderCell, width: "10%" }}>
                      Telefone
                    </th>
                    <th style={{ ...styles.tableHeaderCell, width: "20%" }}>
                      Endereço
                    </th>
                    <th style={{ ...styles.tableHeaderCell, width: "25%" }}>
                      Logradouro
                    </th>
                    <th style={{ ...styles.tableHeaderCell, width: "10%" }}>
                      CEP
                    </th>
                    <th style={{ ...styles.tableHeaderCell, width: "10%" }}>
                      Bairro
                    </th>
                    <th style={{ ...styles.tableHeaderCell, width: "5%" }}>
                      Número
                    </th>
                    <th style={{ ...styles.tableHeaderCell, width: "20%" }}>
                      Email
                    </th>
                    <th
                      style={{
                        ...styles.tableHeaderCell,
                        width: "10%",
                        textAlign: "center",
                      }}
                    ></th>
                  </tr>
                </thead>
                <tbody style={styles.tableBody}>
                  {clientes.map((cliente) => (
                    <tr key={cliente.id}>
                      <td style={styles.tableCell}>{cliente.nome}</td>
                      <td style={styles.tableCell}>{cliente.telefone}</td>
                      <td style={styles.tableCell}>{cliente.endereco}</td>
                      <td style={styles.tableCell}>{cliente.logradouro}</td>
                      <td style={styles.tableCell}>{cliente.cep}</td>
                      <td style={styles.tableCell}>{cliente.bairro}</td>
                      <td style={styles.tableCell}>{cliente.numero}</td>
                      <td style={styles.tableCell}>{cliente.email}</td>
                      <td style={{ ...styles.tableCell, textAlign: "right" }}>
                        <div style={styles.actionButtons}>
                          <BotaoEditar
                            onClick={() =>
                              navigate(`/clientes/editar/${cliente.id}`)
                            }
                          />
                          <BotaoExcluir
                            onClick={() => setClienteParaExcluir(cliente)}
                            disabled={mostrarExcluidos}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Dialog de confirmação */}
      <Dialog
        open={!!clienteParaExcluir}
        onClose={() => setClienteParaExcluir(null)}
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir o cliente {clienteParaExcluir?.nome}?
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
    </div>
  );
}
