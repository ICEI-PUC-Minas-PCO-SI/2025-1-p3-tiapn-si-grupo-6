package com.erpet.erpetaplication.service;

import com.erpet.erpetaplication.dao.ProdutoDAO;
import com.erpet.erpetaplication.dto.ProdutoDTO;
import com.erpet.erpetaplication.model.Categoria;
import com.erpet.erpetaplication.model.Fornecedor;
import com.erpet.erpetaplication.model.Produto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProdutoServiceTest {

    @Mock
    private ProdutoDAO dao;

    @Mock
    private IServiceCategoria serviceCategoria;

    @Mock
    private IServiceFornecedor serviceFornecedor;

    @InjectMocks
    private ServiceProdutoImpl serviceProduto;

    private Produto criarProdutoCompleto() {
        Produto p = new Produto();
        p.setId(1);
        p.setNome("Ração Premium");
        p.setDescricao("Ração de alta qualidade");
        p.setPreco(new BigDecimal("99.90"));

        // evitar NPE em getQuantidade().intValue()
        p.setQuantidade(10);

        // evitar NPE em getDisponivel().booleanValue()
        p.setDisponivel(true);

        Categoria c = new Categoria();
        c.setId(10);
        c.setNome("Alimentação");
        p.setCategoria(c);

        Fornecedor f = new Fornecedor();
        f.setId(20);
        f.setNome("Fornecedor Teste");
        p.setFornecedor(f);

        return p;
    }

    @Test
    @DisplayName("Deve salvar produto com categoria e fornecedor informados")
    void deveSalvarProduto() {
        Produto p = criarProdutoCompleto();

        when(serviceCategoria.buscarPorId(10)).thenReturn(p.getCategoria());
        when(serviceFornecedor.buscarPorId(20)).thenReturn(p.getFornecedor());
        when(dao.save(any(Produto.class))).thenReturn(p);

        Produto salvo = serviceProduto.salvarProduto(p);

        assertNotNull(salvo);
        assertEquals("Ração Premium", salvo.getNome());
        assertNotNull(salvo.getCategoria());
        assertNotNull(salvo.getFornecedor());

        verify(serviceCategoria, times(1)).buscarPorId(10);
        verify(serviceFornecedor, times(1)).buscarPorId(20);
        verify(dao, times(1)).save(any(Produto.class));
    }

    @Test
    @DisplayName("Deve buscar produto por ID existente")
    void deveBuscarPorIdExistente() {
        Produto p = criarProdutoCompleto();
        when(dao.findById(1)).thenReturn(Optional.of(p));

        Produto encontrado = serviceProduto.buscarPorId(1);

        assertNotNull(encontrado);
        assertEquals(1, encontrado.getId());
        verify(dao, times(1)).findById(1);
    }

    @Test
    @DisplayName("Deve lançar exceção ao buscar produto inexistente")
    void deveLancarExcecaoAoBuscarIdInexistente() {
        when(dao.findById(99)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> serviceProduto.buscarPorId(99));

        assertNotNull(ex.getMessage());
        verify(dao, times(1)).findById(99);
    }

    @Test
    @DisplayName("Deve converter Produto para ProdutoDTO corretamente")
    void deveConverterParaDTO() {
        Produto p = criarProdutoCompleto();

        ProdutoDTO dto = serviceProduto.converterParaDTO(p);

        assertNotNull(dto);
        assertEquals(p.getNome(), dto.getNome());
        assertEquals(p.getDescricao(), dto.getDescricao());
        assertEquals(p.getPreco(), dto.getPreco());
    }

    @Test
    @DisplayName("Deve converter Produto para DTO incluindo nome, descrição e preço corretamente")
    void deveConverterCamposBasicosParaDTO() {
        Produto p = criarProdutoCompleto();

        ProdutoDTO dto = serviceProduto.converterParaDTO(p);

        assertNotNull(dto);
        assertEquals(p.getNome(), dto.getNome());
        assertEquals(p.getDescricao(), dto.getDescricao());
        assertEquals(p.getPreco(), dto.getPreco());
    }
}