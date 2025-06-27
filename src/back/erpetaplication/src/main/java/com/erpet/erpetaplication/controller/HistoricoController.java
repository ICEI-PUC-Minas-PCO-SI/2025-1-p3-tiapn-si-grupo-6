package com.erpet.erpetaplication.controller;

import com.erpet.erpetaplication.model.Historico;
import com.erpet.erpetaplication.service.IServiceHistorico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/historicos")
public class HistoricoController
{
    @Autowired
    IServiceHistorico historico;

    @GetMapping
    public ResponseEntity<List<Historico>> historicos()
    {
        return ResponseEntity.ok(historico.historicoList());
    }
}
