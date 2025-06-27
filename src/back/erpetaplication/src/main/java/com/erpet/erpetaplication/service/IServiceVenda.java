package com.erpet.erpetaplication.service;


import com.erpet.erpetaplication.dto.VendaDTO;
import com.erpet.erpetaplication.model.Venda;

import java.time.LocalDateTime;
import java.util.List;

public interface IServiceVenda
{

    public Venda realizarVenda(VendaDTO venda);

    public void cancelarVenda(Long id);

    public Venda buscarPorId(Long id);

    public List<Venda> listarPorPeriodo(LocalDateTime inicio, LocalDateTime fim);

    List<VendaDTO> listarTodas();
}
