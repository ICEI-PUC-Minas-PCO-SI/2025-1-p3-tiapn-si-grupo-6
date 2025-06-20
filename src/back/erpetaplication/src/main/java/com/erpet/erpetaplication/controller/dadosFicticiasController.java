package com.erpet.controllers;

import com.erpet.services.DadosFicticiasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/dados-ficticios")
@CrossOrigin(origins = "*")
public class DadosFicticiasController {

    @Autowired
    private DadosFicticiasService dadosFicticiasService;
    
    // Pra criar todos os dados de teste de uma vez só, tipo um setup!
    @PostMapping("/criar-tudo")
    public ResponseEntity<Map<String, Object>> criarTodosOsDadosDeTeste() {
        Map<String, Object> resultadoDoSetup = dadosFicticiasService.popularBancoComDadosDeTeste();
        
        if ((Boolean) resultadoDoSetup.get("sucesso")) {
            return ResponseEntity.ok(resultadoDoSetup);
        } else {
            return ResponseEntity.badRequest().body(resultadoDoSetup);
        }
    }
    
    // Pra limpar a bagunça depois dos testes, se precisar!
    @DeleteMapping("/limpar-tudo")
    public ResponseEntity<Map<String, Object>> limparTodosOsDadosDeTeste() {
        Map<String, Object> resultadoDaLimpeza = dadosFicticiasService.limparDadosDeTeste();
        
        if ((Boolean) resultadoDaLimpeza.get("sucesso")) {
            return ResponseEntity.ok(resultadoDaLimpeza);
        } else {
            return ResponseEntity.badRequest().body(resultadoDaLimpeza);
        }
    }
    
    // Só pra ver se o serviço de dados de teste tá de boa, funcionando!
    @GetMapping("/status-do-servico")
    public ResponseEntity<Map<String, Object>> checarStatusDoServico() {
        return ResponseEntity.ok(Map.of(
            "status", "online e pronto pra ação!",
            "mensagem", "O serviço de dados de teste tá on e respondendo.",
            "endpointsDisponiveis", Map.of(
                "criarTudo", "POST /api/dados-ficticios/criar-tudo",
                "limparTudo", "DELETE /api/dados-ficticios/limpar-tudo",
                "gerarVendasAvulsas", "POST /api/vendas/gerar-vendas-ficticias", // Esse é do outro controller, mas é bom lembrar!
                "gerarVendaPersonalizada", "POST /api/vendas/gerar-venda-personalizada" // Esse também!
            )
        ));
    }
}


