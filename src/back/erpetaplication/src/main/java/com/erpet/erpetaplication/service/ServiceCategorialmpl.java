package com.erpet.erpetaplication.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.erpet.erpetaplication.dao.CategoriaDAO;
import com.erpet.erpetaplication.dto.CategoriaDTO;
import com.erpet.erpetaplication.model.Categoria;

@Service
public class ServiceCategorialmpl implements IServiceCategoria
{

	@Autowired
	private CategoriaDAO dao;
	
	@Override
	public Categoria cadastrarCategoria(Categoria categoria)
	{
		System.out.println("NOME: " + categoria.getNome());
		System.out.println("DESCRICAO: " + categoria.getDescricao());
		categoria.setDataInclusao(LocalDateTime.now());
		System.out.println("Inclusao: " + categoria.getDataInclusao().toString());

		return dao.save(categoria);	
	}

	@Override
	public Categoria editarCategoria(int id, Categoria categoria) {
	    Categoria categoriaExistente = buscarPorId(id);
	    categoriaExistente.setNome(categoria.getNome());
	    categoriaExistente.setDescricao(categoria.getDescricao());
	    return dao.save(categoriaExistente);
	}

	@Override
	public Categoria excluirCategoria(int idCategoria)
	{
		Categoria categoriaExcluida = dao.findById(idCategoria).orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
		categoriaExcluida.setDataExclusao(LocalDateTime.now());
		return dao.save(categoriaExcluida);
	}

	@Override
	public List<Categoria> buscarTodos()
	{
		return dao.findAll();
	}
	
	@Override
	public Categoria buscarPorId(int id) 
	{
		return dao.findById(id).orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
	}


	@Override
	public List<Categoria> buscarPorNome(String nome) 
	{
		return dao.findByNomeContainingIgnoreCase(nome);
	}
	
	@Override
	public List<Categoria> buscarPorDescricao(String descricao)
	{
		return dao.findByDescricaoContainingIgnoreCase(descricao);
	}

	@Override
	public List<Categoria> buscarTodosNaoExcluidos()
	{	
		return dao.findByDataExclusaoIsNull();
	}

	@Override
	public CategoriaDTO converterParaDTO(Categoria categoria) {
		CategoriaDTO dto = new CategoriaDTO();
		dto.setId(categoria.getId());
		dto.setDescricao(categoria.getDescricao());
		dto.setNome(categoria.getNome());
		return dto;
	}
	
	

	

}
