package com.erpet.erpetaplication.service;

import java.util.List;
import java.util.Optional;

import com.erpet.erpetaplication.model.Produto;

public interface IServiceProduto {
    List<Produto> listarTodos();

    // List<Produto> listarTodosDisponiveis();

    Produto salvarProduto(Produto produto);

    List<Produto> buscarPorNome(String nome);

    Optional<Produto> buscarPorId(Integer id);

    // List<Produto> filtrarPorCategoria(Integer categoriaId);

    Produto excluirProduto(Integer id);

    Produto editarProduto(Integer id, Produto novosDados);

    List<Produto> listarTodosNaoExcluidos();
}
