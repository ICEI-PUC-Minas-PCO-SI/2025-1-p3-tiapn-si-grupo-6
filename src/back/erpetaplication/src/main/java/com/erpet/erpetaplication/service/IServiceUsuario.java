package com.erpet.erpetaplication.service;

import java.util.List;
import java.util.Optional;

import com.erpet.erpetaplication.model.Usuario;

public interface IServiceUsuario 
{

	List<Usuario> listarTodos();
	List<Usuario> listarTodosNaoExcluidos();
    Usuario salvarUsuario(Usuario usuario);
    Usuario buscarPorLogin(String login);
    Usuario buscarPorId(Integer id);
    List<Usuario> buscarPorNome(String nome);
    Optional<Usuario> filtrarPorTipo(String tipo);
    Usuario excluirUsuario(Integer id);
    Usuario editarUsuario(Integer id, Usuario novosDados);
    Usuario editarSenha(Integer id, String novaSenha);
    Boolean validarLogin(String login, String senhaEmTextoPlano);
}
