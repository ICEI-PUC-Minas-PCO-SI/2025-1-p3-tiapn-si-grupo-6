package com.erpet.erpetaplication.dto;

import com.erpet.erpetaplication.dto.ProdutoDTO;

public class ItemPedidoDTO {
    private Integer id;
    private ProdutoDTO produto;
    private Integer quantidade;
    private Double preco_unitario;
    private Double subtotal;

    // getters e setters
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public ProdutoDTO getProduto() {
        return produto;
    }
    public void setProduto(ProdutoDTO produto) {
        this.produto = produto;
    }
    public Integer getQuantidade() {
        return quantidade;
    }
    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }
    public Double getPrecoUnitario() {
        return preco_unitario;
    }
    public void SetPrecoUnitario(Double preco_unitario) {
        this.preco_unitario = preco_unitario;
    }
    public Double getSubtotal() {
        return subtotal;
    }
    public void setSubtotal(Double subtotal) {
        this.subtotal = subtotal;
    }
}