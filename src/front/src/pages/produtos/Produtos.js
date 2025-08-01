import React, { useEffect, useState } from "react";
import {
    getProdutos,
    buscarPorNome,
    filtrarPorTipo,
    excluirProduto,
    getProdutosIncluindoExcluidos,
    obterFotoProduto,
} from "../../api/produtos";
import ProductIcon from "@mui/icons-material/Inventory";
import BotaoPesquisar from "../../components/ui/BotaoPesquisar";
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
} from "@mui/material";
import { getCategorias } from "../../api/categoria";
import { getFornecedores } from "../../api/fornecedores";

const styles = {
    container: {
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        padding: "1rem",
    },
    wrapper: {
        width: "100%",
        maxWidth: "calc(100vw - 240px)",
        margin: "0 auto",
        padding: "1rem",
        boxSizing: "border-box",
    },
    cardsContainer: {
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        justifyContent: "flex-start",
    },
    card: {
        backgroundColor: "white",
        borderRadius: "0.5rem",
        boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        overflow: "hidden",
        flex: "1 1 calc(33.333% - 1rem)", // largura ~1/3 menos a gap
        maxWidth: "calc(33.333% - 1rem)",
        minWidth: "250px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        minWidth: "250px",
    },
    cardImage: {
        width: "100%",
        height: "auto", // altura automática
        maxHeight: "200px", // limite máximo opcional
        objectFit: "contain",
        display: "block",
        margin: "0 auto",
    },

    cardContent: {
        padding: "1rem",
        flexGrow: 1,
    },
    actionButtons: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "0.5rem",
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
    loadingText: {
        padding: "2rem",
        textAlign: "center",
        color: "#6b7280",
    },
};

function ProdutoCard({ produto, onEditar, onExcluir, mostrarExcluidos }) {
    const [urlFoto, setUrlFoto] = useState(null);

    useEffect(() => {
        async function carregarFoto() {
            try {
                const url = await obterFotoProduto(produto.id);
                setUrlFoto(url);
            } catch {
                setUrlFoto(null);
            }
        }
        carregarFoto();

        return () => {
            if (urlFoto) URL.revokeObjectURL(urlFoto);
        };
    }, [produto.id]);

    return (
        <div style={styles.card}>
            {urlFoto ? (
                <img src={urlFoto} alt={produto.nome} style={styles.cardImage} />
            ) : (
                <div
                    style={{
                        ...styles.cardImage,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#9ca3af",
                    }}
                >
                    Sem foto
                </div>
            )}

            <div style={styles.cardContent}>
                <h2>{produto.nome}</h2>
                <p>
                    <b>Categoria:</b> {produto.categoria?.nome || "Sem categoria"}
                </p>
                <p>
                    <b>Fornecedor:</b> {produto.fornecedor?.nome || "Sem fornecedor"}
                </p>
                <p>
                    <b>Quantidade:</b> {produto.quantidade}
                </p>
                <p>
                    <b>Preço:</b> R$ {Number(produto.preco).toFixed(2)}
                </p>
                <p>
                    <b>Validade:</b>{" "}
                    {produto.dataValidade
                        ? new Date(produto.dataValidade).toLocaleDateString()
                        : "Sem validade"}
                </p>
            </div>
            <div style={styles.actionButtons}>
                <BotaoEditar onClick={() => onEditar(produto.id)} />
                <BotaoExcluir
                    onClick={() => onExcluir(produto)}
                    disabled={mostrarExcluidos}
                />
            </div>
        </div>
    );
}

