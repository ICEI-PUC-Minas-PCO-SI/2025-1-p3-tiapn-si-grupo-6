package com.erpet.erpetaplication.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name="Historico")
public class Historico
{
    @Id
    @GeneratedValue (strategy= GenerationType.IDENTITY)
    private Integer id;

    @Column(name="titulo")
    private String titulo;

    @Column (name="descricao")
    private String descricao;

    @Column(name = "inclusao")
    private LocalDateTime inclusao;

    public Historico()
    {

    }
    public Historico(String titulo, String descricao)
    {

    }




    @PrePersist
    protected void prePersist() {
        this.inclusao = LocalDateTime.now();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public LocalDateTime getInclusao() {
        return inclusao;
    }

    public void setInsclusao(LocalDateTime inclusao) {
        this.inclusao = inclusao;
    }
}
