package com.erpet.erpetaplication.service;

import java.util.List;
import java.util.Optional;

import com.erpet.erpetaplication.model.Produto;

public interface IServiceProduto {
    List<Produto> listarTodos();

    // List<Produto> listarTodosDisponiveis();

    Produto salvarProduto(Produto produto);

    List<Produto> buscarPorNome(String nome);

    Optional<Produto> buscarPorCodigo(Long id);

    // List<Produto> filtrarPorCategoria(Long categoriaId);

    Produto excluirProduto(Long id);

    Produto editarProduto(Long id, Produto novosDados);

    List<Produto> listarTodosNaoExcluidos();
}
