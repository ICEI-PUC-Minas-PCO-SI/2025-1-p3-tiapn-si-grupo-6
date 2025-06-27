package com.erpet.erpetaplication.service;


import com.erpet.erpetaplication.model.Historico;

import java.util.List;

public interface IServiceHistorico
{
    public void salvarLog(String titulo, String observacao);
    public List<Historico> historicoList();
}
