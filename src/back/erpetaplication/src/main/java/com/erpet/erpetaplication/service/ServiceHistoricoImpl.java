package com.erpet.erpetaplication.service;

import com.erpet.erpetaplication.dao.HistoricoDAO;
import com.erpet.erpetaplication.model.Historico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ServiceHistoricoImpl implements IServiceHistorico
{
    @Autowired
    HistoricoDAO dao;

    @Override
    public void salvarLog(String login, String acao) {
        Historico h = new Historico();
        h.setTitulo("O usuario: "+ login);
        h.setDescricao(" realizou a ação: " + acao);
        h.setInsclusao(LocalDateTime.now());
        dao.save(h);
    }

    @Override
    public List<Historico> historicoList()
    {
        return dao.findAllByOrderByInclusaoDesc();
    }
}
