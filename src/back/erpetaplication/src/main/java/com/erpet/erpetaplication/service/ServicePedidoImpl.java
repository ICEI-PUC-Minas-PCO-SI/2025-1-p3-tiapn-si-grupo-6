package com.erpet.erpetaplication.service;

import com.erpet.erpetaplication.model.Pedido;
import com.erpet.erpetaplication.dao.PedidoDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

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
        Pedido pedido = pedidoDAO.findPedidoCompletoPorId(id);
        if (pedido == null) {
            throw new RuntimeException("Pedido não encontrado com ID: " + id);
        }
        return pedido;
    }

    @Override
    @Transactional
    public Pedido editarPedido(Long id, Pedido pedidoAtualizado) {
        Pedido existente = buscarPorId(id);

        existente.setStatus(pedidoAtualizado.getStatus());
        existente.setFornecedor(pedidoAtualizado.getFornecedor());
        existente.setItens(pedidoAtualizado.getItens());
        existente.setTotal(pedidoAtualizado.getTotal());
        existente.setData(pedidoAtualizado.getData());

        return pedidoDAO.save(existente);
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
    public List<Pedido> buscarPorFornecedor(String fornecedor) {
        return pedidoDAO.findByFornecedor_Nome(fornecedor);
    }

    @Override
    public List<Pedido> buscarPorStatus(String status) {
        return pedidoDAO.findByStatus(status);
    }
}