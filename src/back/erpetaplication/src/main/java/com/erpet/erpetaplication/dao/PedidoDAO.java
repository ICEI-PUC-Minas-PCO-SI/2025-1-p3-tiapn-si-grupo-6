package com.erpet.erpetaplication.dao;

import com.erpet.erpetaplication.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoDAO extends JpaRepository<Pedido, Integer> {
    // Removido findByCliente porque não existe mais
    List<Pedido> findByStatus(String status);

    // Exemplo: buscar pedidos por fornecedorId
    List<Pedido> findByFornecedorId(Integer fornecedorId);

    // Exemplo: buscar pedidos por usuarioId
    List<Pedido> findByUsuarioId(Integer usuarioId);
}
