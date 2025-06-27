import React, { useEffect, useState } from "react";
import {
  getCategorias,
  buscarCategoriaPorNome,
  excluirCategoria,
} from "../../api/categoria";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CategoryIcon from "@mui/icons-material/Category";
import { useNavigate } from "react-router-dom";

import BotaoPesquisar from "../../components/ui/BotaoPesquisar";
import { BotaoCadastrar } from "../../components/ui/BotaoCadastrar";
import { BotaoEditar } from "../../components/ui/BotaoEditar";
import { BotaoExcluir } from "../../components/ui/BotaoExcluir";

const styles = {
  container: { minHeight: "100vh", backgroundColor: "#f3f4f6", padding: "1rem" },
  wrapper: { maxWidth: "80rem", margin: "0 auto", width: "100%" },
  card: {
    backgroundColor: "white",
    borderRadius: "0.5rem",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06)",
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
  tableContainer: { overflowX: "auto", backgroundColor: "#f9fafb" },
  table: { width: "100%", minWidth: "800px", borderCollapse: "separate", borderSpacing: "0" },
  tableHead: { backgroundColor: "#f3f4f6" },
  tableHeaderCell: {
    padding: "1rem 2rem",
    textAlign: "left",
    fontSize: "0.75rem",
    fontWeight: "500",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  tableBody: { backgroundColor: "white" },
  tableRow: { "&:hover": { backgroundColor: "#f9fafb" } },
  tableCell: {
    padding: "1.25rem 2rem",
    fontSize: "0.875rem",
    color: "#374151",
    verticalAlign: "middle",
  },
  loadingText: { padding: "2rem", textAlign: "center", color: "#6b7280" },
  actionButtons: { display: "flex", justifyContent: "flex-end", gap: "0.75rem" },
};

export default function ListarCategoria() {
  const [categorias, setCategorias] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [categoriaParaExcluir, setCategoriaParaExcluir] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const navigate = useNavigate();

  useEffect(() => {
    carregarCategorias();
  }, []);

  const carregarCategorias = async () => {
    try {
      setCarregando(true);
      const data = await getCategorias();
      setCategorias(data);
    } catch (error) {
      mostrarMensagem("Erro ao carregar categorias", "error");
    } finally {
      setCarregando(false);
    }
  };

  const handlePesquisar = async () => {
    try {
      setCarregando(true);
      let data;
      if (!busca.trim()) {
        data = await getCategorias();
      } else {
        data = await buscarCategoriaPorNome(busca);
      }
      setCategorias(data);
    } catch (error) {
      mostrarMensagem("Erro ao pesquisar categorias", "error");
    } finally {
      setCarregando(false);
    }
  };

  const handleExcluirCategoria = async () => {
    try {
      setCarregando(true);
      await excluirCategoria(categoriaParaExcluir.id);
      mostrarMensagem("Categoria excluída com sucesso", "success");
      setCategoriaParaExcluir(null);
      await carregarCategorias();
    } catch (error) {
      mostrarMensagem("Erro ao excluir categoria", "error");
    } finally {
      setCarregando(false);
    }
  };

  const mostrarMensagem = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => setSnackbar((s) => ({ ...s, open: false }));

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <div style={styles.header}>
            <IconButton onClick={() => navigate("/home")} aria-label="voltar" sx={{ color: "#6b7280", marginRight: "12px" }}>
              <ArrowBackIcon fontSize="inherit" />
            </IconButton>
            <CategoryIcon style={{ fontSize: 32, color: "#6b7280", marginRight: "12px" }} />
            <h1 style={styles.title}>Gestão de Categorias</h1>
          </div>

          <div style={styles.searchBar}>
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
              <input
                type="text"
                placeholder="Pesquisar categoria"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                style={styles.input}
              />
              <BotaoPesquisar onClick={handlePesquisar} />
              <BotaoCadastrar onClick={() => navigate("/categorias/cadastrar")} />
            </div>
          </div>

          <div style={styles.tableContainer}>
            {carregando ? (
              <div style={styles.loadingText}>Carregando categorias...</div>
            ) : categorias.length === 0 ? (
              <div style={styles.loadingText}>Nenhuma categoria cadastrada.</div>
            ) : (
              <table style={styles.table}>
                <thead style={styles.tableHead}>
                  <tr>
                    <th style={{ ...styles.tableHeaderCell, width: "15%" }}>Código</th>
                    <th style={{ ...styles.tableHeaderCell, width: "30%" }}>Nome</th>
                    <th style={{ ...styles.tableHeaderCell, width: "35%" }}>Descrição</th>
                    <th style={{ ...styles.tableHeaderCell, width: "20%", textAlign: "right" }}>Ações</th>
                  </tr>
                </thead>
                <tbody style={styles.tableBody}>
                  {categorias.map((cat) => (
                    <tr key={cat.id} style={styles.tableRow}>
                      <td style={styles.tableCell}>{cat.id}</td>
                      <td style={styles.tableCell}>{cat.nome}</td>
                      <td style={styles.tableCell}>{cat.descricao}</td>
                      <td style={{ ...styles.tableCell, ...styles.actionButtons }}>
                        <BotaoEditar onClick={() => navigate(`/categorias/editar/${cat.id}`)} />
                        <BotaoExcluir onClick={() => setCategoriaParaExcluir(cat)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <Dialog open={!!categoriaParaExcluir} onClose={() => setCategoriaParaExcluir(null)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir a categoria {categoriaParaExcluir?.nome}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCategoriaParaExcluir(null)}>Cancelar</Button>
          <Button onClick={handleExcluirCategoria} color="error">Confirmar</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert severity={snackbar.severity} onClose={handleCloseSnackbar} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}