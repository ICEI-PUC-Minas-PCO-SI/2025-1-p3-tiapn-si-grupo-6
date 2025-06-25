package com.erpet.erpetaplication.controller;

import java.util.List;

import com.erpet.erpetaplication.annotations.LoggableAcao;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.erpet.erpetaplication.dto.ProdutoDTO;
import com.erpet.erpetaplication.model.Fornecedor;
import com.erpet.erpetaplication.model.Produto;
import com.erpet.erpetaplication.service.IServiceProduto;
import com.erpet.erpetaplication.service.IServiceUpload;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    @Autowired
    private IServiceProduto service;

    @Autowired
    private IServiceUpload serviceUpload;

    @GetMapping
    public ResponseEntity<List<ProdutoDTO>> listarTodos() {
        List<Produto> produtos = service.listarTodosNaoExcluidos();
        List<ProdutoDTO> dtos = produtos.stream()
            .map(service::converterParaDTO)
            .toList();

        return ResponseEntity.ok(dtos);
    }

    // Listar todos incluindo Excluidos
    @GetMapping("/excluidos")
    public ResponseEntity<List<ProdutoDTO>>listarTodosIncluindoExcluidos() {
        List<Produto> produtos = service.listarTodos();
        List<ProdutoDTO> dtos = produtos.stream()
                .map(service::converterParaDTO)
                .toList();

            return ResponseEntity.ok(dtos);
        }
    

    // Criar novo produto
    @LoggableAcao("Criar produto -> #{#produto.nome}")
    @PostMapping
    public ResponseEntity<Produto> criarProduto(@RequestBody Produto produto) {
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
    @LoggableAcao("Editar produto -> #{#dto.id} - #{#dto.nome}")
    @PutMapping("{id}")
    public ResponseEntity<?> editarProduto(@PathVariable Integer id, @RequestBody ProdutoDTO dto) {
        System.out.println("Data recebida: " + dto.getDataValidade());

        Produto produto = service.editarProduto(id, dto);
        return ResponseEntity.ok(produto);
    }
    
    @GetMapping("/fornecedor/{idFornecedor}")
    public ResponseEntity<List<Produto>> buscarPorFornecedor(@PathVariable Fornecedor fornecedor) {
        List<Produto> produtos = service.buscarPorFornecedor(fornecedor);
        return ResponseEntity.ok(produtos);
    }
    // Excluir (soft delete com data exclusão)
    @LoggableAcao("<b> Excluir produto </b>  código #{#id}")
    @DeleteMapping("/{id}")
    public ResponseEntity<Produto> excluirProduto(@PathVariable Integer id) {
        try {
            Produto excluido = service.excluirProduto(id);
            return ResponseEntity.ok(excluido);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProdutoDTO> buscarPorId(@PathVariable Integer id) {
        try {
            Produto produto = service.buscarPorId(id);
            ProdutoDTO dto = service.converterParaDTO(produto);
            return ResponseEntity.ok(dto);
        }
        catch(RuntimeException e){
            return ResponseEntity.notFound().build();
        }
    }



}
