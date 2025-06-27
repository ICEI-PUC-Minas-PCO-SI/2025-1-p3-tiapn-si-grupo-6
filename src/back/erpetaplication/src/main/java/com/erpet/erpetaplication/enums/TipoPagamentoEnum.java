package com.erpet.erpetaplication.enums;

public enum TipoPagamentoEnum {

	PIX	("pix"),
	CARTAO_CREDITO ("cartão de crédito"),
	CARTAO_DEBITO ("cartão de débito"),
	DINHEIRO ("dinheiro");
	
	
	private final String metodo;
	
	TipoPagamentoEnum(String metodo)
	{
		this.metodo = metodo;
	}
	
	public String getMetodo()
	{
		return this.metodo;
	}

}
