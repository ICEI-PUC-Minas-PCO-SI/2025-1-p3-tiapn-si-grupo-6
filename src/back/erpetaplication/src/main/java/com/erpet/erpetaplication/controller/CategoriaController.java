package com.erpet.erpetaplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.erpet.erpetaplication.model.Categoria;
import com.erpet.erpetaplication.model.Usuario;
import com.erpet.erpetaplication.service.IServiceCategoria;

@RestController
@CrossOrigin("*")
@RequestMapping("/categorias")
public class CategoriaController 
{

	@Autowired
	IServiceCategoria serviceCategoria; 
	
	@GetMapping
	public ResponseEntity<List<Categoria>> buscarTodas()
	{
		List<Categoria> categorias = serviceCategoria.buscarTodosNaoExcluidos();
		return ResponseEntity.ok(categorias);
	}
	
    //Listar todos incluindo Excluidos
    @GetMapping("/excluidos")
    public ResponseEntity<List<Categoria>> listarTodosIncluindoExcluidos()
    {
    	List<Categoria> categorias = serviceCategoria.buscarTodos();
    	return ResponseEntity.ok(categorias);
    }
	
	@GetMapping("/{id}")
	public ResponseEntity<Categoria> buscarPorId(@PathVariable int id)
	{
		Categoria categoria = serviceCategoria.buscarPorId(id);
		return ResponseEntity.ok(categoria);
	}
	
	@GetMapping("/nome")
	public ResponseEntity<List<Categoria>> buscarPorNome(String nome)
	{
		List<Categoria> categorias = serviceCategoria.buscarPorNome(nome);
		return ResponseEntity.ok(categorias);
	}
	@GetMapping("/descricao")
	public ResponseEntity<List<Categoria>> buscarPorDescricao(String descricao)
	{
		List<Categoria> categorias = serviceCategoria.buscarPorDescricao(descricao);
		return ResponseEntity.ok(categorias);
	}
	
	@PostMapping
	public ResponseEntity<Categoria> cadastrarCategoria(@RequestBody Categoria categoria)
	{
		Categoria cadastrada = serviceCategoria.cadastrarCategoria(categoria);
		return ResponseEntity.ok(cadastrada);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Categoria> editarCategoria(@PathVariable int id, @RequestBody Categoria categoria)
	{
		Categoria categoriaCadastrada = serviceCategoria.editarCategoria(id, categoria);
		return ResponseEntity.ok(categoriaCadastrada);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Categoria> deletarCategoria(@PathVariable int id)
	{
		Categoria excluida = serviceCategoria.excluirCategoria(id);
		return ResponseEntity.ok(excluida);
	}
}