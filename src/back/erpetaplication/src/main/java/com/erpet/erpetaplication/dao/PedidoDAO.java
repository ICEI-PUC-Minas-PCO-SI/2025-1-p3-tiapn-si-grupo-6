package com.erpet.erpetaplication.dao;

import com.erpet.erpetaplication.model.Fornecedor;
import com.erpet.erpetaplication.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PedidoDAO extends JpaRepository<Pedido, Long> {
    @Query("SELECT p FROM Pedido p LEFT JOIN FETCH p.fornecedor LEFT JOIN FETCH p.itens WHERE p.id = :id")
    Pedido findPedidoCompletoPorId(@Param("id") Long id);

    List<Pedido> findByFornecedor_Nome(String nome);
    List<Pedido> findByStatus(String status);

    @Query("SELECT p FROM Pedido p LEFT JOIN FETCH p.itens LEFT JOIN FETCH p.fornecedor WHERE p.id = :id")
    Optional<Pedido> buscarPedidoComItensEFornecedor(@Param("id") Long id);
}