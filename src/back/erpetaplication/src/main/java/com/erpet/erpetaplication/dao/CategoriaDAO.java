package com.erpet.erpetaplication.dao;

import java.util.List;

import com.erpet.erpetaplication.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.erpet.erpetaplication.model.Categoria;

@Component
public interface CategoriaDAO extends JpaRepository<Categoria, Integer>
{
	List<Categoria> findByNomeContainingIgnoreCase(String nome);
	List<Categoria> findByDescricaoContainingIgnoreCase(String nome);
	List<Categoria> findByDataExclusaoIsNull();

	
}