package com.erpet.erpetaplication.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.erpet.erpetaplication.model.Produto;

@Repository
public interface ProdutoDAO extends JpaRepository<Produto, Integer> 
{
    List<Produto> findByNomeContainingIgnoreCase(String nome);
    Optional<Produto> findById(Integer id);
    List<Produto> findByDataExclusaoIsNull();
}