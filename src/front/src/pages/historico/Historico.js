import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  IconButton,
  Chip,
  TextField,
  InputAdornment
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  History as HistoryIcon,
  Search as SearchIcon
} from "@mui/icons-material";
import { listarHistorico } from "../../api/historico";

const themeColors = {
  primary: '#6a1b9a',
  primaryLight: '#f3e5f5',
  primaryDark: '#4a148c',
  textOnPrimary: '#ffffff'
};

export default function Historico() {
  const [historico, setHistorico] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [filtro, setFiltro] = useState("");
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

  const handleVoltar = () => {
    navigate('/home');
  };


  const historicoFiltrado = historico.filter(item =>
    item.titulo?.toLowerCase().includes(filtro.toLowerCase()) ||
    item.descricao?.toLowerCase().includes(filtro.toLowerCase())
  );

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleString('pt-BR');
  };

  return (
    <Box sx={{ minHeight: "100vh", p: 3, bgcolor: "#f5f5f5" }}>
      <Paper sx={{ maxWidth: 1200, margin: "auto", p: 3, borderRadius: 2 }}>
        {/* Cabeçalho */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <IconButton 

            sx={{ color: themeColors.primary, mr: 2 }}
            onClick={handleVoltar}
          >
            <ArrowBackIcon />
          </IconButton>
          <HistoryIcon sx={{ color: themeColors.primary, mr: 1 }} />
          <Typography variant="h5" sx={{ fontWeight: 600, color: themeColors.primary }}>
            Histórico de Alterações
          </Typography>
        </Box>

        {/* Barra de pesquisa */}
        <TextField
          fullWidth
          placeholder="Pesquisar..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: themeColors.primary }} />
              </InputAdornment>
            ),
            sx: { borderRadius: 2, mb: 3 }
          }}
        />

        {/* Tabela */}
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: themeColors.primaryLight }}>
                <TableCell sx={{ fontWeight: 600 }}>Data</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Título</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Descrição</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {carregando ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <CircularProgress sx={{ color: themeColors.primary }} />
                  </TableCell>
                </TableRow>
              ) : historicoFiltrado.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                    {filtro ? "Nenhum resultado encontrado" : "Nenhum registro encontrado"}
                  </TableCell>
                </TableRow>
              ) : (
                historicoFiltrado.map((item) => (
                    <TableRow
                      key={item.id}
                      hover
                      sx={{ cursor: 'pointer' }}
                      onClick={() => {}}
                    >
                    <TableCell>
                      <Chip 
                        label={formatarData(item.inclusao)} 
                        sx={{ 
                          bgcolor: themeColors.primaryLight,
                          color: themeColors.primary
                        }} 
                        onClick={() => {}}
                      />
                    </TableCell>
                    <TableCell>{item.titulo}</TableCell>
                    <TableCell>{item.descricao}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}