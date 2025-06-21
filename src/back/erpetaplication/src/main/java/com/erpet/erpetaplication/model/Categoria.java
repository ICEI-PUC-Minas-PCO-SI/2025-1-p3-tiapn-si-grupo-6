package com.erpet.erpetaplication.model;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;

import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import org.hibernate.annotations.Cascade;

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
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

	@OneToMany(mappedBy = "categoria", cascade = CascadeType.ALL)
	List<Produto> produtos;
	
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

	public List<Produto> getProdutos() {
		return produtos;
	}

	public void setProdutos(List<Produto> produtos) {
		this.produtos = produtos;
	}
}
