package com.erpet.erpetaplication.dao;

import com.erpet.erpetaplication.model.Venda;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface VendaDAO extends JpaRepository<Venda, Long> {
    List<Venda> findByDataPedidoBetween(LocalDateTime inicio, LocalDateTime fim);
    List<Venda> findAllByOrderByDataPedidoDesc();
}