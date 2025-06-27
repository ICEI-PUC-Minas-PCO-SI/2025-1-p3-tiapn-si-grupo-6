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
        itemXml.nome_produto === itemPedido.nome_produto &&
        itemXml.quantidade === itemPedido.quantidade &&
        parseFloat(itemXml.preco_unitario) === parseFloat(itemPedido.preco_unitario)
    );
};

const ConferenciaXML = () => {
    const [itensXml, setItensXml] = useState([]);
    const [itensPedido, setItensPedido] = useState([]);
    const [pedidoId, setPedidoId] = useState("");

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

    const buscarItensDoPedido = async () => {
        try {
            const response = await buscarPedidoPorId(1);
            console.log(response);
            const itens = response.data.itens || [];
            setItensPedido(itens);
        } catch (error) {
            console.error("Erro ao buscar pedido:", error);
            setItensPedido([]);
        }
    };

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
                    <Button variant="contained" onClick={buscarItensDoPedido}>
                        Buscar Pedido
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" component="label">
                        Upload XML
                        <input type="file" hidden onChange={handleFileUpload} />
                    </Button>
                </Grid>
            </Grid>

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
                                        <TableCell>{item.nomeProduto}</TableCell>
                                        <TableCell>{item.quantidade}</TableCell>
                                        <TableCell>{item.precoUnitario.toFixed(2)}</TableCell>
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
