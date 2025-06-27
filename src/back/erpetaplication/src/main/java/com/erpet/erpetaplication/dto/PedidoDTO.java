package com.erpet.erpetaplication.dto;

import java.time.LocalDateTime;
import java.util.List;

public class PedidoDTO {
    private Integer id;
    private Double valor;
    private String notaFiscal;
    private LocalDateTime dataAtualizacao;
    private String status;

    // Troquei de nome para o objeto inteiro, não só nomeFornecedor
    private FornecedorDTO fornecedor;
    private UsuarioDTO usuario;

    private List<ItemPedidoDTO> itens;

    // Getters e setters

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Double getValor() { return valor; }
    public void setValor(Double valor) { this.valor = valor; }

    public String getNotaFiscal() { return notaFiscal; }
    public void setNotaFiscal(String notaFiscal) { this.notaFiscal = notaFiscal; }

    public LocalDateTime getDataAtualizacao() { return dataAtualizacao; }
    public void setDataAtualizacao(LocalDateTime dataAtualizacao) { this.dataAtualizacao = dataAtualizacao; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public FornecedorDTO getFornecedor() { return fornecedor; }
    public void setFornecedor(FornecedorDTO fornecedor) { this.fornecedor = fornecedor; }

    public UsuarioDTO getUsuario() { return usuario; }
    public void setUsuario(UsuarioDTO usuario) { this.usuario = usuario; }

    public List<ItemPedidoDTO> getItens() { return itens; }
    public void setItens(List<ItemPedidoDTO> itens) { this.itens = itens; }
}