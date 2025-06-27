package com.erpet.erpetaplication.controller;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.erpet.erpetaplication.annotations.LoggableAcao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.http.HttpHeaders;

import com.erpet.erpetaplication.dto.ProdutoDTO;
import com.erpet.erpetaplication.dto.FornecedorDTO;
import com.erpet.erpetaplication.dto.PedidoDTO;
import com.erpet.erpetaplication.dto.ItemPedidoDTO;
import com.erpet.erpetaplication.dto.UsuarioDTO;
import com.erpet.erpetaplication.dto.CategoriaDTO;
import com.erpet.erpetaplication.model.Fornecedor;
import com.erpet.erpetaplication.model.Produto;
import com.erpet.erpetaplication.model.Pedido;
import com.erpet.erpetaplication.model.ItemPedido;
import com.erpet.erpetaplication.model.Usuario;
import com.erpet.erpetaplication.model.Categoria;
import com.erpet.erpetaplication.service.IServiceFornecedor;
import com.erpet.erpetaplication.service.IServiceProduto;
import com.erpet.erpetaplication.service.IServicePedido;
import com.erpet.erpetaplication.service.IServiceUsuario;
import com.erpet.erpetaplication.service.IServiceCategoria;

@RestController
@RequestMapping("/pedidos")
@CrossOrigin(origins = "http://localhost:3000")


public class PedidoController {

    @Autowired
    private IServicePedido pedidoService;

    @PostMapping("/cadastrar")
    public ResponseEntity<PedidoDTO> cadastrarPedido(@RequestBody Pedido pedido) {
        Pedido novo = pedidoService.cadastrarPedido(pedido);
        PedidoDTO dto = converterParaDTO(novo);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<PedidoDTO> buscarPorId(@PathVariable Integer id) {
        Pedido pedido = pedidoService.buscarPorId(id);
        PedidoDTO dto = converterParaDTO(pedido);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<PedidoDTO> editarPedido(@PathVariable Integer id, @RequestBody Pedido pedido) {
        Pedido atualizado = pedidoService.editarPedido(id, pedido);
        PedidoDTO dto = converterParaDTO(atualizado);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<PedidoDTO>> listarTodos(
            @RequestParam(required = false) Integer fornecedorId,
            @RequestParam(required = false) String status) {

        List<Pedido> pedidos;

        if (fornecedorId != null) {
            pedidos = pedidoService.buscarPorFornecedorId(fornecedorId);
        } else if (status != null && !status.isEmpty()) {
            pedidos = pedidoService.buscarPorStatus(status);
        } else {
            pedidos = pedidoService.listarTodos();
        }

        List<PedidoDTO> dtoList = pedidos.stream()
                .map(this::converterParaDTO)
                .toList();

        return ResponseEntity.ok(dtoList);
    }

    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<String> excluirPedido(@PathVariable Integer id) {
        pedidoService.excluirPedido(id);
        return ResponseEntity.ok("Pedido excluído com sucesso!");
    }

    // ==============================
    // Conversor direto no controller
    // ==============================

    private PedidoDTO converterParaDTO(Pedido pedido) {
        PedidoDTO dto = new PedidoDTO();
        dto.setId(pedido.getId());
        dto.setValor(pedido.getValor());
        dto.setNotaFiscal(pedido.getNotaFiscal());
        dto.setDataAtualizacao(pedido.getDataAtualizacao());
        dto.setStatus(pedido.getStatus());

        // Fornecedor
        if (pedido.getFornecedor() != null) {
            Fornecedor f = pedido.getFornecedor();
            FornecedorDTO fDTO = new FornecedorDTO();
            fDTO.setId(f.getId());
            fDTO.setNome(f.getNome());
            fDTO.setTelefone(f.getTelefone());
            fDTO.setCidade(f.getCidade());
            dto.setFornecedor(fDTO);
        }

        // Usuario
        if (pedido.getUsuario() != null) {
            Usuario u = pedido.getUsuario();
            UsuarioDTO uDTO = new UsuarioDTO();
            uDTO.setId(u.getId());
            uDTO.setNome(u.getNome());
            uDTO.setEmail(u.getEmail());
            dto.setUsuario(uDTO);
        }

        // Itens
        List<ItemPedidoDTO> itensDTO = pedido.getItens().stream().map(item -> {
            ItemPedidoDTO itemDTO = new ItemPedidoDTO();
            itemDTO.setId(item.getId());
            itemDTO.setQuantidade(item.getQuantidade());
            itemDTO.setSubtotal(item.getSubtotal());

            Produto p = item.getProduto();
            if (p != null) {
                ProdutoDTO pDTO = new ProdutoDTO();
                pDTO.setId(p.getId());
                pDTO.setNome(p.getNome());
                pDTO.setDescricao(p.getDescricao());
                pDTO.setQuantidade(p.getQuantidade());
                pDTO.setDisponivel(p.getDisponivel());
                pDTO.setDataValidade(p.getDataValidade());
                pDTO.setPreco(p.getPreco());
                pDTO.setCodigoBarras(p.getCodigoBarras());
                pDTO.setUrlFoto("/api/produtos/" + p.getId() + "/foto");
                pDTO.setNomeFoto(p.getNomeFoto());
                pDTO.setTipoFoto(p.getTipoFoto());

                // Categoria
                if (p.getCategoria() != null) {
                    Categoria c = p.getCategoria();
                    CategoriaDTO cDTO = new CategoriaDTO();
                    cDTO.setId(c.getId());
                    cDTO.setNome(c.getNome());
                    cDTO.setDescricao(c.getDescricao());
                    pDTO.setCategoria(cDTO);
                }

                // Fornecedor
                if (p.getFornecedor() != null) {
                    Fornecedor f = p.getFornecedor();
                    FornecedorDTO fDTO = new FornecedorDTO();
                    fDTO.setId(f.getId());
                    fDTO.setNome(f.getNome());
                    fDTO.setTelefone(f.getTelefone());
                    fDTO.setCidade(f.getCidade());
                    pDTO.setFornecedor(fDTO);
                }

                itemDTO.setProduto(pDTO);
            }

            return itemDTO;
        }).toList();

        dto.setItens(itensDTO);

        return dto;
    }
}
