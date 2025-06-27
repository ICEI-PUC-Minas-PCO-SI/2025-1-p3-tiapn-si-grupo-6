package com.erpet.erpetaplication.service;

import com.erpet.erpetaplication.security.UserDetailsImpl;
import com.erpet.erpetaplication.dao.UsuarioDAO;
import com.erpet.erpetaplication.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class ServiceUserDetailsImpl  implements UserDetailsService
{
    @Autowired
    UsuarioDAO dao;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
    {
        return new UserDetailsImpl(dao.findByLogin(username).get());
    }
}
