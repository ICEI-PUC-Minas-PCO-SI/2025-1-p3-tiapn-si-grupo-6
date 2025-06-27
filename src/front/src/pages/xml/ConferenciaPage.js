import React, { useState } from "react";
import {
  Box, Typography, Table, TableHead, TableRow, TableCell, TableBody,
  Button, Grid, Paper, TextField
} from "@mui/material";

const compararItens = (itemXml, itemPedido) => {
  return (
    itemXml.nome_produto === itemPedido.nome_produto &&
    itemXml.quantidade === itemPedido.quantidade &&
    parseFloat(itemXml.preco_unitario) === parseFloat(itemPedido.preco_unitario)
  );
};

const ConferenciaXML = () => {
  const [pedidoId, setPedidoId] = useState("");
  const [itensPedido, setItensPedido] = useState([]);
  const [itensXml, setItensXml] = useState([]);
  const [erro, setErro] = useState("");

  const buscarPedido = async () => {
    try {
      const response = await fetch(`http://localhost:8080/pedidos/buscar/${pedidoId}`);
      if (!response.ok) throw new Error("Pedido não encontrado.");
      const pedido = await response.json();
      setItensPedido(pedido.itens || []);
      setErro("");
    } catch (err) {
      setErro("Erro ao buscar o pedido. Verifique o ID.");
      setItensPedido([]);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const xmlText = event.target.result;
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlText, "text/xml");

      const itemNodes = xml.getElementsByTagName("item");
      const parsedItens = [];

      for (let i = 0; i < itemNodes.length; i++) {
        const node = itemNodes[i];
        parsedItens.push({
          nome_produto: node.getElementsByTagName("nome_produto")[0].textContent,
          quantidade: parseInt(node.getElementsByTagName("quantidade")[0].textContent),
          preco_unitario: parseFloat(node.getElementsByTagName("preco_unitario")[0].textContent),
        });
      }

      setItensXml(parsedItens);
    };

    reader.readAsText(file);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={3}>Conferência de XML com Pedido</Typography>

      <Box mb={2} display="flex" gap={2} alignItems="center">
        <TextField
          label="ID do Pedido"
          variant="outlined"
          value={pedidoId}
          onChange={(e) => setPedidoId(e.target.value)}
          size="small"
        />
        <Button variant="contained" onClick={buscarPedido}>Buscar Pedido</Button>
        <Button variant="contained" component="label">
          Upload XML
          <input type="file" hidden onChange={handleFileUpload} />
        </Button>
      </Box>

      {erro && <Typography color="error" mb={2}>{erro}</Typography>}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" mb={1}>Itens do XML</Typography>
          <Paper variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Quantidade</TableCell>
                  <TableCell>Preço</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {itensXml.map((itemXml, index) => {
                  const correspondente = itensPedido[index];
                  const igual = correspondente && compararItens(itemXml, correspondente);
                  return (
                    <TableRow key={index} sx={{ bgcolor: igual ? "#d0f0c0" : "#f8d7da" }}>
                      <TableCell>{itemXml.nome_produto}</TableCell>
                      <TableCell>{itemXml.quantidade}</TableCell>
                      <TableCell>{itemXml.preco_unitario.toFixed(2)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" mb={1}>Itens do Pedido</Typography>
          <Paper variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Quantidade</TableCell>
                  <TableCell>Preço</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {itensPedido.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.nome_produto}</TableCell>
                    <TableCell>{item.quantidade}</TableCell>
                    <TableCell>{item.preco_unitario.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConferenciaXML;
