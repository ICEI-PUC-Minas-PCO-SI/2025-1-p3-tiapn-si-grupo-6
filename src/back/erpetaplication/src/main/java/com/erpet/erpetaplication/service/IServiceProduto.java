package com.erpet.erpetaplication.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.erpet.erpetaplication.dto.ProdutoDTO;
import com.erpet.erpetaplication.model.Categoria;
import com.erpet.erpetaplication.model.Fornecedor;
import com.erpet.erpetaplication.model.Produto;

public interface IServiceProduto {
    List<Produto> listarTodos();

    // List<Produto> listarTodosDisponiveis();

    Produto salvarProduto(Produto produto);

    List<Produto> buscarPorNome(String nome);

    Produto buscarPorId(Integer id);

    // List<Produto> filtrarPorCategoria(Integer categoriaId);

    Produto excluirProduto(Integer id);

    Produto editarProduto(Integer id, ProdutoDTO novosDados);

    List<Produto> listarTodosNaoExcluidos();


    List<Produto> buscarPorFornecedor(Fornecedor fornecedor);

    List<Produto> buscarPorCategoria(Categoria categoria);

	ProdutoDTO converterParaDTO(Produto produto);

    void atualizarFoto(Integer id, MultipartFile arquivo) throws Exception;
}
