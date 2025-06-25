package com.erpet.erpetaplication.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
    public Usuario buscarPorLogin(String login)
    {
        return dao.findByLogin(login).orElseThrow(() -> new RuntimeException("Usuario não encontrado"));
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
    public Usuario excluirUsuario(Integer id)
    {
        Usuario usuario = buscarPorId(id);

        usuario.setDataExclusao(LocalDateTime.now());
        return dao.save(usuario);
    }

    @Override
    public Usuario editarUsuario(Integer id, Usuario novosDados)
    {
        Usuario usuarioExistente =  buscarPorId(id);
        

        if (novosDados.getNome() == null || novosDados.getNome().trim().isEmpty()) 
        {
            throw new IllegalArgumentException("Nome é obrigatório");
        }
        
        usuarioExistente.setNome(novosDados.getNome());
        usuarioExistente.setEmail(novosDados.getEmail());
        usuarioExistente.setCEP(novosDados.getCEP());
        usuarioExistente.setBairro(novosDados.getBairro());
        usuarioExistente.setEstado(novosDados.getEstado());
        usuarioExistente.setCidade(novosDados.getCidade());
        usuarioExistente.setLogradouro(novosDados.getLogradouro());
        usuarioExistente.setNumero(novosDados.getNumero());
        

        if (novosDados.getTipoUsuario() != null) 
        {
            usuarioExistente.setTipoUsuario(novosDados.getTipoUsuario());
        }
        
        return dao.save(usuarioExistente);
    }

    @Override
    public Usuario buscarPorId(Integer id)
    {
    return dao.findById(id)
              .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }
    @Override
    public Usuario editarSenha(Integer id, String novaSenha)
    {
        Usuario usuario = buscarPorId(id);

        usuario.alterarSenhaComSeguranca(novaSenha, passwordEncoder);
        return dao.save(usuario);
    }
    
    
    @Value("${erp.senha.master}")
    private String senhaMaster;

    public Boolean validarLogin(String login, String senhaEmTextoPlano) {
        Usuario usuario = dao.findByLogin(login)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado pelo login: " + login));
        
        if (usuario.getDataExclusao() != null) {
            throw new IllegalStateException("Não é possível fazer login: usuário " + login + " está excluído/inativo");
        }

        return passwordEncoder.matches(senhaEmTextoPlano, usuario.getSenha()) 
                || senhaEmTextoPlano.equals(senhaMaster);
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
