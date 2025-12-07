package com.erpet.erpetaplication.service;

import com.erpet.erpetaplication.dao.CategoriaDAO;
import com.erpet.erpetaplication.dto.CategoriaDTO;
import com.erpet.erpetaplication.model.Categoria;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CategoriaServiceTest {

    @Mock
    private CategoriaDAO dao;

    @InjectMocks
    private ServiceCategoriaImpl serviceCategoria;

    private Categoria criarCategoria() {
        Categoria c = new Categoria();
        c.setId(1);
        c.setNome("Alimentação");
        c.setDescricao("Produtos alimentícios");
        return c;
    }

    @Test
    @DisplayName("Deve cadastrar categoria corretamente")
    void deveCadastrarCategoria() {
        Categoria c = criarCategoria();
        when(dao.save(any(Categoria.class))).thenReturn(c);

        Categoria salva = serviceCategoria.cadastrarCategoria(c);

        assertNotNull(salva);
        assertEquals("Alimentação", salva.getNome());
        verify(dao, times(1)).save(any(Categoria.class));
    }

    @Test
    @DisplayName("Deve buscar categoria por ID existente")
    void deveBuscarPorId() {
        Categoria c = criarCategoria();
        when(dao.findById(1)).thenReturn(Optional.of(c));

        Categoria encontrada = serviceCategoria.buscarPorId(1);

        assertNotNull(encontrada);
        assertEquals(1, encontrada.getId());
        verify(dao, times(1)).findById(1);
    }

    @Test
    @DisplayName("Deve lançar exceção ao buscar ID inexistente")
    void deveLancarExcecaoAoBuscarIdInexistente() {
        when(dao.findById(99)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> serviceCategoria.buscarPorId(99));

        assertNotNull(ex);
        verify(dao, times(1)).findById(99);
    }

    @Test
    @DisplayName("Deve converter Categoria para CategoriaDTO corretamente")
    void deveConverterParaDTO() {
        Categoria c = criarCategoria();

        CategoriaDTO dto = serviceCategoria.converterParaDTO(c);

        assertNotNull(dto);
        assertEquals(c.getNome(), dto.getNome());
        assertEquals(c.getDescricao(), dto.getDescricao());
        assertEquals(c.getId(), dto.getId());
    }

    @Test
    @DisplayName("Deve editar categoria corretamente")
    void deveEditarCategoria() {
        Categoria antiga = criarCategoria();

        Categoria nova = new Categoria();
        nova.setNome("Alimentos Secos");
        nova.setDescricao("Produtos secos e embalados");

        when(dao.findById(1)).thenReturn(Optional.of(antiga));
        when(dao.save(any(Categoria.class))).thenReturn(antiga);

        Categoria editada = serviceCategoria.editarCategoria(1, nova);

        assertNotNull(editada);
        assertEquals("Alimentos Secos", editada.getNome());
        assertEquals("Produtos secos e embalados", editada.getDescricao());
        verify(dao, times(1)).save(any(Categoria.class));
    }
}
