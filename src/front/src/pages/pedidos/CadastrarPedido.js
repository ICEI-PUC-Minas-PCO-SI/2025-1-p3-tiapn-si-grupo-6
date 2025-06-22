    import React, { useState, useEffect, useCallback } from "react";
    import { useNavigate, useLocation  } from "react-router-dom";
    import {
      Autocomplete,
      FormControl,
      InputLabel,
      OutlinedInput,
      Button,
      Snackbar,
      Alert,
      Paper,
      Typography,
      Box,
      Grid,
      Table,
      TableBody,
      TableCell,
      TableContainer,
      TableHead,
      TableRow,
      IconButton,
    } from "@mui/material";
    import { Pencil } from "lucide-react";
    import DeleteIcon from "@mui/icons-material/Delete";
    import { criarPedido } from "../../api/pedidos";
    import { getFornecedores } from "../../api/fornecedores";
    import { listarProdutosPorFornecedor } from "../../api/produtos";
    import { TextField } from "@mui/material";
    import { NumericFormat } from "react-number-format";
    const STATUS_OPTIONS = ["Não atendido", "Atendido", "Cancelado"];
 
    const INITIAL_ITEM_STATE = {
      nome: "",
      codigo: "",
      valorUnitario: "",
      quantidade: "",
    };

    export default function CadastroPedido() {
      const navigate = useNavigate();
      const [produtosFornecedor, setProdutosFornecedor] = useState([]);
      const location = useLocation();

      const [pedido, setPedido] = useState({
        fornecedor: "",
        numero: "",
        data: new Date().toISOString().split("T")[0],
        total: 0,
        status: STATUS_OPTIONS[0],
        produtos: [],
        contato: "",
        responsavel: "",
      });

      const estiloInput = {
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "purple",
          },
          "&:hover fieldset": {
            borderColor: "darkviolet",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#4B0082",
            boxShadow: "0 0 5px #4B0082",
          },
        },
      };

      const [item, setItem] = useState(INITIAL_ITEM_STATE);

      const [fornecedores, setFornecedores] = useState([]);

      const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
      });

      // Busca fornecedores uma única vez
      useEffect(() => {
        (async () => {
          try {
            const dados = await getFornecedores();
            setFornecedores(dados);
          } catch (error) {
            console.error("Erro ao buscar fornecedores", error);
            showSnackbar("Erro ao buscar fornecedores.", "error");
          }
        })();
      }, []);

      // Recuperar pedido vindo de outra tela (ex: ao voltar de VisualizarPedido)

      useEffect(() => {
        if (location.state?.pedido) {
          setPedido(location.state.pedido);
        }
      }, [location.state]);

      // Função para mostrar snackbar
      const showSnackbar = useCallback((message, severity = "success") => {
        setSnackbar({ open: true, message, severity });
      }, []);

      // Atualiza campos do pedido (exceto produtos e total)
      const handlePedidoChange = useCallback(
        (e) => {
          const { name, value } = e.target;
          setPedido((prev) => ({ ...prev, [name]: value }));
        },
        [setPedido]
      );

      // Atualiza campos do item
      const handleItemChange = useCallback(
        (e) => {
          const { name, value } = e.target;
          setItem((prev) => ({ ...prev, [name]: value }));
        },
        [setItem]
      );

      // Atualiza valorUnitario com formatação via NumberFormat
      const handleValorUnitarioChange = useCallback(
        (values) => {
          // values.value é string numérica no formato JS "1234.56"
          setItem((prev) => ({ ...prev, valorUnitario: values.value }));
        },
        [setItem]
      );

      // Atualiza quantidade com formatação via NumberFormat (inteiro)
      const handleQuantidadeChange = useCallback(
        (values) => {
          const val = values.value; // valor limpo, só números
          if (val === "") {
            setItem((prev) => ({ ...prev, quantidade: "" }));
            return;
          }
          const numVal = Number(val);
          if (numVal > 999999) {
            showSnackbar("Quantidade máxima permitida é 999.999", "warning");
            return; // não atualiza se ultrapassar limite
          }
          setItem((prev) => ({ ...prev, quantidade: val }));
        },
        [setItem, showSnackbar]
      );

      // Adiciona item ao pedido
      const adicionarItem = useCallback(() => {
        const { nome, codigo, valorUnitario, quantidade } = item;

        if (!nome.trim() || !codigo.trim() || !valorUnitario || !quantidade) {
          showSnackbar(
            "Preencha todos os campos do item corretamente!",
            "warning"
          );
          return;
        }

        const qtd = Number(quantidade);
        const valor = Number(valorUnitario);

        if (isNaN(qtd) || isNaN(valor) || qtd <= 0 || valor <= 0) {
          showSnackbar(
            "Quantidade e valor devem ser números positivos!",
            "warning"
          );
          return;
        }

        if (valor > 999999) {
          showSnackbar(
            "O valor unitário não pode ser maior que R$ 999.999,00!",
            "warning"
          );
          return;
        }

        const totalItem = Number((valor * qtd).toFixed(2));

        const novoItem = {
          id: Number(codigo),
          nome: nome.trim(),
          codigo: codigo.trim(),
          valorUnitario: Number(valor.toFixed(2)), // 2 casas decimais
          quantidade: qtd,
          total: totalItem,
        };

        const itemJaExiste = pedido.produtos.some(
          (prod) => prod.codigo === novoItem.codigo
        );
        if (itemJaExiste) {
          showSnackbar("Este produto já foi adicionado ao pedido!", "warning");
          return;
        }

        setPedido((prev) => {
          const novosProdutos = [...prev.produtos, novoItem];
          const novoTotal = Number(
            novosProdutos.reduce((acc, curr) => acc + curr.total, 0).toFixed(2)
          );
          return { ...prev, produtos: novosProdutos, total: novoTotal };
        });

        setItem(INITIAL_ITEM_STATE);
      }, [item, pedido.produtos, showSnackbar]);

      // Remove item da lista pelo índice
      const removerItem = useCallback(
        (index) => {
          setPedido((prev) => {
            const novosProdutos = prev.produtos.filter((_, i) => i !== index);
            const novoTotal = novosProdutos.reduce(
              (acc, curr) => acc + curr.total,
              0
            );
            return { ...prev, produtos: novosProdutos, total: novoTotal };
          });
        },
        [setPedido]
      );

      // Submissão do pedido
      const handleSubmit = useCallback(
        (e) => {
          e.preventDefault();

          if (!pedido.fornecedor) {
            showSnackbar("Selecione um fornecedor antes de salvar!", "warning");
            return;
          }

          if (pedido.produtos.length === 0) {
            showSnackbar("Adicione pelo menos um item ao pedido!", "warning");
            return;
          }

          navigate("/visualizarpedido", { state: { pedido } });
        },
        [pedido, navigate, showSnackbar]
      );

      const handleCloseSnackbar = useCallback(() => {
        setSnackbar((prev) => ({ ...prev, open: false }));
      }, []);

      // Atualiza dados do fornecedor selecionado no Autocomplete
      const handleFornecedorChange = useCallback(
        async (_, newFornecedor) => {
          if (!newFornecedor) {
            // Caso o fornecedor seja removido (limpar seleção)
            setPedido((prev) => ({
              ...prev,
              fornecedor: "",
              cnpj: "",
              contato: "",
              responsavel: "",
              produtos: [], // Limpa produtos
              total: 0,
            }));
            setProdutosFornecedor([]);
            return;
          }

          setPedido((prev) => ({
            ...prev,
            fornecedor: newFornecedor,
            contato: newFornecedor.telefone,
            responsavel: newFornecedor.responsavel,
            produtos: [],
            total: 0,
          }));

          try {
            const produtos = await listarProdutosPorFornecedor(
              newFornecedor.id
            );
            setProdutosFornecedor(produtos);
          } catch (error) {
            console.error("Erro ao buscar produtos por fornecedor:", error);
            showSnackbar(
              "Erro ao carregar produtos desse fornecedor.",
              "error"
            );
          }
        },
        [setPedido, showSnackbar]
      );

      return (
        <Paper sx={{ p: 4, maxWidth: 1200, mx: "auto", mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            🛒 Montar Pedido de Compra
          </Typography>

          {/* Dados do Fornecedor */}
          <Box sx={{ mb: 3 }}>
            <Autocomplete
              options={fornecedores}
              getOptionLabel={(option) => option.nome || ""}
              onChange={handleFornecedorChange}
              isOptionEqualToValue={(option, value) =>
                option.nome === value.nome
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Fornecedor"
                  fullWidth
                  sx={estiloInput}
                />
              )}
              clearOnEscape
            />

            {pedido.fornecedor && (
              <Typography sx={{ mt: 1 }} component="div" aria-live="polite">
                <strong>Nome:</strong> {pedido.fornecedor.nome} — <br />
                <strong>Responsável:</strong> {pedido.responsavel}
                <br />
                <strong>Contato:</strong> {pedido.contato}
              </Typography>
            )}
          </Box>
          {produtosFornecedor.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Produtos disponíveis desse fornecedor:
              </Typography>
              <TableContainer
                component={Paper}
                sx={{ border: "2px solid purple" }}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          backgroundColor: "#4B0082", // Roxo escuro
                          color: "white",
                          border: "1px solid purple",
                        }}
                      >
                        <strong>Produto</strong>
                      </TableCell>
                      <TableCell
                        sx={{
                          backgroundColor: "#4B0082", // Roxo escuro
                          color: "white",
                          border: "1px solid purple",
                        }}
                      >
                        <strong>Preço (R$)</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {produtosFornecedor.map((produto) => (
                      <TableRow key={produto.id}>
                        <TableCell sx={{ border: "1px solid purple" }}>
                          {produto.nome}
                        </TableCell>
                        <TableCell sx={{ border: "1px solid purple" }}>
                          {Number.isFinite(Number(produto.preco))
                            ? Number(produto.preco).toFixed(2)
                            : "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
          {pedido.fornecedor && (
            <>
              {/* Buscar Item */}
              <Paper sx={{ p: 2, mb: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6">Buscar Item</Typography>
                </Box>

                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      options={produtosFornecedor}
                      getOptionLabel={(option) => option.nome || ""}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          setItem((prev) => ({
                            ...prev,
                            nome: newValue.nome,
                            codigo: newValue.id.toString(),
                            valorUnitario: newValue.preco,
                          }));
                        } else {
                          setItem(INITIAL_ITEM_STATE);
                        }
                      }}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "purple",
                          },
                          "&:hover fieldset": {
                            borderColor: "darkviolet",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#4B0082",
                            boxShadow: "0 0 5px #4B0082",
                          },
                        },
                      }}
                      renderInput={(params) => (
                        <>
                          <label
                            htmlFor="nome-produto"
                            style={{
                              fontSize: 12,
                              fontWeight: "500",
                              color: "#4B0082",
                              marginBottom: 4,
                              display: "block",
                            }}
                          >
                            Nome do Produto
                          </label>
                          <TextField
                            {...params}
                            id="nome-produto"
                            fullWidth
                            sx={estiloInput}
                          />
                        </>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={2}>
                    <>
                      <label
                        htmlFor="codigo"
                        style={{
                          fontSize: 12,
                          fontWeight: "500",
                          color: "#4B0082",
                          marginBottom: 4,
                          display: "block",
                        }}
                      >
                        Código
                      </label>
                      <TextField
                        id="codigo"
                        name="codigo"
                        value={item.codigo}
                        onChange={handleItemChange}
                        fullWidth
                        disabled
                        sx={estiloInput}
                      />
                    </>
                  </Grid>

                  <Grid item xs={12} sm={6} md={2}>
                  <>
                      <label
                        htmlFor="codigo"
                        style={{
                          fontSize: 12,
                          fontWeight: "500",
                          color: "#4B0082",
                          marginBottom: 4,
                          display: "block",
                        }}
                      >
                        Valor Unitário
                      </label>
                    <NumericFormat
                      customInput={TextField}
                      variant="outlined"
                      name="valorUnitario"
                      value={item.valorUnitario}
                      onValueChange={handleValorUnitarioChange}
                      thousandSeparator="."
                      decimalSeparator=","
                      decimalScale={2}
                      fixedDecimalScale
                      allowNegative={false}
                      fullWidth
                     
                      sx={estiloInput}
                      />
                    </>
                  </Grid>

                  <Grid item xs={12} sm={6} md={2}>
                  <>
                      <label
                        htmlFor="codigo"
                        style={{
                          fontSize: 12,
                          fontWeight: "500",
                          color: "#4B0082",
                          marginBottom: 4,
                          display: "block",
                        }}
                      >
                        Quantidade
                      </label>
                    <NumericFormat
                      customInput={TextField}
                      variant="outlined"
                      name="quantidade"
                      value={item.quantidade}
                      onValueChange={handleQuantidadeChange}
                      thousandSeparator="."
                      decimalSeparator=","
              
                      fixedDecimalScale
                      allowNegative={false}
                      fullWidth
                      inputProps={{ maxLength: 10 }}
                    />
                  </>
                  </Grid>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 2,
                      mt: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={adicionarItem}
                      sx={{
                        backgroundColor: "#4B0082", // Roxo
                        "&:hover": { backgroundColor: "#5D3FD3" },
                      }}
                    >
                      Adicionar Item
                    </Button>

                    <Button
                      variant="contained"
                      onClick={() => navigate("/produtos")}
                      sx={{
                        backgroundColor: "#87CEFA", // Azul claro (LightSkyBlue)
                        color: "black",
                        "&:hover": { backgroundColor: "#00BFFF" }, // Hover: DeepSkyBlue
                      }}
                    >
                      Ver Produtos
                    </Button>
                  </Box>
                </Grid>
              </Paper>

              {/* Tabela de Produtos */}
              {pedido.produtos.length > 0 && (
                <TableContainer component={Paper} sx={{ mb: 3 }}>
                  <Table aria-label="Tabela de produtos adicionados">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{ backgroundColor: "#FFD700", color: "black" }}
                        >
                          Produto
                        </TableCell>
                        <TableCell
                          sx={{ backgroundColor: "#FFD700", color: "black" }}
                        >
                          Código
                        </TableCell>
                        <TableCell
                          sx={{ backgroundColor: "#FFD700", color: "black" }}
                        >
                          Quantidade
                        </TableCell>
                        <TableCell
                          sx={{ backgroundColor: "#FFD700", color: "black" }}
                        >
                          Preço Unitário
                        </TableCell>
                        <TableCell
                          sx={{ backgroundColor: "#FFD700", color: "black" }}
                        >
                          Total
                        </TableCell>
                        <TableCell
                          sx={{ backgroundColor: "#FFD700", color: "black" }}
                        >
                          Ações
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pedido.produtos.map((prod, index) => (
                        <TableRow
                          key={`${prod.codigo}-${index}`}
                          sx={{ backgroundColor: "#FFFACD" }}
                        >
                          <TableCell>{prod.nome}</TableCell>
                          <TableCell>{prod.codigo}</TableCell>
                          <TableCell>{prod.quantidade}</TableCell>
                          <TableCell>
                            R${" "}
                            {prod.valorUnitario !== undefined &&
                            prod.valorUnitario !== null
                              ? prod.valorUnitario.toFixed(2)
                              : "0.00"}
                          </TableCell>
                          <TableCell>
                            R${" "}
                            {prod.total !== undefined && prod.total !== null
                              ? prod.total.toFixed(2)
                              : "0.00"}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              color="error"
                              aria-label={`Remover produto ${prod.nome}`}
                              onClick={() => removerItem(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}

              {/* Pedido */}
              <Paper sx={{ p: 2, mb: 3, backgroundColor: "#F5F5F5" }}>
                <Typography variant="h6" gutterBottom>
                  📋 Dados do Pedido
                </Typography>
                <Typography>
                  <strong>Data do Pedido:</strong> {pedido.data}
                </Typography>
                <Typography>
                  <strong>Total do Pedido:</strong> R$ {pedido.total.toFixed(2)}
                </Typography>
                <Typography>
                  <strong>Status:</strong> {pedido.status}
                </Typography>
              </Paper>

              {/* Botões */}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "flex-end",
                  mt: 3,
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ minWidth: 180 }}
                  onClick={() => navigate("/pedidos")}
                >
                  Consultar Pedidos
                </Button>

                <Button
                  variant="contained"
                  color="success"
                  sx={{ minWidth: 180 }}
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!pedido.fornecedor || pedido.produtos.length === 0}
                >
                  Salvar Pedido
                </Button>

                <Button
                  variant="outlined"
                  sx={{ minWidth: 120 }}
                  onClick={() => navigate(-1)}
                >
                  Voltar
                </Button>
              </Box>
            </>
          )}

          {/* Snackbar */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbar.severity}
              sx={{ width: "100%" }}
              elevation={6}
              variant="filled"
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Paper>
      );
    }
