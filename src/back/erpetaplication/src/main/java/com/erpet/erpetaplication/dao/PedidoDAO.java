package com.erpet.erpetaplication.dao;

import com.erpet.erpetaplication.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoDAO extends JpaRepository<Pedido, Long> {
    List<Pedido> findByCliente(String cliente);
    List<Pedido> findByStatus(String status);
}