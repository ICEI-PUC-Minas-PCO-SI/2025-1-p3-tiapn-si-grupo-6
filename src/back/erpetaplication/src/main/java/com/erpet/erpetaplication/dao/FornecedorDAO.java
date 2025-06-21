package com.erpet.erpetaplication.dao;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.erpet.erpetaplication.model.Fornecedor;

@Repository
public interface FornecedorDAO extends JpaRepository<Fornecedor, Integer> {


    List<Fornecedor> findByNomeContainingIgnoreCase(String nome);
    List<Fornecedor> findByCidadeContainingIgnoreCase(String cidade);
    List<Fornecedor> findByEstadoContainingIgnoreCase(String estado);
    List<Fornecedor> findByDataExclusaoIsNull();
    List<Fornecedor> findByNomeContainingIgnoreCaseAndDataExclusaoIsNull(String nome);
    

}