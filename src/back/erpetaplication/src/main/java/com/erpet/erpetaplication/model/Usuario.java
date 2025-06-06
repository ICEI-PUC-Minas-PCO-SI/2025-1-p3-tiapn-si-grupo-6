package com.erpet.erpetaplication.model;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.erpet.erpetaplication.enums.TipoUsuarioEnum;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Transient;

@Entity
public class Usuario extends PessoaAbstract {

    @Column(name = "login", nullable = false)
    private String login;

    @JsonIgnore
    @Column(name = "senha", nullable = false)
    private String senha;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo", nullable = false)
    private TipoUsuarioEnum tipoUsuario;

    @Transient
    private String senhaPura;
    
    public Usuario() {}

    public Usuario(String login, String senha, TipoUsuarioEnum tipoUsuario) {
        this.login = login;
        this.senha = senha;
        this.tipoUsuario = tipoUsuario;
    }

    public String getLogin() 
    {
        return login;
    }

    public void setLogin(String login) 
    {
        this.login = login;
    }

    public String getSenha() {
        return senha;
    }

    public TipoUsuarioEnum getTipoUsuario()
    {
        return tipoUsuario;
    }

    public void setTipoUsuario(TipoUsuarioEnum tipoUsuario) 
    {
        this.tipoUsuario = tipoUsuario;
    }

    public void alterarSenhaComSeguranca(String senhaPura, BCryptPasswordEncoder encoder) {
        if (senhaPura == null) throw new IllegalArgumentException("Senha não pode ser nula");
        this.senha = encoder.encode(senhaPura);
    }

	public String getSenhaPura() 
	{
		return senhaPura;
	}

	public void setSenhaPura(String senhaPura) 
	{
		this.senhaPura = senhaPura;
	}

    
}
