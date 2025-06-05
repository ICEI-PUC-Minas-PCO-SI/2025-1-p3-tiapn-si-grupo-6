package com.erpet.erpetaplication.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class Cliente extends PessoaAbstract {

    @Column(name = "Telefone")
	private String telefone;


    public String getTelefone()
	{
		return telefone;
	}

    public void setTelefone(String telefone)
	{
		this.telefone = telefone;
	}

}
