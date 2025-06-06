package com.erpet.erpetaplication.dao;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.erpet.erpetaplication.model.Fornecedor;

@Repository
public interface FornecedorDAO extends JpaRepository<Fornecedor, Long> {

    // Buscar fornecedores pelo nome (ignorando maiúsculas e minúsculas)
    List<Fornecedor> findByNomeContainingIgnoreCase(String nome);

    // Buscar fornecedores pela cidade
    List<Fornecedor> findByCidadeContainingIgnoreCase(String cidade);

    // Buscar fornecedores pelo estado
    List<Fornecedor> findByEstadoContainingIgnoreCase(String estado);

    // Filtrar fornecedores não excluídos (se tiver um campo de data de exclusão)
    List<Fornecedor> findByDataExclusaoIsNull();

    // Retorna fornecedores que contenham o nome, ignorando maiúsculas/minúsculas, e que não estejam excluídos
    List<Fornecedor> findByNomeContainingIgnoreCaseAndDataExclusaoIsNull(String nome);
    

}