package com.erpet.erpetaplication.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.erpet.erpetaplication.dao.ClienteDAO;
import com.erpet.erpetaplication.model.Cliente;


@Service
public class ServiceClienteImpl implements IServiceCliente {

    @Autowired
    private ClienteDAO dao;

    @Override
public Cliente cadastrarCliente(Cliente cliente) {
    return salvarCliente(cliente); 
}

    @Override
    public Cliente buscarPorId(Integer id) {
        return dao.findById(id).orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
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
    public Cliente excluirCliente(Integer id) {
        Cliente cliente = buscarPorId(id);
        cliente.setDataExclusao(LocalDateTime.now());
        return dao.save(cliente);
    }

    @Override
    public Cliente editarCliente(Integer id, Cliente novosDados) {
        Cliente clienteExistente = buscarPorId(id);

        clienteExistente.setNome(novosDados.getNome());
        clienteExistente.setTelefone(novosDados.getTelefone());
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
