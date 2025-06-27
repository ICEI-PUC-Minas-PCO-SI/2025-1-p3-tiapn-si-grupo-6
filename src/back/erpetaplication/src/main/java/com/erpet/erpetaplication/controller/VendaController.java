package com.erpet.erpetaplication.controller;

import com.erpet.erpetaplication.dto.VendaDTO;
import com.erpet.erpetaplication.model.Venda;
import com.erpet.erpetaplication.service.IServiceVenda;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/vendas")
public class VendaController
{

    @Autowired
    IServiceVenda vendaService;


    @GetMapping
    public ResponseEntity<List<VendaDTO>> listarTodas()
    {
        return ResponseEntity.ok(vendaService.listarTodas());
    }

    @PostMapping
    public ResponseEntity<VendaDTO> realizarVenda(@RequestBody VendaDTO dto) {
        Venda venda = vendaService.realizarVenda(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelarVenda(@PathVariable Long id) {
        vendaService.cancelarVenda(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Venda> buscarPorId(@PathVariable Long id) {
        Venda venda = vendaService.buscarPorId(id);
        return ResponseEntity.ok(venda);
    }

    @GetMapping("/periodo")
    public ResponseEntity<List<Venda>> listarPorPeriodo(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime inicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fim) {
        return ResponseEntity.ok(vendaService.listarPorPeriodo(inicio, fim));
    }
}
