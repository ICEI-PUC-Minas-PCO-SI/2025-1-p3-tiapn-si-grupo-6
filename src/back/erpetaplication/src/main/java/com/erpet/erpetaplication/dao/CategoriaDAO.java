package com.erpet.erpetaplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.erpet.erpetaplication.model.Categoria;

@Component
public interface CategoriaDAO extends JpaRepository<Categoria, Long>
{
	List<Categoria> findByNomeContainingIgnoreCase(String nome);
	List<Categoria> findByDescricaoContainingIgnoreCase(String nome);
	List<Categoria> findByDataExclusaoIsNull();
	//TODO criar metodo para listar por nome produto
	
}