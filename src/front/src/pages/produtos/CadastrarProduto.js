import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    MenuItem,
    Paper,
    Box,
    Snackbar,
    Alert,
    useTheme,
    useMediaQuery,
    Divider
} from '@mui/material';
import { criarProduto } from "../../api/produtos";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

const InputField = ({
    label,
    name,
    value,
    onChange,
    required = false,
    type = "text",
}) => (
    <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 0.5, color: "text.secondary" }}>
            {label}:
        </Typography>
        <TextField
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            fullWidth
            size="small"
            sx={{
                "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    "& fieldset": { borderColor: "#c2c2c2" },
                    "&:hover fieldset": { borderColor: "#6a1b9a" },
                    "&.Mui-focused fieldset": { borderColor: "#6a1b9a" },
                },
            }}
        />
    </Box>
);

function CadastrarProduto() {
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [produto, setProduto] = useState({
        nome: "",
        codigoBarras: "",
        descricao: "",
        quantidade: "",
        preco: "",
        data_validade: "",
        categoriaId: "",
        fornecedorId: "",
        disponivel: true,
    });

    const [categorias, setCategorias] = useState([]);
    const [fornecedores, setFornecedores] = useState([]);
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [fotoFile, setFotoFile] = useState(null);

    const handleFotoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFotoFile(e.target.files[0]);
        }
    };

    const handleCancelar = () => {
        setProduto({
            nome: "",
            codigoBarras: "",
            descricao: "",
            quantidade: "",
            preco: "",
            data_validade: "",
            categoriaId: "",
            fornecedorId: "",
            disponivel: true,
        });
        setErro("");
        setSucesso(false);
    };

    useEffect(() => {
        setCarregando(true);

        const usuario = JSON.parse(localStorage.getItem('usuario'));
        const token = usuario?.token;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        Promise.all([
            axios.get('http://localhost:8080/categorias', config),
            axios.get('http://localhost:8080/fornecedores/listar', config)
        ])
            .then(([categoriasResponse, fornecedoresResponse]) => {
                setCategorias(categoriasResponse.data);
                setFornecedores(fornecedoresResponse.data);
            })
            .catch(error => {
                console.error('Erro ao carregar dados:', error);
                setErro('Erro ao carregar categorias e fornecedores');

            })
            .finally(() => {
                setCarregando(false);
            });
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduto(prev => ({
            ...prev,
            [name]: name === 'disponivel' ? (value === 'true') : value
        }));
    };

    const validarCampos = () => {
        // adicionar validações de produto
        return true;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');
        setSucesso(false);

        if (!validarCampos()) {
            return;
        }

        setCarregando(true);

        try {
            const formData = new FormData();
            formData.append('nome', produto.nome);
            formData.append('descricao', produto.descricao);
            formData.append('quantidade', Number(produto.quantidade));
            formData.append('disponivel', produto.disponivel);
            formData.append('data_validade', produto.data_validade + "T00:00:00");
            formData.append('preco', Number(produto.preco));
            formData.append('categoriaId', Number(produto.categoriaId));
            formData.append('fornecedorId', Number(produto.fornecedorId));
            formData.append('codigoBarras', produto.codigoBarras);

            if (fotoFile) {
                formData.append('foto', fotoFile);
            }

            const usuario = JSON.parse(localStorage.getItem('usuario'));
            const token = usuario?.token;

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            };

            const response = await axios.post('http://localhost:8080/produtos/cadastrar', formData, config);

            if (response.status == 201 || response.status == 200) {
                setSucesso(true);
                setProduto({
                    nome: '',
                    codigoBarras: '',
                    descricao: '',
                    quantidade: '',
                    preco: '',
                    data_validade: '',
                    categoriaId: '',
                    fornecedorId: '',
                    disponivel: true,
                });
                setFotoFile(null);
                setTimeout(() => navigate('/produtos'), 1500);
            }
        } catch (error) {
            setErro('Erro ao cadastrar produto com foto.');
        } finally {
            setCarregando(false);
        }
    };
    // Estilos personalizados
    const styles = {
        container: {
            mt: 4,
            mb: 4,
            px: isSmallScreen ? 2 : 4,
        },
        paper: {
            p: 3,
            borderRadius: 4,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            background: "linear-gradient(to bottom, #f9f5ff, #ffffff)",
        },
        header: {
            display: "flex",
            alignItems: "center",
            mb: 3,
            paddingBottom: 2,
            borderBottom: "1px solid #e0d0ff",
        },
        title: {
            color: "#6a1b9a",
            fontWeight: 600,
            fontSize: isSmallScreen ? "1.5rem" : "1.75rem",
        },
        sectionTitle: {
            color: "#6a1b9a",
            fontWeight: 500,
            mb: 2,
            fontSize: isSmallScreen ? "1.1rem" : "1.25rem",
        },
        textField: {
            "& .MuiOutlinedInput-root": {
                "& fieldset": {
                    borderColor: "#d1c4e9",
                },
                "&:hover fieldset": {
                    borderColor: "#b39ddb",
                },
                "&.Mui-focused fieldset": {
                    borderColor: "#7e57c2",
                },
            },
        },
        button: {
            backgroundColor: "#7e57c2",
            color: "white",
            fontWeight: 600,
            padding: "10px 24px",
            borderRadius: 2,
            "&:hover": {
                backgroundColor: "#5e35b1",
                boxShadow: "0px 2px 10px rgba(126, 87, 194, 0.4)",
            },
            "&:disabled": {
                backgroundColor: "#d1c4e9",
            },
        },
        backButton: {
            color: "#7e57c2",
            fontWeight: 500,
            mr: 2,
            "&:hover": {
                backgroundColor: "rgba(126, 87, 194, 0.08)",
            },
        },
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
            }}
        >
            <Paper
                sx={{
                    width: "100%",
                    maxWidth: 950,
                    p: 4,
                    borderRadius: "16px",
                    border: "1px solid #6a1b9a",
                    bgcolor: "white",
                }}
                elevation={5}
            >
                <Typography
                    variant="h4"
                    mb={3}
                    align="center"
                    sx={{ color: "#6a1b9a", fontWeight: "bold" }}
                >
                    Cadastrar Produto 📦
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        {/* Coluna Esquerda */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" sx={{ color: "#6a1b9a" }}>
                                Dados Básicos
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <InputField
                                label="Nome"
                                name="nome"
                                value={produto.nome}
                                onChange={handleChange}
                                required
                            />
                            <InputField
                                label="Código de Barras"
                                name="codigoBarras"
                                value={produto.codigoBarras}
                                onChange={handleChange}
                            />
                            <InputField
                                label="Descrição"
                                name="descricao"
                                value={produto.descricao}
                                onChange={handleChange}
                                required
                            />
                            <InputField
                                label="Quantidade"
                                name="quantidade"
                                type="number"
                                value={produto.quantidade}
                                onChange={handleChange}
                                required
                            />
                            <InputField
                                label="Preço"
                                name="preco"
                                type="number"
                                value={produto.preco}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        {/* Coluna Direita */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" sx={{ color: "#6a1b9a" }}>
                                Informações Adicionais
                            </Typography>
                            <Divider sx={{ mb: 1.6 }} />
                            <Typography variant="subtitle2" sx={{ mb: 0.5, color: "rgb(102, 102, 102)" }}>
                                Foto
                            </Typography>
                            <TextField
                                name="foto"
                                type="file"
                                onChange={handleFotoChange}
                                fullWidth
                                size="small"
                                sx={{
                                    mb: 2,
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "10px",
                                        "& fieldset": { borderColor: "#c2c2c2" },
                                        "&:hover fieldset": { borderColor: "#6a1b9a" },
                                        "&.Mui-focused fieldset": { borderColor: "#6a1b9a" },
                                    },
                                }}
                                label={null}
                            />
                            <Typography variant="subtitle2" sx={{ mb: 0.5, color: "rgb(102, 102, 102)" }}>
                                Categoria
                            </Typography>
                            <TextField
                                select
                                fullWidth
                                size="small"
                                name="categoriaId"
                                value={produto.categoriaId}
                                onChange={handleChange}
                                required
                                sx={{ mb: 1.5 }}
                                label={null}
                            >
                                {categorias.map((c) => (
                                    <MenuItem key={c.id} value={c.id}>
                                        {c.nome}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Typography variant="subtitle2" sx={{ mb: 0.5, color: "rgb(102, 102, 102)" }}>
                                Fornecedor
                            </Typography>
                            <TextField
                                select
                                fullWidth
                                size="small"
                                name="fornecedorId"
                                value={produto.fornecedorId}
                                onChange={handleChange}
                                required
                                sx={{ mb: 1.8 }}
                                label={null}
                            >
                                {fornecedores.map((f) => (
                                    <MenuItem key={f.id} value={f.id}>
                                        {f.nome}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Typography variant="subtitle2" sx={{ mb: 0.5, color: "rgb(102, 102, 102)" }}>
                                Disponível
                            </Typography>
                            <TextField
                                select
                                fullWidth
                                size="small"
                                name="disponivel"
                                value={produto.disponivel}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                                label={null}
                            >
                                <MenuItem value={true}>Sim</MenuItem>
                                <MenuItem value={false}>Não</MenuItem>
                            </TextField>
                            <InputField
                                label="Data de Validade"
                                name="data_validade"
                                type="date"
                                value={produto.data_validade}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>

                    {/* Botões */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                        <Button
                            startIcon={<ArrowBackIcon />}
                            variant="outlined"
                            color="secondary"
                            onClick={() => navigate(-1)}
                        >
                            Voltar
                        </Button>
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={handleCancelar}
                                disabled={carregando}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ bgcolor: "#6a1b9a", "&:hover": { bgcolor: "#4a148c" } }}
                                disabled={carregando}
                            >
                                {carregando ? "Cadastrando..." : "Cadastrar"}
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Paper>

            {/* Snackbars */}
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

            <Snackbar
                open={sucesso}
                autoHideDuration={4000}
                onClose={() => setSucesso(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    severity="success"
                    onClose={() => setSucesso(false)}
                    variant="filled"
                >
                    Produto cadastrado com sucesso!
                </Alert>
            </Snackbar>
        </Box>
    );
}

function ajustarData(data) {
    if (!data) return null;
    if (data.includes('T')) return data;
    return data + "T00:00:00";
}

export default CadastrarProduto;