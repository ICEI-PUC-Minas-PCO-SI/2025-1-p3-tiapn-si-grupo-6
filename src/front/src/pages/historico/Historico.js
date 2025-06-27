import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HistoryIcon from "@mui/icons-material/History";
import { IconButton } from "@mui/material";
import { listarHistorico } from "../../api/historico";

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
  tableContainer: {
    overflowX: "auto",
    backgroundColor: "#f9fafb",
  },
  table: {
    width: "100%",
    minWidth: "1000px",
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
};

export default function Historico() {
  const [historico, setHistorico] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

useEffect(() => {
  const carregarHistorico = async () => {
    try {
      setCarregando(true);
      const data = await listarHistorico();
      setHistorico(data);
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
    } finally {
      setCarregando(false);
    }
  };

  carregarHistorico();
}, []);

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <div style={styles.header}>
            <IconButton onClick={() => navigate(-1)} aria-label="voltar">
              <ArrowBackIcon />
            </IconButton>
            <HistoryIcon style={{ fontSize: 32, color: "#6b7280", marginRight: "12px" }} />
            <h1 style={styles.title}>Histórico de Alterações</h1>
          </div>

          <div style={styles.tableContainer}>
            {carregando ? (
              <div style={styles.loadingText}>Carregando histórico...</div>
            ) : (
              <table style={styles.table}>
                <thead style={styles.tableHead}>
                  <tr>
                    <th style={styles.tableHeaderCell}>Data</th>
                    <th style={styles.tableHeaderCell}>Título</th>
                    <th style={styles.tableHeaderCell}>Descrição</th>
                  </tr>
                </thead>
                <tbody style={styles.tableBody}>
                  {historico.length === 0 ? (
                    <tr>
                      <td colSpan="4" style={{ ...styles.tableCell, textAlign: "center" }}>
                        Nenhuma alteração registrada.
                      </td>
                    </tr>
                  ) : (
                    historico.map((item) => (
                      <tr key={item.id} style={styles.tableRow}>
                        <td style={styles.tableCell}>{new Date(item.inclusao).toLocaleString()}</td>
                        <td style={styles.tableCell}>{item.titulo}</td>
                        <td style={styles.tableCell}>{item.descricao}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
