package com.erpet.erpetaplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.erpet.erpetaplication.model.Pedido;
import com.erpet.erpetaplication.service.IServicePedido;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    @Autowired
    private IServicePedido pedidoService;

    // 👉 Cadastrar um novo pedido
    @PostMapping("/cadastrar")
    public Pedido cadastrarPedido(@RequestBody Pedido pedido) {
        return pedidoService.cadastrarPedido(pedido);
    }

    // 👉 Buscar pedido por ID
    @GetMapping("/buscar/{id}")
    public Pedido buscarPorId(@PathVariable long id) {
        return pedidoService.buscarPorId(id);
    }

    // 👉 Editar um pedido
    @PutMapping("/editar/{id}")
    public ResponseEntity<Pedido> editarPedido(@PathVariable Long id, @RequestBody Pedido pedido) {
        Pedido atualizado = pedidoService.editarPedido(id, pedido);
        return ResponseEntity.ok(atualizado);
    }

    // 👉 Listar todos os pedidos, com filtros opcionais
    @GetMapping("/listar")
    public List<Pedido> listarTodos(
            @RequestParam(required = false) String cliente,
            @RequestParam(required = false) String status) {

        if (cliente != null && !cliente.isEmpty()) {
            return pedidoService.buscarPorCliente(cliente);
        }

        if (status != null && !status.isEmpty()) {
            return pedidoService.buscarPorStatus(status);
        }

        return pedidoService.listarTodos();
    }

    // 👉 Excluir pedido por ID
    @DeleteMapping("/excluir/{id}")
    public String excluirPedido(@PathVariable long id) {
        pedidoService.excluirPedido(id);
        return "Pedido excluído com sucesso!";
    }
}