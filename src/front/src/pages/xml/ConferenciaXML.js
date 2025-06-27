import React, { useState } from "react";
import {
    Box, Typography, Table, TableHead, TableRow, TableCell, TableBody,
    Button, Grid, Paper, TextField
} from "@mui/material";
import {
    buscarPedidoPorId
} from "../../api/pedidos";
import axios from "axios";

const compararItens = (itemXml, itemPedido) => {
    return (
        itemXml.nome_produto === itemPedido.produto?.nome &&
        itemXml.quantidade === itemPedido.quantidade &&
        parseFloat(itemXml.preco_unitario) === parseFloat(itemPedido.produto?.preco)
    );
};

const ConferenciaXML = () => {
  // estados
  const [itensXml, setItensXml] = useState([]);
  const [itensPedido, setItensPedido] = useState([]);
  const [pedidoId, setPedidoId] = useState("");

  // comparar itens (ajustado para consistência)
  const compararItens = (itemXml, itemPedido) => {
    return (
      itemXml?.nome_produto === itemPedido?.produto?.nome &&
      itemXml?.quantidade === itemPedido?.quantidade &&
      parseFloat(itemXml?.preco_unitario) === parseFloat(itemPedido?.produto?.preco)
    );
  };

  // upload do XML (igual ao seu)
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

  // buscar pedido da API
  const buscarItensDoPedido = async () => {
    try {
      const response = await buscarPedidoPorId(Number(pedidoId));
      const itens = response.itens || [];
      setItensPedido(itens);
    } catch (error) {
      console.error("Erro ao buscar pedido:", error);
      setItensPedido([]);
    }
  };

  // calcular o máximo comprimento dos arrays pra renderizar as linhas e marcar diferença se não existir item correspondente
  const maxLength = Math.max(itensXml.length, itensPedido.length);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={3}>Conferência de XML</Typography>

      <Grid container spacing={2} mb={3}>
        <Grid item>
          <TextField
            label="ID do Pedido"
            value={pedidoId}
            onChange={(e) => setPedidoId(e.target.value)}
            size="small"
          />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={buscarItensDoPedido}>Buscar Pedido</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" component="label">
            Upload XML
            <input type="file" hidden onChange={handleFileUpload} />
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Tabela Itens do XML */}
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
                {[...Array(maxLength)].map((_, index) => {
                  const itemXml = itensXml[index];
                  const itemPedido = itensPedido[index];

                  // Verifica igualdade somente se os dois itens existirem
                  const igual = itemXml && itemPedido && compararItens(itemXml, itemPedido);

                  // Se faltar item no XML ou no pedido, marca como diferente (vermelho)
                  const corLinha = igual ? "#d0f0c0" : "#f8d7da";

                  return (
                    <TableRow key={index} sx={{ bgcolor: corLinha }}>
                      <TableCell>{itemXml?.nome_produto || "—"}</TableCell>
                      <TableCell>{itemXml?.quantidade ?? "—"}</TableCell>
                      <TableCell>{itemXml?.preco_unitario?.toFixed(2) ?? "—"}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        {/* Tabela Itens do Pedido */}
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
                {[...Array(maxLength)].map((_, index) => {
                  const itemXml = itensXml[index];
                  const itemPedido = itensPedido[index];

                  const igual = itemXml && itemPedido && compararItens(itemXml, itemPedido);
                  const corLinha = igual ? "#d0f0c0" : "#f8d7da";

                  return (
                    <TableRow key={index} sx={{ bgcolor: corLinha }}>
                      <TableCell>{itemPedido?.produto?.nome || "—"}</TableCell>
                      <TableCell>{itemPedido?.quantidade ?? "—"}</TableCell>
                      <TableCell>{itemPedido?.produto?.preco?.toFixed(2) ?? "—"}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConferenciaXML;
