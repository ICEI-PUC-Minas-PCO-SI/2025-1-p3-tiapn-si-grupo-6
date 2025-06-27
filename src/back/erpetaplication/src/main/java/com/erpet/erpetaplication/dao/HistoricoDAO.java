package com.erpet.erpetaplication.dao;

import com.erpet.erpetaplication.model.Historico;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HistoricoDAO  extends JpaRepository<Historico, Integer>
{
        List<Historico> findAllByOrderByInclusaoDesc();
}
