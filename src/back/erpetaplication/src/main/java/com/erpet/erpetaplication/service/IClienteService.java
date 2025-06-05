package com.erpet.erpetaplication.service;

import java.util.List;
import com.erpet.erpetaplication.model.Cliente;


public interface IClienteService {

    Cliente salvarCliente(Cliente cliente);

    Cliente cadastrarCliente(Cliente cliente);

    List<Cliente> buscarPorNome(String nome);

    List<Cliente> listarTodosNaoExcluidos();

    List<Cliente> listarTodos();

    Cliente editarCliente(Long id, Cliente novosDados);
    
    Cliente excluirCliente(Long id);
}
