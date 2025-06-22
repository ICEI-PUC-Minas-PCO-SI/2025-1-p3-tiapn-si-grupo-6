package com.erpet.erpetaplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.erpet.erpetaplication.model.Fornecedor;
import com.erpet.erpetaplication.model.Produto;
import com.erpet.erpetaplication.service.IServiceFornecedor;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/fornecedores")
public class FornecedorController {

    @Autowired
    private IServiceFornecedor fornecedorService;

    //Cadastrar um novo fornecedor
    @PostMapping("/cadastrar")
    public ResponseEntity<Fornecedor> cadastrarFornecedor(@RequestBody Fornecedor fornecedor) {
        Fornecedor fornecedorCriado = fornecedorService.cadastrarFornecedor(fornecedor);
        return ResponseEntity.ok(fornecedorCriado);

    }

    //  Buscar fornecedor por ID
    @GetMapping("/buscar/{id}")
    public ResponseEntity<Fornecedor> buscarPorId(@PathVariable Integer id) {
        Fornecedor fornecedorEncontrado =  fornecedorService.buscarPorId(id);
        return ResponseEntity.ok(fornecedorEncontrado);
    }

    //Editar dados de um fornecedor
    @PutMapping("/editar/{id}")
    public ResponseEntity<Fornecedor> editarFornecedor(@PathVariable Integer id, @RequestBody Fornecedor fornecedor) {
        Fornecedor atualizado = fornecedorService.editarFornecedor(id, fornecedor);
        return ResponseEntity.ok(atualizado);
    }


    // Listar todos os fornecedores, com filtros opcionais
    @GetMapping("/listar")
    public List<Fornecedor> listarTodos(
            @RequestParam(required = false) String nome,
            @RequestParam(required = false, defaultValue = "false") boolean incluirExcluidos) {

        if (nome != null && !nome.isEmpty()) {
            return fornecedorService.buscarPorNome(nome);
        }

        if (incluirExcluidos) {
            return fornecedorService.listarTodosIncluindoExcluidos();
        }

        return fornecedorService.listarTodos();
    }

    // Excluir fornecedor por ID
    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<String> excluirFornecedor(@PathVariable Integer id) {
        fornecedorService.excluirFornecedor(id);
        return ResponseEntity.ok("Fornecedor excluído com sucesso!");
    }

    @GetMapping("/{id}/produtos")
public ResponseEntity<List<Produto>> listarProdutosPorFornecedor(@PathVariable Integer id) {
    List<Produto> produtos = fornecedorService.listarProdutosPorFornecedor(id);
    return ResponseEntity.ok(produtos);
}
}