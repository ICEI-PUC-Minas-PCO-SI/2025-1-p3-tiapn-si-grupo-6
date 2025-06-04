package com.erpet.erpetaplication.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.erpet.erpetaplication.dao.ProdutoDAO;
import com.erpet.erpetaplication.model.Categoria;
import com.erpet.erpetaplication.model.Produto;
import com.erpet.erpetaplication.dao.CategoriaDAO;

@Service
public class ServiceProdutoImpl implements IServiceProduto {

    @Autowired
    private ProdutoDAO dao;

    @Autowired
    private CategoriaDAO categoriaDAO;

    @Override
    public Produto salvarProduto(Produto produto) {
        produto.setDataInclusao(LocalDateTime.now());

        if (produto.getCategoriaId() == null) {
            throw new RuntimeException("Categoria deve ser informada.");
        }

        Categoria categoria = categoriaDAO.findById(produto.getCategoriaId()).orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        return dao.save(produto);
    }

    @Override
    public Optional<Produto> buscarPorId(Integer id) {
        return dao.findById(id);
    }

    @Override
    public List<Produto> buscarPorNome(String nome) {
        return dao.findByNomeContainingIgnoreCase(nome);
    }

    @Override
    public Produto excluirProduto(Integer id) {
        Produto produto = dao.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado para exclusão."));

        produto.setDataExclusao(LocalDateTime.now());
        return dao.save(produto);
    }

    @Override
    public Produto editarProduto(Integer id, Produto novosDados) {
        Produto produtoExistente = dao.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        produtoExistente.setNome(novosDados.getNome());
        produtoExistente.setDescricao(novosDados.getDescricao());
        produtoExistente.setPreco(novosDados.getPreco());
        // produtoExistente.setCategoria(novosDados.getCategoria());
        // produtoExistente.setEstoque(novosDados.getEstoque());

        return dao.save(produtoExistente);
    }

    @Override
    public List<Produto> listarTodos() {
        return dao.findAll();
    }

    @Override
    public List<Produto> listarTodosNaoExcluidos() {
        return dao.findByDataExclusaoIsNull();
    }
}