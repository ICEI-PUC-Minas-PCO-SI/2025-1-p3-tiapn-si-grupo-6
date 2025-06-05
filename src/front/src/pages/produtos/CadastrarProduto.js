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
    useMediaQuery
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

function CadastrarProduto() {
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [produto, setProduto] = useState({
        nome: '',
        descricao: '',
        quantidade: '',
        disponivel: true,
        data_inclusao: '',
        data_exclusao: '',
        data_validade: '',
        preco: '',
        link_foto: '',
        categoria_id: '',
        fornecedor_id: ''
    });

    const [categorias, setCategorias] = useState([]);
    const [fornecedores, setFornecedores] = useState([]);
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState(false);
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
        setCarregando(true);

        Promise.all([
            axios.get('http://localhost:8080/categorias'),
            axios.get('http://localhost:8080/fornecedores/listar')
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

        if (!validarCampos()) {
            return;
        }

        try {
            setCarregando(true);

            const dadosProduto = {
                nome: produto.nome,
                descricao: produto.descricao,
                quantidade: Number(produto.quantidade),
                disponivel: produto.disponivel,
                data_inclusao: produto.data_inclusao,
                data_exclusao: produto.data_exclusao,
                data_validade: ajustarData(produto.data_validade),
                preco: Number(produto.preco),
                link_foto: produto.link_foto,
                categoriaId: Number(produto.categoria_id),
                fornecedorId: Number(produto.fornecedor_id)
            };

            if (isNaN(dadosProduto.categoriaId)) {
                setErro('Categoria ID deve ser um número válido.');
                setCarregando(false);
                return;
            }

            const response = await axios.post('http://localhost:8080/produtos', dadosProduto);

            if (response.status == 201 || response.status == 200) {
                setSucesso(true);
                setTimeout(() => {
                    navigate('/produtos');
                }, 1500);
            }
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            if (error.response) {
                setErro(`Erro ao cadastrar produto: ${error.response.data.message || error.response.statusText}`);
            } else {
                setErro('Erro de conexão. Verifique sua internet e tente novamente.');
            }
        } finally {
            setCarregando(false);
        }
    };

    // Estilos personalizados
    const styles = {
        container: {
            mt: 4,
            mb: 4,
            px: isSmallScreen ? 2 : 4
        },
        paper: {
            p: 3,
            borderRadius: 4,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            background: 'linear-gradient(to bottom, #f9f5ff, #ffffff)'
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            mb: 3,
            paddingBottom: 2,
            borderBottom: '1px solid #e0d0ff'
        },
        title: {
            color: '#6a1b9a',
            fontWeight: 600,
            fontSize: isSmallScreen ? '1.5rem' : '1.75rem'
        },
        sectionTitle: {
            color: '#6a1b9a',
            fontWeight: 500,
            mb: 2,
            fontSize: isSmallScreen ? '1.1rem' : '1.25rem'
        },
        textField: {
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: '#d1c4e9',
                },
                '&:hover fieldset': {
                    borderColor: '#b39ddb',
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#7e57c2',
                }
            }
        },
        button: {
            backgroundColor: '#7e57c2',
            color: 'white',
            fontWeight: 600,
            padding: '10px 24px',
            borderRadius: 2,
            '&:hover': {
                backgroundColor: '#5e35b1',
                boxShadow: '0px 2px 10px rgba(126, 87, 194, 0.4)'
            },
            '&:disabled': {
                backgroundColor: '#d1c4e9'
            }
        },
        backButton: {
            color: '#7e57c2',
            fontWeight: 500,
            mr: 2,
            '&:hover': {
                backgroundColor: 'rgba(126, 87, 194, 0.08)'
            }
        }
    };

    return (
        <Container maxWidth="md" sx={styles.container}>
            <Paper elevation={3} sx={styles.paper}>
                <Box sx={styles.header}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate('/produtos')}
                        sx={styles.backButton}
                    >
                        Voltar
                    </Button>
                    <Typography variant="h5" component="h1" sx={styles.title}>
                        Cadastrar Novo Produto
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        {/* Título */}
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={styles.sectionTitle}>
                                Dados do Produto
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Nome"
                                name="nome"
                                value={produto.nome}
                                onChange={handleChange}
                                required
                                sx={styles.textField}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Descrição"
                                name="descricao"
                                value={produto.descricao}
                                onChange={handleChange}
                                required
                                sx={styles.textField}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Quantidade"
                                name="quantidade"
                                type="number"
                                value={produto.quantidade}
                                onChange={handleChange}
                                required
                                sx={styles.textField}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                select
                                label="Disponível"
                                name="disponivel"
                                value={produto.disponivel}
                                onChange={handleChange}
                                required
                                sx={{ ...styles.textField, minWidth: '100px' }}
                            >
                                <MenuItem value={true}>Sim</MenuItem>
                                <MenuItem value={false}>Não</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Preço"
                                name="preco"
                                type="number"
                                value={produto.preco}
                                onChange={handleChange}
                                required
                                sx={styles.textField}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Data de Validade"
                                name="data_validade"
                                type="date"
                                value={produto.data_validade}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                sx={styles.textField}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Link da Foto"
                                name="link_foto"
                                value={produto.link_foto}
                                onChange={handleChange}
                                sx={styles.textField}
                            />
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <TextField
                                fullWidth
                                label="Categoria"
                                name="categoria_id"
                                value={produto.categoria_id}
                                onChange={handleChange}
                                required
                                select
                                sx={{ ...styles.textField, minWidth: '180px' }}
                            >
                                {categorias.map(categoria => (
                                    <MenuItem key={categoria.id} value={categoria.id}>
                                        {categoria.nome}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                fullWidth
                                label="Fornecedor"
                                name="fornecedor_id"
                                value={produto.fornecedor_id}
                                onChange={handleChange}
                                required
                                sx={{ ...styles.textField, minWidth: '200px' }}
                            >
                                {fornecedores.map((fornecedor) => (
                                    <MenuItem key={fornecedor.id} value={fornecedor.id}>
                                        {fornecedor.nome}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                            <Button
                                variant="contained"
                                type="submit"
                                disabled={carregando}
                                sx={styles.button}
                            >
                                {carregando ? 'Cadastrando...' : 'Cadastrar Produto'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

            {/* Feedback de erro */}
            <Snackbar
                open={!!erro}
                autoHideDuration={6000}
                onClose={() => setErro('')}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setErro('')}
                    severity="error"
                    sx={{
                        width: '100%',
                        bgcolor: 'error.light',
                        color: 'error.contrastText'
                    }}
                >
                    {erro}
                </Alert>
            </Snackbar>

            {/* Feedback de sucesso */}
            <Snackbar
                open={sucesso}
                autoHideDuration={6000}
                onClose={() => {
                    setSucesso(false);
                    navigate('/produtos');
                }}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSucesso(false)}
                    severity="success"
                    sx={{
                        width: '100%',
                        bgcolor: 'success.light',
                        color: 'success.contrastText'
                    }}
                >
                    Produto cadastrado com sucesso!
                </Alert>
            </Snackbar>
        </Container>
    );
}

function ajustarData(data) {
    if (!data) return null;
    if (data.includes('T')) return data;
    return data + "T00:00:00";
}

export default CadastrarProduto;