package com.erpet.erpetaplication.enums;

public enum TipoUsuarioEnum 
{

	
	ADMINISTRADOR ("Administrador",		"ADM"),
	GERENTE		  ("Gerente",			"GER"),
	FUNCIONARIO   ("Funcionário",		"FUN");
	
	
	private final String descricao;
	private final String sigla;
	
	TipoUsuarioEnum(String descricao, String sigla)
	{
		this.descricao = descricao;
		this.sigla = sigla;
	}

	public String getDescricao() 
	{
		return descricao;
	}

	public String getSigla() 
	{
		return sigla;
	}
	
	
}
