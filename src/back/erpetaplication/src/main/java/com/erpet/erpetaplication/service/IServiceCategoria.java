package com.erpet.erpetaplication.service;

import java.util.List;

import com.erpet.erpetaplication.model.Categoria;

public interface IServiceCategoria 
{

	public Categoria cadastrarCategoria(Categoria categoria);
	public Categoria editarCategoria(Long id, Categoria categoria);
	public Categoria excluirCategoria(Long idCategoria);
	public List<Categoria> buscarTodos();
	public List<Categoria> buscarTodosNaoExcluidos();
	public List<Categoria> buscarPorNome(String nome);
	public List<Categoria> buscarPorDescricao(String descricao);
	public Categoria buscarPorId(Long id);
	//TODO buscar por nome do produto
    //TODO filtrar por categoria não excluidos

}
