package com.erpet.erpetaplication.model;

import jakarta.persistence.*;
import java.util.List;
import java.time.LocalDate;


@Entity
@Table(name = "pedido")


public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String status;

    private Double total;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "fornecedor_id")
    private Fornecedor fornecedor;

    // Relacionamento com itens do pedido
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "pedido_id")
    private List<ItemPedido> itens;

    // 🔥 Construtores
    public Pedido() {
    }
    @Column(name = "data")
    private LocalDate data;
    
    public Pedido(Integer id, String status, Double total, Fornecedor fornecedor, List<ItemPedido> itens, LocalDate data) {
        this.id = id;
        this.status = status;
        this.total = total;
        this.fornecedor = fornecedor;
        this.itens = itens;
        this.data = data;
    }

    // 🔥 Getters e Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public Fornecedor getFornecedor() {
        return fornecedor;
    }
    
    public void setFornecedor(Fornecedor fornecedor) {
        this.fornecedor = fornecedor;
    }

    public List<ItemPedido> getItens() {
        return itens;
    }

    public void setItens(List<ItemPedido> itens) {
        this.itens = itens;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }
}