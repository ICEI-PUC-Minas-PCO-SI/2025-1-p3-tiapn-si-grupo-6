package com.erpet.erpetaplication.service;

import java.util.List;
import com.erpet.erpetaplication.model.Fornecedor;
import com.erpet.erpetaplication.model.Produto;

public interface IServiceFornecedor {

    // Cadastra um fornecedor e retorna o objeto cadastrado
    Fornecedor cadastrarFornecedor(Fornecedor fornecedor);

    // Busca fornecedor pelo ID
    Fornecedor buscarPorId(Integer id);

    // Lista todos fornecedores ativos
    List<Fornecedor> listarTodos();

    // Lista todos fornecedores, incluindo excluídos
    List<Fornecedor> listarTodosIncluindoExcluidos();

    // Busca fornecedores filtrando por nome
    List<Fornecedor> buscarPorNome(String nome);

    // Edita um fornecedor existente e retorna o objeto atualizado
    Fornecedor editarFornecedor(Integer id, Fornecedor fornecedor);


    // Exclui fornecedor pelo ID
    Fornecedor excluirFornecedor(Integer id);

    List<Produto> listarProdutosPorFornecedor(Integer idFornecedor);

}