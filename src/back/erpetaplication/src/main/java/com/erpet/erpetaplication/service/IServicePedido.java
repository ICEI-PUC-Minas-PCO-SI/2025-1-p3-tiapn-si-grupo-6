package com.erpet.erpetaplication.service;

import com.erpet.erpetaplication.model.Pedido;

import java.util.List;

public interface IServicePedido {
    Pedido cadastrarPedido(Pedido pedido);
    Pedido buscarPorId(Long id);
    Pedido editarPedido(Long id, Pedido pedido);
    void excluirPedido(Long id);
    List<Pedido> listarTodos();
    List<Pedido> buscarPorFornecedor(String fornecedor);
    List<Pedido> buscarPorStatus(String status);
}