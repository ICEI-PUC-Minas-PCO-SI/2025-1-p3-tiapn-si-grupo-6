package com.erpet.erpetaplication.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;

@MappedSuperclass
public abstract class PessoaAbstract 
{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long Id;
	
	@Column(name ="Nome")
	private String nome;
	
	@Column(name ="Email")
	private String email;
	
	@Column(name="Endereco")
	private String endereco;
	
	@Column(name = "CEP")
	private String CEP;
	
	@Column(name = "Bairro")
	private String bairro;
	
	@Column(name = "Logradouro")
	private String logradouro;
	
	@Column(name = "Numero")
	private String numero;
	
	@Column(name = "Data_Inclusao")
	private LocalDateTime dataInclusao;
	
	@Column(name = "Data_Exclusao")
	private LocalDateTime dataExclusao;
	 

	@PrePersist
	protected void prePersist() 
	{
		this.dataInclusao = LocalDateTime.now();
	}
	 
	public Long getId() 
	{
		return Id;
	}
	public void setId(Long id) 
	{
		Id = id;
	}
	public String getNome() 
	{
		return nome;
	}
	public void setNome(String nome) 
	{
		this.nome = nome;
	}
	public String getEmail()
	{
		return email;
	}
	public void setEmail(String email)
	{
		this.email = email;
	}
	public String getEndereco()
	{
		return endereco;
	}
	public void setEndereco(String endereco) 
	{
		this.endereco = endereco;
	}
	public String getCEP() 
	{
		return CEP;
	}
	public void setCEP(String CEP) 
	{
		this.CEP = CEP;
	}
	public String getBairro() 
	{
		return bairro;
	}
	public void setBairro(String Bairro) 
	{
		bairro = Bairro;
	}
	public String getLogradouro() 
	{
		return logradouro;
	}
	public void setLogradouro(String Logradouro) 
	{
		logradouro = Logradouro;
	}
	public String getNumero()
	{
		return numero;
	}
	public void setNumero(String Numero)
	{
		this.numero = Numero;
	}
	public LocalDateTime getDataInclusao()
	{
		return dataInclusao;
	}
	public void setDataInclusao(LocalDateTime dataInclusao) 
	{
		this.dataInclusao = dataInclusao;
	}
	public LocalDateTime getDataExclusao() 
	{
		return dataExclusao;
	}
	public void setDataExclusao(LocalDateTime dataExclusao) 
	{
		this.dataExclusao = dataExclusao;
	}
	public String getEnderecoCompleto()
	{
		return this.endereco + " - " + this.bairro + " - " + this.logradouro;
	}
	
	
	 
}
