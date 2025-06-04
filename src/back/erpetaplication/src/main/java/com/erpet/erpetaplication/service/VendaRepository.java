package com.erpet.repositories;

import com.erpet.models.Venda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface VendaRepository extends JpaRepository<Venda, Long> {
    List<Venda> findByClienteId(Long clienteId);
    List<Venda> findByUsuarioId(Long usuarioId);
    List<Venda> findByDataVendaBetween(LocalDate inicio, LocalDate fim);
    List<Venda> findByStatus(String status);
}
