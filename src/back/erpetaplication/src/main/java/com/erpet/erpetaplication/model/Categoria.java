package com.erpet.erpetaplication.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;

@Entity
public class Categoria 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name="nome", nullable = false)
	private String nome;
	
	@Column(name="descricao", nullable = false)
	private String descricao;
	
    @JsonIgnore
	@Column(name="data_inclusao")
	private LocalDateTime dataInclusao;
	
    @JsonIgnore
	@Column(name="data_exclusao")
	private LocalDateTime dataExclusao;

	
	@PrePersist
	protected void prePersist() 
	{
		this.dataInclusao = LocalDateTime.now();
	}
	
	public Integer getId() 
	{
		return id;
	}

	public void setId(Integer id) 
	{
		this.id = id;
	}

	public String getNome() 
	{
		return nome;
	}

	public void setNome(String nome)
	{
		this.nome = nome;
	}

	public String getDescricao() 
	{
		return descricao;
	}

	public void setDescricao(String descricao) 
	{
		this.descricao = descricao;
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
    
	public String getCategoriaCompleta()
	{
		return "Nome: " + this.nome +  "- Descrição: " + this.descricao;
	}
}