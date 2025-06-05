package com.erpet.erpetaplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.erpet.erpetaplication.model.Fornecedor;
import com.erpet.erpetaplication.service.IFornecedorService;

@CrossOrigin(origins = "http://localhost:3000") 
@RestController
@RequestMapping("/fornecedores")
public class FornecedorController {

    @Autowired
    private IFornecedorService fornecedorService;

    // 👉 Cadastrar um novo fornecedor
    @PostMapping("/cadastrar")
    public Fornecedor cadastrarFornecedor(@RequestBody Fornecedor fornecedor) {
        return fornecedorService.cadastrarFornecedor(fornecedor);
        // Retorna o objeto cadastrado para o frontend poder usar
    }

    // 👉 Buscar fornecedor por ID
    @GetMapping("/buscar/{id}")
    public Fornecedor buscarPorId(@PathVariable long id) {
        return fornecedorService.buscarPorId(id);
    }

    // 👉 Editar dados de um fornecedor
    @PutMapping("/editar/{id}")
    public ResponseEntity<Fornecedor> editarFornecedor(@PathVariable Long id, @RequestBody Fornecedor fornecedor) {
        Fornecedor atualizado = fornecedorService.editarFornecedor(id, fornecedor);
        return ResponseEntity.ok(atualizado);
    }


    // 👉 Listar todos os fornecedores, com filtros opcionais
    @GetMapping("/listar")
    public List<Fornecedor> listarTodos(
            @RequestParam(required = false) String nome,
            @RequestParam(required = false, defaultValue = "false") boolean incluirExcluidos) {

        if (nome != null && !nome.isEmpty()) {
            // Se foi passado nome, filtra por nome (implementação no service)
            return fornecedorService.buscarPorNome(nome);
        }

        if (incluirExcluidos) {
            // Se incluirExcluidos = true, retorna todos incluindo excluídos
            return fornecedorService.listarTodosIncluindoExcluidos();
        }

        // Caso padrão: lista só fornecedores ativos
        return fornecedorService.listarTodos();
    }

    // 👉 Excluir fornecedor por ID
    @DeleteMapping("/excluir/{id}")
    public String excluirFornecedor(@PathVariable long id) {
        fornecedorService.excluirFornecedor(id);
        return "Fornecedor excluído com sucesso!";
    }
}