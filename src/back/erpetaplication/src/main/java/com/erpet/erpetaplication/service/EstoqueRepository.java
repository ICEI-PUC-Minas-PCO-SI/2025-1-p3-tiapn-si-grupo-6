package com.erpet.repositories;

import com.erpet.models.Estoque;
import com.erpet.models.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EstoqueRepository extends JpaRepository<Estoque, Long> {
    Optional<Estoque> findByProduto(Produto produto);
    Optional<Estoque> findByProdutoId(Long produtoId);
}
