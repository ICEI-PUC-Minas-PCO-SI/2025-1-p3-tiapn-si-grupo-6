package com.erpet.erpetaplication.service;

import com.erpet.erpetaplication.dao.ClienteDAO;
import com.erpet.erpetaplication.dao.ProdutoDAO;
import com.erpet.erpetaplication.dao.UsuarioDAO;
import com.erpet.erpetaplication.dao.VendaDAO;
import com.erpet.erpetaplication.dto.ItemVendaDTO;
import com.erpet.erpetaplication.dto.VendaDTO;
import com.erpet.erpetaplication.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ServiceVendaImpl implements IServiceVenda
{
        @Autowired
        VendaDAO vendaDAO;

        @Autowired
        UsuarioDAO usuarioDAO;

        @Autowired
        ProdutoDAO produtoDAO;

        @Autowired
        ClienteDAO clienteDAO;

    public Venda realizarVenda(VendaDTO dto) {
        Venda venda = new Venda();

        venda.setDataPedido(dto.getDataPedido() != null ? dto.getDataPedido() : LocalDateTime.now());
        venda.setObservacoes(dto.getObservacoes());

        if (dto.getClienteId() != null)
        {
            Cliente cliente = clienteDAO.findById(dto.getClienteId())
                    .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
            venda.setCliente(cliente);
        }

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Usuario vendedor = usuarioDAO.findByLogin(username)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        venda.setVendedor(vendedor);

        List<ItemVenda> itens = dto.getItens().stream().map(itemDTO -> {
            Produto produto = produtoDAO.findById(itemDTO.getProdutoId())
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

            if(itemDTO.getQuantidade() > produto.getQuantidade())
            {
                throw new RuntimeException("A quantidade de produtos no estoque é insuficiente para realizar a venda!");
            }

            produto.setQuantidade(produto.getQuantidade()-itemDTO.getQuantidade());
            produto = produtoDAO.save(produto);

            ItemVenda item = new ItemVenda();
            item.setQuantidade(itemDTO.getQuantidade());
            item.setPrecoUnitario(itemDTO.getPrecoUnitario());
            item.setProduto(produto);
            item.setVenda(venda);
            produto.setQuantidade(produto.getQuantidade()-1);
            return item;
        }).toList();

        venda.setItens(itens);
        venda.setValorTotal(itens.stream()
                .mapToDouble(i -> i.getPrecoUnitario() * i.getQuantidade())
                .sum());

        return vendaDAO.save(venda);
    }

        public void cancelarVenda(Long id) {
            vendaDAO.deleteById(id);
        }

        public Venda buscarPorId(Long id) {
            return vendaDAO.findById(id)
                    .orElseThrow(() -> new RuntimeException("Venda não encontrada"));
        }

        public List<Venda> listarPorPeriodo(LocalDateTime inicio, LocalDateTime fim) {
            return vendaDAO.findByDataPedidoBetween(inicio, fim);
        }

    @Override
    public List<VendaDTO> listarTodas()
    {
        List<Venda>vendas = vendaDAO.findAllByOrderByDataPedidoDesc();
        List<VendaDTO> vendasDTO = new ArrayList<VendaDTO>();


        for(Venda venda : vendas)
        {
            List<ItemVendaDTO> itemVendaDTO = new ArrayList<ItemVendaDTO>();
            VendaDTO v = new VendaDTO();
            v.setDataPedido(venda.getDataPedido());
            v.setId(venda.getId());
            v.setUsuario(venda.getVendedor().getNome());

            if(venda.getCliente()!= null)
            {
                v.setCliente(venda.getCliente().getNome());
            }
            v.setObservacoes(venda.getObservacoes());

            for(ItemVenda item : venda.getItens())
            {
                ItemVendaDTO iv = new ItemVendaDTO();
                iv.setQuantidade(item.getQuantidade());
                iv.setPrecoUnitario(item.getPrecoUnitario());
                iv.setProdutoId(item.getProduto().getId());
                iv.setNome(item.getProduto().getNome());
                itemVendaDTO.add(iv);
            }
            v.setItens(itemVendaDTO);
            v.setValorTotal(venda.getValorTotal());
            vendasDTO.add(v);
        }
        return vendasDTO;
    }

}




