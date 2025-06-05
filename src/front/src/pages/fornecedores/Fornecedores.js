import React, { useEffect, useState } from "react";
import {
  getFornecedores,
  buscarFornecedorPorNome,
  editarFornecedor,
  excluirFornecedor,
  buscarFornecedorPorId,
  listarFornecedores,
  getFornecedoresIncluindoExcluidos,
} from "../../api/fornecedores";
import { IconButton } from "@mui/material";
import BotaoPesquisar from "../../components/ui/BotaoPesquisar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StoreIcon from "@mui/icons-material/Store";
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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    padding: "1rem",
  },
  wrapper: {
    maxWidth: "80rem",
    margin: "0 auto",
    width: "100%",
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
  filterRow: {
    display: "flex",
    gap: "0.75rem",
    alignItems: "center",
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
  tableRow: {
    "&:hover": {
      backgroundColor: "#f9fafb",
    },
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

export default function Fornecedores() {
  const [fornecedores, setFornecedores] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [mostrarExcluidos, setMostrarExcluidos] = useState(false);
  const [fornecedorParaExcluir, setFornecedorParaExcluir] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();

  useEffect(() => {
    carregarFornecedores();
  }, [mostrarExcluidos]);

  const carregarFornecedores = async () => {
    try {
      setCarregando(true);
      const data = mostrarExcluidos
        ? await getFornecedoresIncluindoExcluidos()
        : await getFornecedores();

      console.log("Fornecedores carregados:", data); // <--- aqui

      setFornecedores(data);
    } catch (error) {
      mostrarMensagem("Erro ao carregar fornecedores", "error");
    } finally {
      setCarregando(false);
    }
  };

  const handlePesquisar = async () => {
    try {
      setCarregando(true);
      const data = await buscarFornecedorPorNome(busca);
      setFornecedores(data);
    } catch (error) {
      mostrarMensagem("Erro ao pesquisar fornecedores", "error");
    } finally {
      setCarregando(false);
    }
  };

  const handleExcluirFornecedor = async () => {
    try {
      setCarregando(true);
      await excluirFornecedor(fornecedorParaExcluir.id);
      mostrarMensagem("Fornecedor excluído com sucesso", "success");
      setFornecedorParaExcluir(null);
      await carregarFornecedores();
    } catch (error) {
      mostrarMensagem("Erro ao excluir fornecedor", "error");
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

  const fornecedoresFiltrados = fornecedores.filter(
    (fornecedor) =>
      (fornecedor.nome || "").toLowerCase().includes(busca.toLowerCase()) ||
      (fornecedor.email || "").toLowerCase().includes(busca.toLowerCase()) ||
      (fornecedor.telefone || "").toLowerCase().includes(busca.toLowerCase()) ||
      (fornecedor.endereco || "").toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.card}>
          {/* Header */}
          <div style={styles.header}>
            <IconButton onClick={() => navigate(-1)} aria-label="voltar">
              <ArrowBackIcon />
            </IconButton>
            <StoreIcon
              style={{ fontSize: 32, color: "#6b7280", marginRight: "12px" }}
            />
            <h1 style={styles.title}>Gestão de Fornecedores</h1>
          </div>

          {/* Search Bar */}
          <div style={styles.searchBar}>
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <input
                type="text"
                placeholder="Pesquisar fornecedor"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                style={styles.input}
              />
              <BotaoPesquisar onClick={handlePesquisar} />
              <BotaoCadastrar
                onClick={() => navigate("/fornecedores/cadastrar")}
              />
              <label
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <input
                  type="checkbox"
                  checked={mostrarExcluidos}
                  onChange={(e) => setMostrarExcluidos(e.target.checked)}
                />
                Mostrar excluídos
              </label>
            </div>
          </div>

          {/* Tabela */}
          <div style={styles.tableContainer}>
            {carregando ? (
              <div style={styles.loadingText}>Carregando fornecedores...</div>
            ) : (
              <table style={styles.table}>
                <thead style={styles.tableHead}>
                  <tr>
                    <th style={{ ...styles.tableHeaderCell, width: "10%" }}>
                      Código
                    </th>
                    <th style={{ ...styles.tableHeaderCell, width: "25%" }}>
                      Nome
                    </th>
                    <th style={{ ...styles.tableHeaderCell, width: "20%" }}>
                      Contato
                    </th>
                    <th style={{ ...styles.tableHeaderCell, width: "20%" }}>
                      Email
                    </th>
                    <th
                      style={{
                        ...styles.tableHeaderCell,
                        width: "25%",
                        textAlign: "right",
                      }}
                    >
                      Endereço
                    </th>
                  </tr>
                </thead>
                <tbody style={styles.tableBody}>
                  {fornecedoresFiltrados.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        style={{ ...styles.tableCell, textAlign: "center" }}
                      >
                        {busca
                          ? `Nenhum fornecedor encontrado para "${busca}".`
                          : "Nenhum fornecedor cadastrado."}
                      </td>
                    </tr>
                  ) : (
                    fornecedoresFiltrados.map((fornecedor) => (
                      <tr key={fornecedor.id} style={styles.tableRow}>
                        <td style={styles.tableCell}>{fornecedor.id}</td>
                        <td style={styles.tableCell}>{fornecedor.nome}</td>
                        <td style={styles.tableCell}>{fornecedor.telefone}</td>
                        <td style={styles.tableCell}>{fornecedor.email}</td>
                        <td style={{ ...styles.tableCell, textAlign: "right" }}>
                          {fornecedor.endereco}
                          <div style={styles.actionButtons}>
                            <BotaoEditar
                              onClick={() =>
                                navigate(
                                  `/fornecedores/editar/${fornecedor.id}`
                                )
                              }
                            />
                            <BotaoExcluir
                              onClick={() =>
                                setFornecedorParaExcluir(fornecedor)
                              }
                              disabled={mostrarExcluidos}
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
      </div>

      {/* Dialog de Confirmação de Exclusão */}
      <Dialog
        open={!!fornecedorParaExcluir}
        onClose={() => setFornecedorParaExcluir(null)}
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir o fornecedor{" "}
            {fornecedorParaExcluir?.nome}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setFornecedorParaExcluir(null)}
            color="primary"
          >
            Cancelar
          </Button>
          <Button onClick={handleExcluirFornecedor} color="error" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para mensagens */}
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
