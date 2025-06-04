package com.erpet.erpetaplication.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.erpet.erpetaplication.dao.ClienteDAO;
import com.erpet.erpetaplication.model.Cliente;
import com.erpet.erpetaplication.service.IClienteService;


@Service
public class ServiceClienteImpl implements IClienteService {

    @Autowired
    private ClienteDAO dao;

    @Override
public Cliente cadastrarCliente(Cliente cliente) {
    return salvarCliente(cliente); 
}

    @Override
    public Cliente salvarCliente(Cliente cliente) {
        cliente.setDataInclusao(LocalDateTime.now());
        return dao.save(cliente);
    }

    @Override
    public List<Cliente> buscarPorNome(String nome) {
        return dao.findByNomeContainingIgnoreCase(nome);
    }

    @Override
    public Cliente excluirCliente(Long id) {
        Cliente cliente = dao.findById(id)
            .orElseThrow(() -> new RuntimeException("Cliente não encontrado para exclusão."));
        cliente.setDataExclusao(LocalDateTime.now());
        return dao.save(cliente);
    }

    @Override
    public Cliente editarCliente(Long id, Cliente novosDados) {
        Cliente clienteExistente = dao.findById(id)
            .orElseThrow(() -> new RuntimeException("Cliente não encontrado."));

        clienteExistente.setNome(novosDados.getNome());
        clienteExistente.setEmail(novosDados.getEmail());
        clienteExistente.setEndereco(novosDados.getEndereco());
        clienteExistente.setCEP(novosDados.getCEP());
        clienteExistente.setBairro(novosDados.getBairro());
        clienteExistente.setLogradouro(novosDados.getLogradouro());
        clienteExistente.setNumero(novosDados.getNumero());

        return dao.save(clienteExistente);
    }
    @Override
    public List<Cliente> listarTodos() {
        return dao.findAll();
    }

    @Override
    public List<Cliente> listarTodosNaoExcluidos() {
        return dao.findByDataExclusaoIsNull();
    }

}
