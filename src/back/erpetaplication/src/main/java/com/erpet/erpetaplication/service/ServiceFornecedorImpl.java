package com.erpet.erpetaplication.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.erpet.erpetaplication.dao.FornecedorDAO;
import com.erpet.erpetaplication.model.Fornecedor;

@Service
public class ServiceFornecedorImpl implements IFornecedorService {

    @Autowired
    private FornecedorDAO fornecedorDAO;

    @Override
    public Fornecedor cadastrarFornecedor(Fornecedor fornecedor) {
        fornecedor.setDataInclusao(LocalDateTime.now());
        return fornecedorDAO.save(fornecedor);
    }

    @Override
    public Fornecedor buscarPorId(Long id) {
        return fornecedorDAO.findById(id).orElse(null);
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
    public Fornecedor editarFornecedor(Long id, Fornecedor fornecedor) {
        Optional<Fornecedor> fornecedorExistenteOpt = fornecedorDAO.findById(id);
        if (!fornecedorExistenteOpt.isPresent()) {
            throw new RuntimeException("Fornecedor não encontrado com id " + id);
        }
    
        Fornecedor fornecedorExistente = fornecedorExistenteOpt.get();
    
        // Atualiza os campos
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
    
        // Atualiza data de modificação, se tiver (opcional)
        
    
        return fornecedorDAO.save(fornecedorExistente);
    }
    @Override
    public void excluirFornecedor(Long id) {
        Optional<Fornecedor> fornecedorOpt = fornecedorDAO.findById(id);
        if (fornecedorOpt.isPresent()) {
            Fornecedor fornecedor = fornecedorOpt.get();
            fornecedor.setDataExclusao(LocalDateTime.now());
            fornecedorDAO.save(fornecedor);
        }
    }
}