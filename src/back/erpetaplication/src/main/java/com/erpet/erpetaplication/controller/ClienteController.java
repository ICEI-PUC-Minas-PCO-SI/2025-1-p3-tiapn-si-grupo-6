package com.erpet.erpetaplication.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.erpet.erpetaplication.model.Cliente;
import com.erpet.erpetaplication.service.IClienteService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/clientes")


public class ClienteController {

    @Autowired
    private IClienteService service;

    // Cadastrar clientes
    @PostMapping
    public ResponseEntity<Cliente> cadastrarCliente(@RequestBody Cliente cliente) {
        Cliente criado = service.salvarCliente(cliente);
        return ResponseEntity.ok(criado);
    }

    // Listar todos os clientes ativos
    @GetMapping("/ativos")
    public ResponseEntity<List<Cliente>> llistarTodosNaoExcluidos() {
        List<Cliente> clientes = service.listarTodosNaoExcluidos();
        return ResponseEntity.ok(clientes);
    }

    //Listar todos os clientes (Excluidos tambem)
    @GetMapping("/todos")
    public ResponseEntity<List<Cliente>> listarTodos() {
        List<Cliente> clientes = service.listarTodos();
        return ResponseEntity.ok(clientes);
    }

    // Buscar cliente por nome 
    @GetMapping("/buscar")
    public ResponseEntity<List<Cliente>> buscarPorNome(@RequestParam String nome) {
        List<Cliente> clientes = service.buscarPorNome(nome);
        return ResponseEntity.ok(clientes);
    }

    // Editar cliente
    @PutMapping("/{id}")
    public ResponseEntity<Cliente> editarCliente(@PathVariable Long id, @RequestBody Cliente Dadosnovos) {
        try {
            Cliente atualizado = service.editarCliente(id, Dadosnovos);
            return ResponseEntity.ok(atualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Excluir cliente
    @DeleteMapping("/{id}")
    public ResponseEntity<Cliente> excluirCliente(@PathVariable Long id) {
         try 
        {
            Cliente excluido = service.excluirCliente(id);
            return ResponseEntity.ok(excluido);
        } 
        catch (RuntimeException e) 
        {
            return ResponseEntity.notFound().build();
        }
    }

}
