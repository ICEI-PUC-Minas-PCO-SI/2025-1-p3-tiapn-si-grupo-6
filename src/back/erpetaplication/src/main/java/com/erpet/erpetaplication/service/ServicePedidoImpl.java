package com.erpet.erpetaplication.service;

import com.erpet.erpetaplication.model.Pedido;
import com.erpet.erpetaplication.dao.PedidoDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicePedidoImpl implements IServicePedido {

    @Autowired
    private PedidoDAO pedidoDAO;

    @Override
    public Pedido cadastrarPedido(Pedido pedido) {
        return pedidoDAO.save(pedido);
    }

    @Override
    public Pedido buscarPorId(Long id) {
        return pedidoDAO.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado com ID: " + id));
    }

    @Override
    public Pedido editarPedido(Long id, Pedido pedido) {
        Pedido existente = buscarPorId(id);
        pedido.setId(existente.getId());
        return pedidoDAO.save(pedido);
    }

    @Override
    public void excluirPedido(Long id) {
        pedidoDAO.deleteById(id);
    }

    @Override
    public List<Pedido> listarTodos() {
        return pedidoDAO.findAll();
    }

    @Override
    public List<Pedido> buscarPorCliente(String cliente) {
        return pedidoDAO.findByCliente(cliente);
    }

    @Override
    public List<Pedido> buscarPorStatus(String status) {
        return pedidoDAO.findByStatus(status);
    }
}