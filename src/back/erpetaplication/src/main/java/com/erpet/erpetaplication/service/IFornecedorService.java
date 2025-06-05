package com.erpet.erpetaplication.service;

import java.util.List;
import com.erpet.erpetaplication.model.Fornecedor;

public interface IFornecedorService {

    // Cadastra um fornecedor e retorna o objeto cadastrado
    Fornecedor cadastrarFornecedor(Fornecedor fornecedor);

    // Busca fornecedor pelo ID
    Fornecedor buscarPorId(Long id);

    // Lista todos fornecedores ativos
    List<Fornecedor> listarTodos();

    // Lista todos fornecedores, incluindo excluídos
    List<Fornecedor> listarTodosIncluindoExcluidos();

    // Busca fornecedores filtrando por nome
    List<Fornecedor> buscarPorNome(String nome);

    // Edita um fornecedor existente e retorna o objeto atualizado
    Fornecedor editarFornecedor(Long id, Fornecedor fornecedor);


    // Exclui fornecedor pelo ID
    void excluirFornecedor(Long id);
}