export default function Produtos() {
    const [categorias, setCategorias] = useState([]);
    const [fornecedores, setFornecedores] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [busca, setBusca] = useState("");
    const [filtroTipo, setFiltroTipo] = useState("todos");
    const [carregando, setCarregando] = useState(true);
    const [mostrarExcluidos, setMostrarExcluidos] = useState(false);
    const [produtoParaExcluir, setProdutoParaExcluir] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });
    const navigate = useNavigate();

    useEffect(() => {
        async function carregarDados() {
            try {
                const [cats, fors] = await Promise.all([
                    getCategorias(),
                    getFornecedores(),
                ]);
                setCategorias(cats);
                setFornecedores(fors);
                await carregarProdutos();
            } catch (error) {
                mostrarMensagem("Erro ao carregar dados iniciais", "error");
            }
        }
        carregarDados();
    }, [mostrarExcluidos]);

    async function carregarProdutos() {
        try {
            setCarregando(true);
            const data = mostrarExcluidos
                ? await getProdutosIncluindoExcluidos()
                : await getProdutos();
            setProdutos(data);
        } catch (error) {
            mostrarMensagem("Erro ao carregar produtos", "error");
        } finally {
            setCarregando(false);
        }
    }

    async function handlePesquisar() {
        try {
            setCarregando(true);
            const data = await buscarPorNome(busca);
            setProdutos(data);
        } catch (error) {
            mostrarMensagem("Erro ao pesquisar produtos", "error");
        } finally {
            setCarregando(false);
        }
    }

    async function handleFiltrarPorTipo(tipo) {
        setFiltroTipo(tipo);
        try {
            setCarregando(true);
            if (tipo === "todos") {
                await carregarProdutos();
            } else {
                const data = await filtrarPorTipo(tipo);
                setProdutos(data);
            }
        } catch (error) {
            mostrarMensagem("Erro ao filtrar produtos", "error");
        } finally {
            setCarregando(false);
        }
    }

    async function handleExcluirProduto() {
        try {
            setCarregando(true);
            await excluirProduto(produtoParaExcluir.id);
            mostrarMensagem("Produto excluído com sucesso", "success");
            setProdutoParaExcluir(null);
            await carregarProdutos();
        } catch (error) {
            mostrarMensagem("Erro ao excluir produto", "error");
        } finally {
            setCarregando(false);
        }
    }

    function mostrarMensagem(message, severity) {
        setSnackbar({
            open: true,
            message,
            severity,
        });
    }

    function handleCloseSnackbar() {
        setSnackbar({ ...snackbar, open: false });
    }

    // Filtra produtos localmente pelo nome, mesmo após busca/filtro
    const produtosFiltrados = produtos.filter((produto) =>
        produto?.nome?.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <div style={styles.container}>
            <div style={styles.wrapper}>
                <div
                    style={{
                        backgroundColor: "white",
                        borderRadius: "0.5rem",
                        padding: "1rem",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                        width: "100%",               // ocupa toda a largura possível
                        boxSizing: "border-box",     // respeita padding
                        minWidth: "1000px",
                    }}
                >
                    {/* Header */}
                    <div style={styles.header}>
                        <ProductIcon
                            style={{ fontSize: 32, color: "#6b7280", marginRight: "12px" }}
                        />
                        <h1 style={styles.title}>Gestão de Produtos</h1>
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
                            <label
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    marginLeft: "auto",
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={mostrarExcluidos}
                                    onChange={(e) => setMostrarExcluidos(e.target.checked)}
                                />
                                Mostrar excluídos
                            </label>

                            <BotaoCadastrar onClick={() => navigate("/produtos/cadastrar")} />
                        </div>
                    </div>

                    {/* Cards */}
                    <div style={styles.cardsContainer}>
                        {carregando ? (
                            <div style={styles.loadingText}>Carregando produtos...</div>
                        ) : produtosFiltrados.length === 0 ? (
                            <div>Nenhum produto encontrado.</div>
                        ) : (
                            produtosFiltrados
                                .filter((produto) => produto && produto.nome)
                                .map((produto) => (
                                    <ProdutoCard
                                        key={produto.id}
                                        produto={produto}
                                        mostrarExcluidos={mostrarExcluidos}
                                        onEditar={(id) => navigate(`/produtos/editar/${id}`)}
                                        onExcluir={(produto) => setProdutoParaExcluir(produto)}
                                    />
                                ))
                        )}
                    </div>
                </div>
            </div>

            {/* Dialog de Confirmação de Exclusão */}
            <Dialog open={!!produtoParaExcluir} onClose={() => setProdutoParaExcluir(null)}>
                <DialogTitle>Confirmar Exclusão</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tem certeza que deseja excluir o produto {produtoParaExcluir?.nome}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setProdutoParaExcluir(null)} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleExcluirProduto} color="error" autoFocus>
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
