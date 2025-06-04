package com.erpet.repositories;

import com.erpet.models.ItemVenda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemVendaRepository extends JpaRepository<ItemVenda, Long> {
    
    List<ItemVenda> findByVendaId(Long vendaId);
    
    @Modifying
    @Query("DELETE FROM ItemVenda i WHERE i.venda.id = :vendaId")
    void deleteByVendaId(Long vendaId);
}
