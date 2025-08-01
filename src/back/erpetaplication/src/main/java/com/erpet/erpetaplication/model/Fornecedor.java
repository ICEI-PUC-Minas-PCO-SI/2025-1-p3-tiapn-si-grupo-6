package com.erpet.erpetaplication.model;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
@Table(name = "fornecedor")
public class Fornecedor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "Nome", nullable = false, length = 120)
    private String nome;

    @Column(name = "Responsavel", nullable = false, length = 100)
    private String responsavel;

    @Column(name = "Email", nullable = false, length = 100)
    private String email;

    @Column(name = "Telefone", nullable = false, length = 120)
    private String telefone;

    @Column(name = "CEP", nullable = false, length = 10)
    private String cep;

    @Column(name = "Bairro", length = 50)
    private String bairro;

    @Column(name = "Cidade", length = 50)
    private String cidade;

    @Column(name = "Estado", length = 30)
    private String estado;

    @Column(name = "Logradouro", nullable = false, length = 100)
    private String logradouro;

    @Column(name = "Numero")
    private Integer numero;

    @Column(name = "Observacoes", length = 240)
    private String observacoes;

    @OneToMany(mappedBy = "fornecedor", cascade = CascadeType.ALL)
    private List<Produto> produtos;

    @JsonIgnore
    @Column(name = "Data_Inclusao")
    private LocalDateTime dataInclusao;

    @JsonIgnore
    @Column(name = "Data_Exclusao")
    private LocalDateTime dataExclusao;

    @PrePersist
    protected void prePersist() {
        this.dataInclusao = LocalDateTime.now();
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getResponsavel() {
        return responsavel;
    }

    public void setResponsavel(String responsavel) {
        this.responsavel = responsavel;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public Integer getNumero() {
        return numero;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public LocalDateTime getDataInclusao() {
        return dataInclusao;
    }

    public void setDataInclusao(LocalDateTime dataInclusao) {
        this.dataInclusao = dataInclusao;
    }

    public LocalDateTime getDataExclusao() {
        return dataExclusao;
    }

    public void setDataExclusao(LocalDateTime dataExclusao) {
        this.dataExclusao = dataExclusao;
    }

    public String getEnderecoCompleto()
    {
        return this.cidade + " - " + this.bairro + this.logradouro + this.numero;
    }

    public List<Produto> getProdutos() {
        return produtos;
    }

    public void setProdutos(List<Produto> produtos) {
        this.produtos = produtos;
    }
}