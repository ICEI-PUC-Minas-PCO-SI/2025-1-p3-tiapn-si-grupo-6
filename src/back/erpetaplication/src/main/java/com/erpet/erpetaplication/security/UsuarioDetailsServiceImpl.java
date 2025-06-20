package com.erpet.erpetaplication.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.erpet.erpetaplication.dao.UsuarioDAO;
import com.erpet.erpetaplication.model.Usuario;

@Service
public class UsuarioDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UsuarioDAO dao;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = dao.findByLogin(username)
            .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado: " + username));

        return new UserDetailsImpl(usuario);
    }
}
