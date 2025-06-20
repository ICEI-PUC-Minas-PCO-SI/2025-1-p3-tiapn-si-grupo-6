package com.erpet.erpetaplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.erpet.erpetaplication.model.Categoria;
import com.erpet.erpetaplication.model.Fornecedor;
import com.erpet.erpetaplication.model.Produto;

@Repository
public interface ProdutoDAO extends JpaRepository<Produto, Integer> 
{
    List<Produto> findByNomeContainingIgnoreCase(String nome);
    List<Produto> findByDataExclusaoIsNull();
    List<Produto> findByFornecedor(Fornecedor fornecedor);
	List<Produto> findAllByCategoria(Categoria categoria);
}