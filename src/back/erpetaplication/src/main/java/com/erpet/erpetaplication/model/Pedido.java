package com.erpet.erpetaplication.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "pedido")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cliente;

    private String status;

    private Double total;

    private Long fornecedorId;  // Relacionamento simplificado (pode ser um Fornecedor completo se quiser)

    // Relacionamento com itens do pedido
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "pedido_id") // Cria a coluna "pedido_id" na tabela de itens
    private List<ItemPedido> itens;

    // 🔥 Construtores
    public Pedido() {
    }

    public Pedido(Long id, String cliente, String status, Double total, Long fornecedorId, List<ItemPedido> itens) {
        this.id = id;
        this.cliente = cliente;
        this.status = status;
        this.total = total;
        this.fornecedorId = fornecedorId;
        this.itens = itens;
    }

    // 🔥 Getters e Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCliente() {
        return cliente;
    }

    public void setCliente(String cliente) {
        this.cliente = cliente;
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

    public Long getFornecedorId() {
        return fornecedorId;
    }

    public void setFornecedorId(Long fornecedorId) {
        this.fornecedorId = fornecedorId;
    }

    public List<ItemPedido> getItens() {
        return itens;
    }

    public void setItens(List<ItemPedido> itens) {
        this.itens = itens;
    }
}