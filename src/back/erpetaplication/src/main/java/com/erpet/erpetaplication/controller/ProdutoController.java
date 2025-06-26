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
import com.erpet.erpetaplication.model.Fornecedor;
import com.erpet.erpetaplication.model.Produto;
import com.erpet.erpetaplication.service.IServiceCategoria;
import com.erpet.erpetaplication.service.IServiceFornecedor;
import com.erpet.erpetaplication.service.IServiceProduto;
import com.erpet.erpetaplication.service.IServiceUpload;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    @Autowired
    private IServiceProduto service;

    @Autowired
    private IServiceUpload serviceUpload;

    @Autowired
    private IServiceCategoria serviceCategoria;

    @Autowired
    private IServiceFornecedor serviceFornecedor;

    @GetMapping
    public ResponseEntity<List<ProdutoDTO>> listarTodos() {
        List<Produto> produtos = service.listarTodosNaoExcluidos();
        List<ProdutoDTO> dtos = produtos.stream()
                .map(service::converterParaDTO)
                .toList();

        return ResponseEntity.ok(dtos);
    }

    // Listar todos incluindo Excluidos
    @GetMapping("/excluidos")
    public ResponseEntity<List<ProdutoDTO>> listarTodosIncluindoExcluidos() {
        List<Produto> produtos = service.listarTodos();
        List<ProdutoDTO> dtos = produtos.stream()
                .map(service::converterParaDTO)
                .toList();

        return ResponseEntity.ok(dtos);
    }

    // Criar novo produto
    @LoggableAcao("Criar produto -> #{#produto.nome}")
    @PostMapping
    public ResponseEntity<Produto> criarProduto(@RequestBody Produto produto) {
        Produto criado = service.salvarProduto(produto);
        return ResponseEntity.ok(criado);
    }

    // Buscar por nome (contém)
    @GetMapping("/nome")
    public ResponseEntity<List<Produto>> buscarPorNome(@RequestParam String nome) {
        List<Produto> produtos = service.buscarPorNome(nome);
        return ResponseEntity.ok(produtos);
    }

    // Editar produto (passando o produto completo com dados novos)
    @LoggableAcao("Editar produto -> #{#dto.id} - #{#dto.nome}")
    @PutMapping("{id}")
    public ResponseEntity<?> editarProduto(@PathVariable Integer id, @RequestBody ProdutoDTO dto) {
        System.out.println("Data recebida: " + dto.getDataValidade());

        Produto produto = service.editarProduto(id, dto);
        return ResponseEntity.ok(produto);
    }

    @GetMapping("/fornecedor/{idFornecedor}")
    public ResponseEntity<List<Produto>> buscarPorFornecedor(@PathVariable Fornecedor fornecedor) {
        List<Produto> produtos = service.buscarPorFornecedor(fornecedor);
        return ResponseEntity.ok(produtos);
    }

    // Excluir (soft delete com data exclusão)
    @LoggableAcao("<b> Excluir produto </b>  código #{#id}")
    @DeleteMapping("/{id}")
    public ResponseEntity<Produto> excluirProduto(@PathVariable Integer id) {
        try {
            Produto excluido = service.excluirProduto(id);
            return ResponseEntity.ok(excluido);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProdutoDTO> buscarPorId(@PathVariable Integer id) {
        try {
            Produto produto = service.buscarPorId(id);
            ProdutoDTO dto = service.converterParaDTO(produto);
            return ResponseEntity.ok(dto);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value = "/cadastrar", consumes = { "multipart/form-data" })
    public ResponseEntity<Produto> criarProdutoComFoto(
            @RequestParam("nome") String nome,
            @RequestParam("descricao") String descricao,
            @RequestParam("quantidade") Integer quantidade,
            @RequestParam("disponivel") Boolean disponivel,
            @RequestParam("data_validade") LocalDateTime dataValidade,
            @RequestParam("preco") BigDecimal preco,
            @RequestParam("categoriaId") Integer categoriaId,
            @RequestParam("fornecedorId") Integer fornecedorId,
            @RequestParam("codigoBarras") String codigoBarras,
            @RequestPart(value = "foto", required = false) MultipartFile foto) {
        try {
            Produto produto = new Produto();
            produto.setNome(nome);
            produto.setDescricao(descricao);
            produto.setQuantidade(quantidade);
            produto.setDisponivel(disponivel);
            produto.setDataValidade(dataValidade);
            produto.setPreco(preco);
            produto.setCodigoBarras(codigoBarras);

            produto.setCategoria(serviceCategoria.buscarPorId(categoriaId));
            produto.setFornecedor(serviceFornecedor.buscarPorId(fornecedorId));

            if (foto != null && !foto.isEmpty()) {
                produto.setFoto(foto.getBytes());
                produto.setNomeFoto(foto.getOriginalFilename());
                produto.setTipoFoto(foto.getContentType());
            }

            Produto criado = service.salvarProduto(produto);
            return ResponseEntity.status(201).body(criado);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/produtos/{id}/foto")
    public ResponseEntity<byte[]> obterFotoProduto(@PathVariable Integer id) {
        Produto produto = service.buscarPorId(id);
        byte[] foto = produto.getFoto();
        if (foto == null || foto.length == 0) {
            return ResponseEntity.notFound().build();
        }

        // Pega o tipo da foto
        String tipoFoto = produto.getTipoFoto();

        // Pega o nome da foto para tentar deduzir o tipo, caso tipoFoto esteja vazio ou
        // nulo
        String nomeFoto = produto.getNomeFoto();

        if (tipoFoto == null || tipoFoto.isEmpty()) {
            // Default para PNG
            tipoFoto = "image/png";

            if (nomeFoto != null) {
                String nomeMinusculo = nomeFoto.toLowerCase();
                if (nomeMinusculo.endsWith(".jpg") || nomeMinusculo.endsWith(".jpeg")) {
                    tipoFoto = "image/jpeg";
                } else if (nomeMinusculo.endsWith(".gif")) {
                    tipoFoto = "image/gif";
                }
            }
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, tipoFoto)
                .body(foto);
    }
}
