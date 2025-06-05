package com.erpet.erpetaplication.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.erpet.erpetaplication.dao.UsuarioDAO;
import com.erpet.erpetaplication.enums.TipoUsuarioEnum;
import com.erpet.erpetaplication.model.Usuario;

@Service
public class ServiceUsuarioImpl implements IServiceUsuario {

    @Autowired
    private UsuarioDAO dao;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    
    @Override
    public Usuario salvarUsuario(Usuario usuario) 
    {
        usuario.alterarSenhaComSeguranca(usuario.getSenhaPura(), passwordEncoder);
        usuario.setDataInclusao(LocalDateTime.now());
        return dao.save(usuario);
    }

    @Override
    public Optional<Usuario> buscarPorLogin(String login) 
    {
        return dao.findByLogin(login);
    }

    @Override
    public List<Usuario> buscarPorNome(String nome) 
    {
        return dao.findByNomeContainingIgnoreCase(nome);
    }

    @Override
    public Optional<Usuario> filtrarPorTipo(String tipo) 
    {
        return dao.findByTipoUsuario(TipoUsuarioEnum.valueOf(tipo));
    }

    @Override
    public Usuario excluirUsuario(Long id) 
    {
        Usuario usuario = dao.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado para exclusão."));

        usuario.setDataExclusao(LocalDateTime.now());
        return dao.save(usuario);
    }

    @Override
    public Usuario editarUsuario(Long id, Usuario novosDados)
    {
        Usuario usuarioExistente = dao.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        

        if (novosDados.getNome() == null || novosDados.getNome().trim().isEmpty()) 
        {
            throw new IllegalArgumentException("Nome é obrigatório");
        }
        
        usuarioExistente.setNome(novosDados.getNome());
        usuarioExistente.setEmail(novosDados.getEmail());
        usuarioExistente.setEndereco(novosDados.getEndereco());
        usuarioExistente.setCEP(novosDados.getCEP());
        usuarioExistente.setBairro(novosDados.getBairro());
        usuarioExistente.setLogradouro(novosDados.getLogradouro());
        usuarioExistente.setNumero(novosDados.getNumero());
        

        if (novosDados.getTipoUsuario() != null) 
        {
            usuarioExistente.setTipoUsuario(novosDados.getTipoUsuario());
        }
        
        return dao.save(usuarioExistente);
    }

    @Override
    public Usuario buscarPorId(Long id)
    {
    return dao.findById(id)
              .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }
    @Override
    public Usuario editarSenha(Long id, String novaSenha)
    {
        Usuario usuario = dao.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        usuario.alterarSenhaComSeguranca(novaSenha, passwordEncoder);
        return dao.save(usuario);
    }
    
    public Boolean validarLogin(String login, String senhaEmTextoPlano)
    {
        Optional<Usuario> usuarioOpt = dao.findByLogin(login);

        if (usuarioOpt.isEmpty())
        {
            return false;
        }

        Usuario usuario = usuarioOpt.get();


        return passwordEncoder.matches(senhaEmTextoPlano, usuario.getSenha());
    }

	@Override
	public List<Usuario> listarTodos()
	{
		return dao.findAll();
	}

	@Override
	public List<Usuario> listarTodosNaoExcluidos() 
	{
		return dao.findByDataExclusaoIsNull();
	}

}
