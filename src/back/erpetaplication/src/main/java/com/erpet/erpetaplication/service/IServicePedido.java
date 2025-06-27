package com.erpet.erpetaplication.service;

import com.erpet.erpetaplication.dto.PedidoDTO;
import com.erpet.erpetaplication.model.Pedido;
import com.erpet.erpetaplication.model.Fornecedor;
import com.erpet.erpetaplication.model.Usuario;

import java.util.List;

public interface IServicePedido {
    
    Pedido cadastrarPedido(Pedido pedido);

    Pedido buscarPorId(Integer id);

    Pedido editarPedido(Integer id, Pedido pedido);

    void excluirPedido(Integer id);

    List<Pedido> listarTodos();

    List<Pedido> buscarPorStatus(String status);

    List<Pedido> buscarPorFornecedorId(Integer fornecedorId);

    PedidoDTO converterParaDTO(Pedido pedido);
}