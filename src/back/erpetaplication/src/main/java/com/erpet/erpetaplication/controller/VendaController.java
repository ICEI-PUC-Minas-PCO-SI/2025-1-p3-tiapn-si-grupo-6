package com.erpet.controllers;

import com.erpet.models.*;
import com.erpet.services.ClienteService;
import com.erpet.services.EstoqueService;
import com.erpet.services.ProdutoService;
import com.erpet.services.VendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/vendas")
@CrossOrigin(origins = "*")
public class VendaController {

    @Autowired
    private VendaService vendaService;
    
    @Autowired
    private ProdutoService produtoService;
    
    @Autowired
    private ClienteService clienteService;
    
    @Autowired
    private EstoqueService estoqueService;
    
    @GetMapping
    public ResponseEntity<List<Venda>> listarVendas() {
        return ResponseEntity.ok(vendaService.listarTodas());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Venda> buscarVenda(@PathVariable Long id) {
        Optional<Venda> venda = vendaService.buscarPorId(id);
        return venda.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/{id}/itens")
    public ResponseEntity<List<ItemVenda>> buscarItensVenda(@PathVariable Long id) {
        List<ItemVenda> itens = vendaService.buscarItensPorVenda(id);
        return ResponseEntity.ok(itens);
    }
    
    @PostMapping
    public ResponseEntity<?> registrarVenda(@RequestBody Map<String, Object> vendaRequest) {
        try {
            // Extrair dados da venda
            Long clienteId = Long.parseLong(vendaRequest.get("clienteId").toString());
            Long usuarioId = Long.parseLong(vendaRequest.get("usuarioId").toString());
            LocalDate dataVenda = LocalDate.parse(vendaRequest.get("dataVenda").toString());
            
            // Verificar cliente
            Optional<Cliente> clienteOpt = clienteService.buscarPorId(clienteId);
            if (clienteOpt.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("mensagem", "Cliente não encontrado"));
            }
            
            // Criar objeto venda
            Venda venda = new Venda();
            venda.setCliente(clienteOpt.get());
            
            // Criar usuário temporário (em produção, seria obtido da autenticação)
            Usuario usuario = new Usuario();
            usuario.setId(usuarioId);
            venda.setUsuario(usuario);
            
            venda.setDataVenda(dataVenda);
            
            // Processar itens da venda
            List<Map<String, Object>> itensRequest = (List<Map<String, Object>>) vendaRequest.get("itens");
            List<ItemVenda> itens = new ArrayList<>();
            
            for (Map<String, Object> itemRequest : itensRequest) {
                Long produtoId = Long.parseLong(itemRequest.get("produtoId").toString());
                Integer quantidade = Integer.parseInt(itemRequest.get("quantidade").toString());
                
                // Verificar produto
                Optional<Produto> produtoOpt = produtoService.buscarPorId(produtoId);
                if (produtoOpt.isEmpty()) {
                    return ResponseEntity.badRequest().body(Map.of("mensagem", "Produto não encontrado: " + produtoId));
                }
                
                // Verificar estoque
                if (!estoqueService.verificarEstoqueDisponivel(produtoId, quantidade)) {
                    return ResponseEntity.badRequest().body(Map.of("mensagem", "Estoque insuficiente para o produto: " + produtoOpt.get().getNome()));
                }
                
                // Criar item de venda
                ItemVenda item = new ItemVenda();
                item.setProduto(produtoOpt.get());
                item.setQuantidade(quantidade);
                itens.add(item);
            }
            
            // Registrar venda
            Venda vendaRegistrada = vendaService.registrarVenda(venda, itens);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(vendaRegistrada);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("mensagem", "Erro ao registrar venda: " + e.getMessage()));
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarVenda(@PathVariable Long id, @RequestBody Map<String, Object> vendaRequest) {
        try {
            // Verificar se a venda existe
            Optional<Venda> vendaExistente = vendaService.buscarPorId(id);
            if (vendaExistente.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            // Extrair dados da venda
            Long clienteId = Long.parseLong(vendaRequest.get("clienteId").toString());
            LocalDate dataVenda = LocalDate.parse(vendaRequest.get("dataVenda").toString());
            String status = vendaRequest.get("status") != null ? vendaRequest.get("status").toString() : "FINALIZADA";
            
            // Verificar cliente
            Optional<Cliente> clienteOpt = clienteService.buscarPorId(clienteId);
            if (clienteOpt.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("mensagem", "Cliente não encontrado"));
            }
            
            // Atualizar objeto venda
            Venda venda = vendaExistente.get();
            venda.setCliente(clienteOpt.get());
            venda.setDataVenda(dataVenda);
            venda.setStatus(status);
            
            // Processar itens da venda (opcional)
            if (vendaRequest.containsKey("itens")) {
                List<Map<String, Object>> itensRequest = (List<Map<String, Object>>) vendaRequest.get("itens");
                List<ItemVenda> itens = new ArrayList<>();
                
                for (Map<String, Object> itemRequest : itensRequest) {
                    Long produtoId = Long.parseLong(itemRequest.get("produtoId").toString());
                    Integer quantidade = Integer.parseInt(itemRequest.get("quantidade").toString());
                    
                    // Verificar produto
                    Optional<Produto> produtoOpt = produtoService.buscarPorId(produtoId);
                    if (produtoOpt.isEmpty()) {
                        return ResponseEntity.badRequest().body(Map.of("mensagem", "Produto não encontrado: " + produtoId));
                    }
                    
                    // Criar item de venda
                    ItemVenda item = new ItemVenda();
                    item.setProduto(produtoOpt.get());
                    item.setQuantidade(quantidade);
                    itens.add(item);
                }
                
                // Atualizar venda com novos itens
                Venda vendaAtualizada = vendaService.atualizarVenda(venda, itens);
                return ResponseEntity.ok(vendaAtualizada);
            } else {
                // Atualizar apenas a venda sem modificar itens
                Venda vendaAtualizada = vendaService.atualizarVendaSemItens(venda);
                return ResponseEntity.ok(vendaAtualizada);
            }
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("mensagem", "Erro ao atualizar venda: " + e.getMessage()));
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluirVenda(@PathVariable Long id) {
        try {
            // Verificar se a venda existe
            Optional<Venda> vendaExistente = vendaService.buscarPorId(id);
            if (vendaExistente.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            // Excluir venda
            vendaService.excluirVenda(id);
            
            return ResponseEntity.ok(Map.of("mensagem", "Venda excluída com sucesso"));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("mensagem", "Erro ao excluir venda: " + e.getMessage()));
        }
    }
    
    @GetMapping("/produto/{produtoId}/estoque")
    public ResponseEntity<?> verificarEstoque(@PathVariable Long produtoId) {
        Optional<Estoque> estoqueOpt = estoqueService.buscarPorProdutoId(produtoId);
        
        if (estoqueOpt.isPresent()) {
            return ResponseEntity.ok(estoqueOpt.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
