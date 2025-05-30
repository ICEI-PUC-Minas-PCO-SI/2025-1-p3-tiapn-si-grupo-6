import React, { useEffect, useState } from "react";
import { 
  getUsuarios, 
  criarUsuario, 
  buscarPorNome,
  filtrarPorTipo,
  editarUsuario,
  excluirUsuario,
  getUsuariosIncluindoExcluidos
} from "../../api/usuarios";
import PeopleIcon from "@mui/icons-material/People";
import BotaoPesquisar from "../../components/ui/BotaoPesquisar";
import { BotaoFiltrar } from "../../components/ui/BotaoFiltrar";
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
  InputLabel
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
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
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

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [busca, setBusca] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [carregando, setCarregando] = useState(true);
  const [mostrarExcluidos, setMostrarExcluidos] = useState(false);
  const [usuarioParaExcluir, setUsuarioParaExcluir] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();

  useEffect(() => {
    carregarUsuarios();
  }, [mostrarExcluidos]);

  const carregarUsuarios = async () => {
    try {
      setCarregando(true);
      const data = mostrarExcluidos 
        ? await getUsuariosIncluindoExcluidos()
        : await getUsuarios();
      setUsuarios(data);
    } catch (error) {
      mostrarMensagem("Erro ao carregar usuários", "error");
    } finally {
      setCarregando(false);
    }
  };

  const handlePesquisar = async () => {
    try {
      setCarregando(true);
      const data = await buscarPorNome(busca);
      setUsuarios(data);
    } catch (error) {
      mostrarMensagem("Erro ao pesquisar usuários", "error");
    } finally {
      setCarregando(false);
    }
  };

  const handleFiltrarPorTipo = async () => {
    try {
      setCarregando(true);
      if (filtroTipo === "todos") {
        await carregarUsuarios();
      } else {
        const data = await filtrarPorTipo(filtroTipo);
        setUsuarios(data);
      }
    } catch (error) {
      mostrarMensagem("Erro ao filtrar usuários", "error");
    } finally {
      setCarregando(false);
    }
  };

  const handleExcluirUsuario = async () => {
    try {
      setCarregando(true);
      await excluirUsuario(usuarioParaExcluir.id);
      mostrarMensagem("Usuário excluído com sucesso", "success");
      setUsuarioParaExcluir(null);
      await carregarUsuarios();
    } catch (error) {
      mostrarMensagem("Erro ao excluir usuário", "error");
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

  const tiposUsuario = [
    { value: "todos", label: "Todos" },
    { value: "admin", label: "Administrador" },
    { value: "gerente", label: "Gerente" },
    { value: "funcionario", label: "Funcionário" },
  ];

  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.nome.toLowerCase().includes(busca.toLowerCase()) ||
    usuario.email.toLowerCase().includes(busca.toLowerCase()) ||
    usuario.login.toLowerCase().includes(busca.toLowerCase()) ||
    usuario.tipoUsuario.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.card}>
          {/* Header */}
          <div style={styles.header}>
            <PeopleIcon style={{ fontSize: 32, color: "#6b7280", marginRight: "12px" }} />
            <h1 style={styles.title}>Gestão de Funcionários</h1>
          </div>

          {/* Search and Filter Bar */}
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
            </div>

            <div style={styles.filterRow}>
              <FormControl size="small" style={{ minWidth: 120 }}>
                <InputLabel>Tipo</InputLabel>
                <Select
                  value={filtroTipo}
                  onChange={(e) => setFiltroTipo(e.target.value)}
                  label="Tipo"
                >
                  {tiposUsuario.map((tipo) => (
                    <MenuItem key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <BotaoFiltrar onClick={handleFiltrarPorTipo} />
              
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginLeft: "auto" }}>
                <input
                  type="checkbox"
                  checked={mostrarExcluidos}
                  onChange={(e) => setMostrarExcluidos(e.target.checked)}
                />
                Mostrar excluídos
              </label>
              
              <BotaoCadastrar onClick={() => navigate("/usuarios/cadastrar")} />
            </div>
          </div>

          {/* Tabela */}
          <div style={styles.tableContainer}>
            {carregando ? (
              <div style={styles.loadingText}>Carregando usuários...</div>
            ) : (
              <table style={styles.table}>
                <thead style={styles.tableHead}>
                  <tr>
                    <th style={{ ...styles.tableHeaderCell, width: "10%" }}>Código</th>
                    <th style={{ ...styles.tableHeaderCell, width: "20%" }}>Nome</th>
                    <th style={{ ...styles.tableHeaderCell, width: "25%" }}>Email</th>
                    <th style={{ ...styles.tableHeaderCell, width: "15%" }}>Login</th>
                    <th style={{ ...styles.tableHeaderCell, width: "15%" }}>Tipo</th>
                    <th style={{ ...styles.tableHeaderCell, width: "15%", textAlign: "right" }}>Ações</th>
                  </tr>
                </thead>
                <tbody style={styles.tableBody}>
                  {usuariosFiltrados.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ ...styles.tableCell, textAlign: "center" }}>
                        {busca
                          ? `Nenhum funcionário encontrado para "${busca}".`
                          : "Nenhum funcionário cadastrado."}
                      </td>
                    </tr>
                  ) : (
                    usuariosFiltrados.map((usuario) => (
                      <tr key={usuario.id} style={styles.tableRow}>
                        <td style={styles.tableCell}>{usuario.id}</td>
                        <td style={styles.tableCell}>{usuario.nome}</td>
                        <td style={{ ...styles.tableCell, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {usuario.email}
                        </td>
                        <td style={styles.tableCell}>{usuario.login}</td>
                        <td style={{ ...styles.tableCell, textTransform: "capitalize" }}>
                          {usuario.tipoUsuario}
                        </td>
                        <td style={{ ...styles.tableCell, textAlign: "right" }}>
                          <div style={styles.actionButtons}>
                            <BotaoEditar
                              onClick={() => navigate(`/usuarios/editar/${usuario.id}`)}
                            />
                            <BotaoExcluir
                              onClick={() => setUsuarioParaExcluir(usuario)}
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
        open={!!usuarioParaExcluir}
        onClose={() => setUsuarioParaExcluir(null)}
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir o usuário {usuarioParaExcluir?.nome}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUsuarioParaExcluir(null)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleExcluirUsuario} color="error" autoFocus>
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
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}