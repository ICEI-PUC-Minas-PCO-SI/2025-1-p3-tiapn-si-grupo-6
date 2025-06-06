package com.erpet.erpetaplication.service;

import java.util.List;
import java.util.Optional;

import com.erpet.erpetaplication.model.Usuario;

public interface IServiceUsuario 
{

	List<Usuario> listarTodos();
	List<Usuario> listarTodosNaoExcluidos();
    Usuario salvarUsuario(Usuario usuario);
    Optional<Usuario> buscarPorLogin(String login);
    Usuario buscarPorId(Long id);
    List<Usuario> buscarPorNome(String nome);
    Optional<Usuario> filtrarPorTipo(String tipo);
    Usuario excluirUsuario(Long id);
    Usuario editarUsuario(Long id, Usuario novosDados);
    Usuario editarSenha(Long id, String novaSenha);
    Boolean validarLogin(String login, String senhaEmTextoPlano);
}
