package com.erpet.erpetaplication.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.erpet.erpetaplication.dao.CategoriaDAO;
import com.erpet.erpetaplication.model.Categoria;
import com.erpet.erpetaplication.model.Usuario;

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
	public Categoria editarCategoria(Long id,Categoria categoria) 
	{
		Categoria categoriaExistente = buscarPorId(id);
		categoriaExistente.setNome(categoria.getNome());
		categoriaExistente.setDescricao(categoria.getDescricao());
		return categoria;
	}

	@Override
	public Categoria excluirCategoria(Long idCategoria)
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
	public Categoria buscarPorId(Long id) 
	{
		Categoria categoria = dao.findById(id).orElseThrow(() -> new RuntimeException("Categoria não encontrada")); 
		return categoria;
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

	

}
