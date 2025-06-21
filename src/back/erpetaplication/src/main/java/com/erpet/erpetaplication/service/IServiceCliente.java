package com.erpet.erpetaplication.service;

import java.util.List;
import com.erpet.erpetaplication.model.Cliente;


public interface IServiceCliente {

    Cliente salvarCliente(Cliente cliente);

    Cliente cadastrarCliente(Cliente cliente);

    Cliente buscarPorId(Integer id);

    List<Cliente> buscarPorNome(String nome);
    
    Cliente buscarPorId(Long id);

    List<Cliente> listarTodosNaoExcluidos();

    List<Cliente> listarTodos();

    Cliente editarCliente(Integer id, Cliente novosDados);
    
    Cliente excluirCliente(Integer id);
}
