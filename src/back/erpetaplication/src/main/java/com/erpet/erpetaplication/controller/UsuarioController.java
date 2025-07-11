package com.erpet.erpetaplication.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.erpet.erpetaplication.model.Usuario;
import com.erpet.erpetaplication.service.IServiceUsuario;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private IServiceUsuario service;

    @GetMapping
    public ResponseEntity<List<Usuario>> listarTodos()
    {
        List<Usuario> usuarios = service.listarTodosNaoExcluidos();
        return ResponseEntity.ok(usuarios);
    }
    
    //Listar todos incluindo Excluidos
    @GetMapping("/excluidos")
    public ResponseEntity<List<Usuario>> listarTodosIncluindoExcluidos()
    {
    	List<Usuario> usuarios = service.listarTodos();
    	return ResponseEntity.ok(usuarios);
    }
    
    // Criar novo usuário
    @PostMapping
    public ResponseEntity<Usuario> criarUsuario(@RequestBody Usuario usuario) 
    {
        Usuario criado = service.salvarUsuario(usuario);
        return ResponseEntity.ok(criado);
    }

    // Buscar por login
    @GetMapping("/login/{login}")
    public ResponseEntity<Usuario> buscarPorLogin(@PathVariable String login)
    {
        Optional<Usuario> usuario = Optional.ofNullable(service.buscarPorLogin(login));
        return usuario.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }

    // Buscar por nome (contém)
    @GetMapping("/nome")
    public ResponseEntity<List<Usuario>> buscarPorNome(@RequestParam String nome) 
    {
        List<Usuario> usuarios = service.buscarPorNome(nome);
        return ResponseEntity.ok(usuarios);
    }

    // Filtrar por tipo
    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<Usuario> filtrarPorTipo(@PathVariable String tipo) 
    {
        Optional<Usuario> usuario = service.filtrarPorTipo(tipo);
        return usuario.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Integer id) {
        try
        {
            Usuario usuario = service.buscarPorId(id);
            return ResponseEntity.ok(usuario);
        }
        catch (RuntimeException e) 
        {
            return ResponseEntity.notFound().build();
        }
}

    // Editar usuário (passando o usuário completo com dados novos)
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> editarUsuario(@PathVariable Integer id, @RequestBody Usuario novosDados)
    {
        try 
        {
            Usuario atualizado = service.editarUsuario(id, novosDados);
            return ResponseEntity.ok(atualizado);
        } 
        catch (RuntimeException e)
        {
            return ResponseEntity.notFound().build();
        }
    }

    // Editar senha
    @PutMapping("/{id}/senha")
    public ResponseEntity<Usuario> editarSenha(@PathVariable Integer id, @RequestBody String novaSenha)
    {
        try 
        {
            Usuario atualizado = service.editarSenha(id, novaSenha);
            return ResponseEntity.ok(atualizado);
        } 
        catch (RuntimeException e) 
        {
            return ResponseEntity.notFound().build();
        }
    }

    // Excluir (soft delete com data exclusão)
    @DeleteMapping("/{id}")
    public ResponseEntity<Usuario> excluirUsuario(@PathVariable Integer id)
    {
        try 
        {
            Usuario excluido = service.excluirUsuario(id);
            return ResponseEntity.ok(excluido);
        } 
        catch (RuntimeException e) 
        {
            return ResponseEntity.notFound().build();
        }
    }

    // Validar login (exemplo simples)
    @PostMapping("/validar")
    public ResponseEntity<String> validarLogin(@RequestParam String login, @RequestParam String senha)
    {
        if (service.validarLogin(login, senha)) 
        {
            return ResponseEntity.ok("Login válido!");
        } 
        else
        {
            return ResponseEntity.status(401).body("Login ou senha inválidos.");
        }
    }
}
