package com.erpet.erpetaplication.service;

import com.erpet.erpetaplication.model.Pedido;
import com.erpet.erpetaplication.dao.PedidoDAO;
import com.erpet.erpetaplication.dto.FornecedorDTO;
import com.erpet.erpetaplication.dto.ItemPedidoDTO;
import com.erpet.erpetaplication.dto.PedidoDTO;
import com.erpet.erpetaplication.dto.ProdutoDTO;
import com.erpet.erpetaplication.model.Fornecedor;
import com.erpet.erpetaplication.model.Usuario;
import com.erpet.erpetaplication.dto.UsuarioDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServicePedidoImpl implements IServicePedido {

    @Autowired
    private PedidoDAO pedidoDAO;

    @Override
    public Pedido cadastrarPedido(Pedido pedido) {
        return pedidoDAO.save(pedido);
    }

    @Override
    public Pedido buscarPorId(Integer id) {
        return pedidoDAO.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado com ID: " + id));
    }

    @Override
    public Pedido editarPedido(Integer id, Pedido pedido) {
        Pedido existente = buscarPorId(id);
        pedido.setId(existente.getId());
        return pedidoDAO.save(pedido);
    }

    @Override
    public void excluirPedido(Integer id) {
        pedidoDAO.deleteById(id);
    }

    @Override
    public List<Pedido> listarTodos() {
        return pedidoDAO.findAll();
    }

    // Remove método buscarPorCliente

    @Override
    public List<Pedido> buscarPorStatus(String status) {
        return pedidoDAO.findByStatus(status);
    }

    @Override
    public List<Pedido> buscarPorFornecedorId(Integer fornecedorId) {
        return pedidoDAO.findByFornecedorId(fornecedorId);
    }

    @Override
    public PedidoDTO converterParaDTO(Pedido pedido) {
        PedidoDTO dto = new PedidoDTO();
        dto.setId(pedido.getId());
        dto.setValor(pedido.getValor());
        dto.setNotaFiscal(pedido.getNotaFiscal());
        dto.setDataAtualizacao(pedido.getDataAtualizacao());
        dto.setStatus(pedido.getStatus());

        // Mapear Fornecedor para FornecedorDTO
        if (pedido.getFornecedor() != null) {
            Fornecedor fornecedor = pedido.getFornecedor();
            FornecedorDTO fornecedorDTO = new FornecedorDTO();
            fornecedorDTO.setId(fornecedor.getId());
            fornecedorDTO.setNome(fornecedor.getNome());
            fornecedorDTO.setTelefone(fornecedor.getTelefone());
            fornecedorDTO.setCidade(fornecedor.getCidade());
            dto.setFornecedor(fornecedorDTO);
        }

        // Mapear Usuario para UsuarioDTO
        if (pedido.getUsuario() != null) {
            Usuario usuario = pedido.getUsuario();
            UsuarioDTO usuarioDTO = new UsuarioDTO();
            usuarioDTO.setId(usuario.getId());
            usuarioDTO.setNome(usuario.getNome());
            usuarioDTO.setEmail(usuario.getEmail());
            // adicionar outros campos necessários
            dto.setUsuario(usuarioDTO);
        }

        // Mapear itens do pedido para ItemPedidoDTO
        List<ItemPedidoDTO> itensDTO = pedido.getItens().stream().map(item -> {
            ItemPedidoDTO itemDTO = new ItemPedidoDTO();
            itemDTO.setId(item.getId());
            itemDTO.setQuantidade(item.getQuantidade());
            itemDTO.SetPrecoUnitario(item.getPrecoUnitario());

            // Mapear Produto para ProdutoDTO
            if (item.getProduto() != null) {
                ProdutoDTO produtoDTO = new ProdutoDTO();
                produtoDTO.setId(item.getProduto().getId());
                produtoDTO.setNome(item.getProduto().getNome());
                produtoDTO.setDescricao(item.getProduto().getDescricao());
                produtoDTO.setQuantidade(item.getProduto().getQuantidade());
                produtoDTO.setDisponivel(item.getProduto().getDisponivel());
                produtoDTO.setDataValidade(item.getProduto().getDataValidade());
                produtoDTO.setPreco(item.getProduto().getPreco());
                produtoDTO.setCodigoBarras(item.getProduto().getCodigoBarras());
                produtoDTO.setUrlFoto("/api/produtos/" + item.getProduto().getId() + "/foto");
                produtoDTO.setNomeFoto(item.getProduto().getNomeFoto());
                produtoDTO.setTipoFoto(item.getProduto().getTipoFoto());

                // Categoria e Fornecedor podem ser mapeados aqui se necessário
                produtoDTO.setCategoria(null); // ou mapeie categoria se quiser
                produtoDTO.setFornecedor(null); // ou mapeie fornecedor se quiser

                itemDTO.setProduto(produtoDTO);
            }

            return itemDTO;
        }).collect(Collectors.toList());

        dto.setItens(itensDTO);

        return dto;
    }
}