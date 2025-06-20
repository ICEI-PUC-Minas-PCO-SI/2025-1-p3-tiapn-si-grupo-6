package com.erpet.erpetaplication.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.erpet.erpetaplication.model.LoginRequest;
import com.erpet.erpetaplication.model.Usuario;
import com.erpet.erpetaplication.security.JwtTokenService;
import com.erpet.erpetaplication.security.UserDetailsImpl;
import com.erpet.erpetaplication.service.ServiceUsuarioImpl;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private ServiceUsuarioImpl serviceUsuario;

    @Autowired
    private JwtTokenService jwtTokenService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) 
    {
        try 
        {
            boolean loginValido = serviceUsuario.validarLogin(request.getLogin(), request.getSenha());

            if (!loginValido)
            {
                return ResponseEntity.status(401).body("Login ou senha inválidos");
            }

            Usuario usuario = serviceUsuario.buscarPorLogin(request.getLogin());
            UserDetailsImpl userDetails = new UserDetailsImpl(usuario);
            String token = jwtTokenService.generateToken(userDetails);

            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("tipoUsuario", usuario.getTipoUsuario().name());

            return ResponseEntity.ok(response);

        } 
        catch (RuntimeException ex) 
        {
            return ResponseEntity.status(401).body("Login ou senha inválidos");
        }
    }
}
