package com.erpet.erpetaplication.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.erpet.erpetaplication.dao.CategoriaDAO;
import com.erpet.erpetaplication.dao.FornecedorDAO;
import com.erpet.erpetaplication.dao.ProdutoDAO;
import com.erpet.erpetaplication.dto.CategoriaDTO;
import com.erpet.erpetaplication.dto.FornecedorDTO;
import com.erpet.erpetaplication.dto.ProdutoDTO;
import com.erpet.erpetaplication.model.Categoria;
import com.erpet.erpetaplication.model.Fornecedor;
import com.erpet.erpetaplication.model.Produto;

@Service
public class ServiceProdutoImpl implements IServiceProduto {

    @Autowired
    private ProdutoDAO dao;

    @Autowired
    private CategoriaDAO categoriaDAO;

    @Autowired
    private FornecedorDAO fornecedorDAO;

    @Autowired
    private IServiceFornecedor serviceFornecedor;

    @Autowired
    private IServiceCategoria serviceCategoria;

    @Override
    public Produto salvarProduto(Produto produto) {
        produto.setDataInclusao(LocalDateTime.now());

        if (produto.getCategoria() == null) {
            throw new RuntimeException("Categoria deve ser informada.");
        }

        if (produto.getFornecedor() == null) {
            throw new RuntimeException("Fornecedor deve ser informado.");
        }

        produto.setCategoria(serviceCategoria.buscarPorId(produto.getCategoria().getId()));

        produto.setFornecedor(serviceFornecedor.buscarPorId(produto.getFornecedor().getId()));

        return dao.save(produto);
    }

    @Override
    public Produto buscarPorId(Integer id) {
        return dao.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
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
    public Produto editarProduto(Integer id, ProdutoDTO dto) {
        Produto produtoExistente = dao.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        Categoria categoria = categoriaDAO.findById(dto.getCategoria().getId())
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        Fornecedor fornecedor = fornecedorDAO.findById(dto.getFornecedor().getId())
                .orElseThrow(() -> new RuntimeException("Fornecedor não encontrado"));

        produtoExistente.setNome(dto.getNome());
        produtoExistente.setDescricao(dto.getDescricao());
        produtoExistente.setPreco(dto.getPreco());
        produtoExistente.setQuantidade(dto.getQuantidade());
        produtoExistente.setDisponivel(dto.getDisponivel());
        produtoExistente.setDataValidade(dto.getDataValidade());
        produtoExistente.setFoto(dto.getFoto());
        produtoExistente.setNomeFoto(dto.getNomeFoto());
        produtoExistente.setTipoFoto(dto.getTipoFoto());

        produtoExistente.setCategoria(categoria);
        produtoExistente.setFornecedor(fornecedor);

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

    @Override
    public List<Produto> buscarPorFornecedor(Fornecedor fornecedor) {
        return dao.findByFornecedor(fornecedor);
    }

    @Override
    public List<Produto> buscarPorCategoria(Categoria categoria) {
        return List.of();
    }

    @Override
    public ProdutoDTO converterParaDTO(Produto produto) {
        Categoria categoria = produto.getCategoria();
        Fornecedor fornecedor = produto.getFornecedor();

        CategoriaDTO categoriaDTO = new CategoriaDTO();
        categoriaDTO.setId(categoria.getId());
        categoriaDTO.setNome(categoria.getNome());
        categoriaDTO.setDescricao(categoria.getDescricao());

        FornecedorDTO fornecedorDTO = new FornecedorDTO();
        fornecedorDTO.setId(fornecedor.getId());
        fornecedorDTO.setNome(fornecedor.getNome());
        fornecedorDTO.setTelefone(fornecedor.getTelefone());
        fornecedorDTO.setCidade(fornecedor.getCidade());

        ProdutoDTO dto = new ProdutoDTO();
        dto.setId(produto.getId());
        dto.setNome(produto.getNome());
        dto.setDescricao(produto.getDescricao());
        dto.setQuantidade(produto.getQuantidade());
        dto.setDisponivel(produto.getDisponivel());
        dto.setDataValidade(produto.getDataValidade());
        dto.setPreco(produto.getPreco());
        dto.setFoto(produto.getFoto());
        dto.setNomeFoto(produto.getNomeFoto());
        dto.setTipoFoto(produto.getTipoFoto());
        dto.setCategoria(categoriaDTO);
        dto.setFornecedor(fornecedorDTO);

        return dto;
    }

}