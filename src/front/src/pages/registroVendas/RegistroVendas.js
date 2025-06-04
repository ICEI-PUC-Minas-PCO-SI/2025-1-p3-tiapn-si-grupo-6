import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Image, Table, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import './RegistroVendas.css';

const RegistroVendas = () => {
  // Estados para formulário de venda
  const [produto, setProduto] = useState('');
  const [precoUnitario, setPrecoUnitario] = useState('');
  const [cliente, setCliente] = useState('');
  const [estoqueAtual, setEstoqueAtual] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [dataVenda, setDataVenda] = useState('');
  const [totalVenda, setTotalVenda] = useState('');
  
  // Estados para listagem e operações CRUD
  const [vendas, setVendas] = useState([]);
  const [vendaSelecionada, setVendaSelecionada] = useState(null);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [vendaParaExcluir, setVendaParaExcluir] = useState(null);
  
  // Estados para feedback
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  
  const navigate = useNavigate();
  
  // Verificar autenticação e carregar dados iniciais
  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario) {
      navigate('/login');
      return;
    }
    
    // Definir data atual como padrão
    const hoje = new Date().toISOString().split('T')[0];
    setDataVenda(hoje);
    
    // Carregar lista de vendas
    carregarVendas();
  }, [navigate]);
  
  // Carregar lista de vendas do backend
  const carregarVendas = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/vendas');
      setVendas(response.data);
    } catch (error) {
      console.error('Erro ao carregar vendas:', error);
      setErro('Não foi possível carregar a lista de vendas.');
    }
  };
  
  // Calcular total da venda quando preço ou quantidade mudar
  useEffect(() => {
    if (precoUnitario && quantidade) {
      const total = parseFloat(precoUnitario) * parseInt(quantidade);
      setTotalVenda(total.toFixed(2));
    } else {
      setTotalVenda('');
    }
  }, [precoUnitario, quantidade]);
  
  // Buscar estoque ao selecionar produto
  const buscarEstoque = async (produtoId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/vendas/produto/${produtoId}/estoque`);
      setEstoqueAtual(response.data.quantidade);
    } catch (error) {
      console.error('Erro ao buscar estoque:', error);
      setEstoqueAtual('Não disponível');
    }
  };
  
  const handleProdutoChange = async (e) => {
    const produtoSelecionado = e.target.value;
    setProduto(produtoSelecionado);
    
    // Aqui você buscaria o preço do produto selecionado
    // Simulando para o exemplo
    setPrecoUnitario('29.90');
    
    // Buscar estoque
    buscarEstoque(1); // Simulando ID 1
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');
    
    // Validações básicas
    if (!produto || !cliente || !quantidade || !dataVenda) {
      setErro('Todos os campos são obrigatórios');
      return;
    }
    
    if (parseInt(quantidade) <= 0) {
      setErro('A quantidade deve ser maior que zero');
      return;
    }
    
    if (parseInt(quantidade) > parseInt(estoqueAtual)) {
      setErro('Quantidade solicitada maior que o estoque disponível');
      return;
    }
    
    try {
      const usuario = JSON.parse(localStorage.getItem('usuario'));
      
      const venda = {
        clienteId: 1, // Simulando ID do cliente
        usuarioId: usuario.id,
        dataVenda: dataVenda,
        itens: [
          {
            produtoId: 1, // Simulando ID do produto
            quantidade: parseInt(quantidade)
          }
        ]
      };
      
      if (modoEdicao && vendaSelecionada) {
        // Atualizar venda existente
        await axios.put(`http://localhost:8080/api/vendas/${vendaSelecionada.id}`, venda);
        setSucesso('Venda atualizada com sucesso!');
      } else {
        // Criar nova venda
        await axios.post('http://localhost:8080/api/vendas', venda);
        setSucesso('Venda registrada com sucesso!');
      }
      
      // Limpar formulário e recarregar lista
      limparFormulario();
      carregarVendas();
      
    } catch (error) {
      setErro('Erro ao processar venda. Por favor, tente novamente.');
      console.error('Erro ao processar venda:', error);
    }
  };
  
  const handleEditar = (venda) => {
    setVendaSelecionada(venda);
    setModoEdicao(true);
    
    // Preencher formulário com dados da venda
    setProduto(venda.itens[0]?.produto?.nome || '');
    setPrecoUnitario(venda.itens[0]?.precoUnitario?.toString() || '');
    setQuantidade(venda.itens[0]?.quantidade || 1);
    setCliente(venda.cliente?.nome || '');
    setDataVenda(venda.dataVenda || '');
    setTotalVenda(venda.valorTotal?.toString() || '');
    
    // Buscar estoque atual
    if (venda.itens[0]?.produto?.id) {
      buscarEstoque(venda.itens[0].produto.id);
    }
  };
  
  const handleExcluir = (venda) => {
    setVendaParaExcluir(venda);
    setShowModal(true);
  };
  
  const confirmarExclusao = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/vendas/${vendaParaExcluir.id}`);
      setSucesso('Venda excluída com sucesso!');
      setShowModal(false);
      carregarVendas();
    } catch (error) {
      setErro('Erro ao excluir venda. Por favor, tente novamente.');
      console.error('Erro ao excluir venda:', error);
    }
  };
  
  const limparFormulario = () => {
    setProduto('');
    setPrecoUnitario('');
    setCliente('');
    setEstoqueAtual('');
    setQuantidade(1);
    setTotalVenda('');
    setErro('');
    setSucesso('');
    setModoEdicao(false);
    setVendaSelecionada(null);
  };

  return (
    <div className="registro-vendas-page d-flex flex-column min-vh-100">
      <div className="d-flex flex-grow-1">
        <Sidebar />
        
        <div className="content-area d-flex flex-column flex-grow-1">
          <Header />
          
          <div className="content">
            <div className="form-container">
              <div className="form-title">
                <Image src="/registro-vendas-icon.png" alt="Registro de Vendas" className="form-icon" />
                <h2>{modoEdicao ? 'Editar Venda' : 'Registro de Vendas'}</h2>
              </div>
              
              {erro && <div className="alert alert-danger">{erro}</div>}
              {sucesso && <div className="alert alert-success">{sucesso}</div>}
              
              <Form onSubmit={handleSubmit}>
                <Row className="form-row">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Produto:</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={produto}
                        onChange={handleProdutoChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Quantidade:</Form.Label>
                      <Form.Control 
                        type="number" 
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        min="1"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row className="form-row">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Preço Unitário:</Form.Label>
                      <Form.Control 
                        type="number" 
                        step="0.01" 
                        value={precoUnitario}
                        onChange={(e) => setPrecoUnitario(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Data da Venda:</Form.Label>
                      <Form.Control 
                        type="date" 
                        value={dataVenda}
                        onChange={(e) => setDataVenda(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row className="form-row">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Cliente:</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={cliente}
                        onChange={(e) => setCliente(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Total de venda:</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={totalVenda}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row className="form-row">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Estoque Atual:</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={estoqueAtual}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <div className="form-actions">
                  <Button variant="secondary" onClick={limparFormulario}>
                    Cancelar
                  </Button>
                  <Button variant="primary" type="submit">
                    {modoEdicao ? 'Atualizar' : 'Registrar'}
                  </Button>
                </div>
              </Form>
            </div>
            
            {/* Lista de Vendas */}
            <div className="vendas-lista mt-4">
              <h3>Vendas Registradas</h3>
              
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Data</th>
                    <th>Cliente</th>
                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Total</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {vendas.map((venda) => (
                    <tr key={venda.id}>
                      <td>{venda.id}</td>
                      <td>{new Date(venda.dataVenda).toLocaleDateString()}</td>
                      <td>{venda.cliente?.nome || 'N/A'}</td>
                      <td>{venda.itens[0]?.produto?.nome || 'N/A'}</td>
                      <td>{venda.itens[0]?.quantidade || 0}</td>
                      <td>R$ {venda.valorTotal?.toFixed(2) || '0.00'}</td>
                      <td>
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          className="me-2"
                          onClick={() => handleEditar(venda)}
                        >
                          Editar
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleExcluir(venda)}
                        >
                          Excluir
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {vendas.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center">Nenhuma venda registrada</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
          
          <Footer />
        </div>
      </div>
      
      {/* Modal de Confirmação de Exclusão */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir esta venda? Esta ação não pode ser desfeita.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmarExclusao}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RegistroVendas;
