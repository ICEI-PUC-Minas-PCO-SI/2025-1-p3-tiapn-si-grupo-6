package com.erpet.erpetaplication.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.erpet.erpetaplication.enums.TipoUsuarioEnum;
import com.erpet.erpetaplication.model.Usuario;

@Repository
public interface UsuarioDAO extends JpaRepository<Usuario, Integer>
{
	List<Usuario> findByNomeContainingIgnoreCase(String nome);
	Optional<Usuario> findByLogin(String login);
	Optional<Usuario> findByTipoUsuario(TipoUsuarioEnum valueOf);
	List<Usuario> findByDataExclusaoIsNull();

}
