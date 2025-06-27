import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";

function RelatorioVendas() {
  const navigate = useNavigate();
  const [vendas, setVendas] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const fetchVendas = async () => {
      try {
        const res = await api.get("/vendas");
        setVendas(res.data);
      } catch (err) {
        setErro("Erro ao carregar vendas.");
      }
    };
    fetchVendas();
  }, []);

const exportarCSV = () => {
  const BOM = "\uFEFF";
  const cabecalho = ["ID", "Data", "Valor Total", "Cliente", "Usuário", "Produtos", "Observações"];

  const linhas = vendas.map((v) => [
    v.id,
    formatarData(v.dataPedido), 
    `"R$ ${Number(v.valorTotal).toFixed(2).replace('.', ',')}"`,
    `"${(v.cliente || "-").replace(/"/g, '""')}"`, 
    `"${(v.usuario || "-").replace(/"/g, '""')}"`,
    `"${v.itens?.map(i => `${i.nome || "?"} x${i.quantidade}`).join(" | ") || "-"}"`,
    `"${(v.observacoes || "").replace(/"/g, '""')}"`
  ]);

  const csvContent = BOM + [
    cabecalho.map(f => `"${f}"`).join(","), 
    ...linhas.map(l => l.join(","))
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `relatorio_vendas_${new Date().toISOString().slice(0,10)}.csv`;
  link.click();
  
  setTimeout(() => URL.revokeObjectURL(url), 100);
};


function formatarData(dataString) {
  if (!dataString) return '""';
  const data = new Date(dataString);
  return `"${data.toLocaleDateString('pt-BR')}"`; 
}

  return (
    <Box sx={{ minHeight: "100vh", p: 2 }}>
      <Paper sx={{ p: 4, borderRadius: "16px" }}>
        <Typography
          variant="h4"
          mb={3}
          align="center"
          sx={{ color: "#6a1b9a", fontWeight: "bold" }}
        >
          Relatório de Vendas
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Data</TableCell>
                <TableCell>Valor Total</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Usuário</TableCell>
                <TableCell>Produtos Vendidos</TableCell>
                <TableCell>Observações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vendas.map((venda) => (
                <TableRow key={venda.id}>
                  <TableCell>{venda.id}</TableCell>
                  <TableCell>
                    {venda.dataPedido
                      ? new Intl.DateTimeFormat('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        }).format(new Date(venda.dataPedido))
                      : "-"}
                  </TableCell>
                  <TableCell>R$ {venda.valorTotal}</TableCell>
                  <TableCell>{venda.cliente || "-"}</TableCell>
                  <TableCell>{venda.usuario || "-"}</TableCell>
                  <TableCell>
                    {venda.itens?.length > 0 ? (
                      venda.itens.map((item, idx) => (
                        <div key={idx}>
                          {item.nome || "?"} | Qnt - {item.quantidade}
                        </div>
                      ))
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>{venda.observacoes || ""}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box mt={3} sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            startIcon={<ArrowBackIcon />}
            variant="outlined"
            color="secondary"
            onClick={() => navigate(-1)}
          >
            Voltar
          </Button>

          <Button
            startIcon={<FileDownloadIcon />}
            variant="contained"
            sx={{ bgcolor: "#6a1b9a", ":hover": { bgcolor: "#4a148c" } }}
            onClick={exportarCSV}
          >
            Exportar CSV
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={!!erro}
        autoHideDuration={6000}
        onClose={() => setErro("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => setErro("")} variant="filled">
          {erro}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default RelatorioVendas;
