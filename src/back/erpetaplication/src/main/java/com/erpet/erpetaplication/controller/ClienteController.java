package com.erpet.erpetaplication.controller;

import java.util.List;
import java.util.Optional;

import com.erpet.erpetaplication.annotations.LoggableAcao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.erpet.erpetaplication.model.Cliente;
import com.erpet.erpetaplication.dto.ClienteDTO;
import com.erpet.erpetaplication.service.IServiceCliente;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/clientes")

public class ClienteController {

    @Autowired
    private IServiceCliente service;

    // Cadastrar clientes
    @LoggableAcao("Cadastrar cliente -> #{#cliente.nome}")
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

    // Buscar cliente por id
    @GetMapping("/{id}")
    public ResponseEntity<Cliente> buscarPorId(@PathVariable Integer id) {
        try {
            Cliente cliente = service.buscarPorId(id);
            return ResponseEntity.ok(cliente);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Editar cliente
    @LoggableAcao("Editar cliente -> #{#novosDados.nome}")
    @PutMapping("/{id}")
    public ResponseEntity<Cliente> editarCliente(@PathVariable Integer id, @RequestBody Cliente novosDados) {
        try {
            Cliente atualizado = service.editarCliente(id, novosDados);
            return ResponseEntity.ok(atualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Excluir cliente
    @LoggableAcao("Excluir cliente -> #{#id}")
    @DeleteMapping("/{id}")
    public ResponseEntity<Cliente> excluirCliente(@PathVariable Integer id) {
        try {
            Cliente excluido = service.excluirCliente(id);
            return ResponseEntity.ok(excluido);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
