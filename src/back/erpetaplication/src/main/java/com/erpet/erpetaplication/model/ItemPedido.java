package com.erpet.erpetaplication.model;

import jakarta.persistence.*;

@Entity
@Table(name = "item_pedido_compra")
public class ItemPedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "pedido_compra_id", nullable = false)
    private Pedido pedidoCompra;

    @ManyToOne
    @JoinColumn(name = "produto_id", nullable = false)
    private Produto produto;

    @Column(name = "quantidade", nullable = false)
    private Integer quantidade;

    @Column(name = "preco_unitario", nullable = false)
    private Double precoUnitario;

    @Column(name = "subtotal", nullable = false)
    private Double subtotal;

    // Construtores
    public ItemPedido() {
    }

    public ItemPedido(Integer id, Pedido pedidoCompra, Produto produto, Integer quantidade, Double precoUnitario, Double subtotal) {
        this.id = id;
        this.pedidoCompra = pedidoCompra;
        this.produto = produto;
        this.quantidade = quantidade;
        this.precoUnitario = precoUnitario;
        this.subtotal = subtotal;
    }

    // Getters e Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Pedido getPedidoCompra() {
        return pedidoCompra;
    }

    public void setPedidoCompra(Pedido pedidoCompra) {
        this.pedidoCompra = pedidoCompra;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public Double getPrecoUnitario() {
        return precoUnitario;
    }

    public void setPrecoUnitario(Double precoUnitario) {
        this.precoUnitario = precoUnitario;
    }

    public Double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(Double subtotal) {
        this.subtotal = subtotal;
    }
}