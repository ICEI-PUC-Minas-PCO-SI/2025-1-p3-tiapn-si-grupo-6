package com.erpet.erpetaplication.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class ProdutoDTO {
    private Integer id;
    private String nome;
    private String descricao;
    private int quantidade;
    private boolean disponivel;
    private LocalDateTime dataValidade;
    private BigDecimal preco;
    private String linkFoto;
    private CategoriaDTO categoria;
    private FornecedorDTO fornecedor;


    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public Integer getQuantidade() { return quantidade; }
    public void setQuantidade(int quantidade) { this.quantidade = quantidade; }

    public Boolean getDisponivel() { return disponivel; }
    public void setDisponivel(boolean disponivel) { this.disponivel = disponivel; }

    public LocalDateTime getDataValidade() { return dataValidade; }
    public void setDataValidade(LocalDateTime dataValidade) { this.dataValidade = dataValidade; }

    public BigDecimal getPreco() { return preco; }
    public void setPreco(BigDecimal preco) { this.preco = preco; }

    public String getLinkFoto() { return linkFoto; }
    public void setLinkFoto(String linkFoto) { this.linkFoto = linkFoto; }

    public CategoriaDTO getCategoria() { return categoria; }
    public void setCategoria(CategoriaDTO categoria) { this.categoria = categoria; }

    public FornecedorDTO getFornecedor() { return fornecedor; }
    public void setFornecedor(FornecedorDTO fornecedor) { this.fornecedor = fornecedor; }
}
