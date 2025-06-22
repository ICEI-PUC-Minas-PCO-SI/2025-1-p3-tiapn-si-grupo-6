package com.erpet.erpetaplication.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.erpet.erpetaplication.dao.FornecedorDAO;
import com.erpet.erpetaplication.dao.ProdutoDAO;
import com.erpet.erpetaplication.model.Fornecedor;
import com.erpet.erpetaplication.model.Produto;

@Service
public class ServiceFornecedorImpl implements IServiceFornecedor {

    @Autowired
    private FornecedorDAO fornecedorDAO;

    @Autowired
    private ProdutoDAO produtoDAO;

    @Override
    public Fornecedor cadastrarFornecedor(Fornecedor fornecedor) {
        fornecedor.setDataInclusao(LocalDateTime.now());
        return fornecedorDAO.save(fornecedor);
    }

    @Override
    public Fornecedor buscarPorId(Integer id) {
        return fornecedorDAO.findById(id)
                .orElseThrow(() -> new RuntimeException("Fornecedor não encontrado"));
    }

    @Override
    public List<Fornecedor> listarTodos() {
        return fornecedorDAO.findByDataExclusaoIsNull();
    }

    @Override
    public List<Fornecedor> listarTodosIncluindoExcluidos() {
        return fornecedorDAO.findAll();
    }

    @Override
    public List<Fornecedor> buscarPorNome(String nome) {
        return fornecedorDAO.findByNomeContainingIgnoreCaseAndDataExclusaoIsNull(nome);
    }

    @Override
    public Fornecedor editarFornecedor(Integer id, Fornecedor fornecedor) {
        Fornecedor fornecedorExistente = buscarPorId(id);
        fornecedorExistente.setNome(fornecedor.getNome());
        fornecedorExistente.setTelefone(fornecedor.getTelefone());
        fornecedorExistente.setEmail(fornecedor.getEmail());
        fornecedorExistente.setResponsavel(fornecedor.getResponsavel());
        fornecedorExistente.setObservacoes(fornecedor.getObservacoes());
        fornecedorExistente.setCep(fornecedor.getCep());
        fornecedorExistente.setLogradouro(fornecedor.getLogradouro());
        fornecedorExistente.setBairro(fornecedor.getBairro());
        fornecedorExistente.setCidade(fornecedor.getCidade());
        fornecedorExistente.setEstado(fornecedor.getEstado());

        return fornecedorDAO.save(fornecedorExistente);
    }

    @Override
    public Fornecedor excluirFornecedor(Integer id) {
        Fornecedor fornecedor = buscarPorId(id);
        fornecedor.setDataExclusao(LocalDateTime.now());
        return fornecedorDAO.save(fornecedor);
    }

    @Override
    public List<Produto> listarProdutosPorFornecedor(Integer idFornecedor) {
        Fornecedor fornecedor = fornecedorDAO.findById(idFornecedor)
                .orElseThrow(() -> new RuntimeException("Fornecedor não encontrado"));

        return produtoDAO.findByFornecedor(fornecedor);
    }
}