package com.erpet.erpetaplication.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.erpet.erpetaplication.model.Produto;
import com.erpet.erpetaplication.service.IServiceProduto;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    @Autowired
    private IServiceProduto service;

    @GetMapping
    public ResponseEntity<List<Produto>> listarTodos() {
        List<Produto> produtos = service.listarTodosNaoExcluidos();
        return ResponseEntity.ok(produtos);
    }

    // Listar todos incluindo Excluidos
    @GetMapping("/excluidos")
    public ResponseEntity<List<Produto>> listarTodosIncluindoExcluidos() {
        List<Produto> produtos = service.listarTodos();
        return ResponseEntity.ok(produtos);
    }

    // Criar novo produto
    @PostMapping
    public ResponseEntity<Produto> criarProduto(@RequestBody Produto produto) 
    {
        Produto criado = service.salvarProduto(produto);
        return ResponseEntity.ok(criado);
    }

    // Buscar por nome (contém)
    @GetMapping("/nome")
    public ResponseEntity<List<Produto>> buscarPorNome(@RequestParam String nome) {
        List<Produto> produtos = service.buscarPorNome(nome);
        return ResponseEntity.ok(produtos);
    }

    // Editar produto (passando o produto completo com dados novos)
    @PutMapping("/{id}")
    public ResponseEntity<Produto> editarProduto(@PathVariable Integer id, @RequestBody Produto novosDados) {
        try {
            Produto atualizado = service.editarProduto(id, novosDados);
            return ResponseEntity.ok(atualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/fornecedor/{idFornecedor}")
    public ResponseEntity<List<Produto>> buscarPorFornecedor(@PathVariable Integer idFornecedor) {
        List<Produto> produtos = service.buscarPorFornecedor(idFornecedor);
        return ResponseEntity.ok(produtos);
    }
    // Excluir (soft delete com data exclusão)
    @DeleteMapping("/{id}")
    public ResponseEntity<Produto> excluirProduto(@PathVariable Integer id) {
        try {
            Produto excluido = service.excluirProduto(id);
            return ResponseEntity.ok(excluido);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
