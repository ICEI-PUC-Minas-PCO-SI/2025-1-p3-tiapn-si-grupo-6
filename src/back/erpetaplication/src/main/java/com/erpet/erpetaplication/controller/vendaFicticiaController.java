package com.erpet.controllers;

import com.erpet.models.*;
import com.erpet.services.ClienteService;
import com.erpet.services.EstoqueService;
import com.erpet.services.ProdutoService;
import com.erpet.services.VendaService;
import com.erpet.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/vendas")
@CrossOrigin(origins = "*") // Pra não ter problema de CORS no frontend, né?
public class VendaController {

    // A gente precisa de todos esses serviços pra fazer a mágica acontecer!
    @Autowired
    private VendaService vendaService;
    
    @Autowired
    private ProdutoService produtoService;
    
    @Autowired
    private ClienteService clienteService;
    
    @Autowired
    private EstoqueService estoqueService;
    
    @Autowired
    private UsuarioService usuarioService;
    
    // Pra listar todas as vendas que já rolaram
    @GetMapping
    public ResponseEntity<List<Venda>> listarTodasAsVendas() {
        return ResponseEntity.ok(vendaService.listarTodas());
    }
    
    // Pra buscar uma venda específica pelo ID, tipo quando a gente quer ver os detalhes
    @GetMapping("/{id}")
    public ResponseEntity<Venda> buscarVendaPeloId(@PathVariable Long id) {
        Optional<Venda> vendaEncontrada = vendaService.buscarPorId(id);
        return vendaEncontrada.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build()); // Se não achou, retorna 404, né?
    }
    
    // Pra ver os itens de uma venda, tipo o que o cliente comprou
    @GetMapping("/{id}/itens")
    public ResponseEntity<List<ItemVenda>> buscarItensDeUmaVenda(@PathVariable Long id) {
        List<ItemVenda> itensDaVenda = vendaService.buscarItensPorVenda(id);
        return ResponseEntity.ok(itensDaVenda);
    }
    
    // Pra registrar uma venda nova, tipo quando o cliente passa no caixa
    @PostMapping
    public ResponseEntity<?> registrarNovaVenda(@RequestBody Map<String, Object> dadosDaVenda) {
        try {
            // Pegando as infos básicas da venda
            Long idDoCliente = Long.parseLong(dadosDaVenda.get("clienteId").toString());
            Long idDoUsuario = Long.parseLong(dadosDaVenda.get("usuarioId").toString());
            LocalDate dataDaVenda = LocalDate.parse(dadosDaVenda.get("dataVenda").toString());
            
            // Vê se o cliente existe, senão não dá pra vender pra ele!
            Optional<Cliente> clienteExiste = clienteService.buscarPorId(idDoCliente);
            if (clienteExiste.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("mensagem", "Eita! Cliente não encontrado. Confere o ID, por favor."));
            }
            
            // Vê se o usuário que tá vendendo existe também
            Optional<Usuario> usuarioExiste = usuarioService.buscarPorId(idDoUsuario);
            if (usuarioExiste.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("mensagem", "Ops! Usuário não encontrado. Quem tá vendendo aí?"));
            }
            
            // Montando o objeto da venda
            Venda vendaNova = new Venda();
            vendaNova.setCliente(clienteExiste.get());
            vendaNova.setUsuario(usuarioExiste.get());
            vendaNova.setDataVenda(dataDaVenda);
            
            // Processando os itens que o cliente quer levar
            List<Map<String, Object>> itensRecebidos = (List<Map<String, Object>>) dadosDaVenda.get("itens");
            List<ItemVenda> listaDeItensParaVenda = new ArrayList<>();
            
            for (Map<String, Object> itemDoPedido : itensRecebidos) {
                Long idDoProduto = Long.parseLong(itemDoPedido.get("produtoId").toString());
                Integer quantidadeDoProduto = Integer.parseInt(itemDoPedido.get("quantidade").toString());
                
                // Vê se o produto existe
                Optional<Produto> produtoExiste = produtoService.buscarPorId(idDoProduto);
                if (produtoExiste.isEmpty()) {
                    return ResponseEntity.badRequest().body(Map.of("mensagem", "Produto não encontrado: " + idDoProduto + ". Tem certeza que esse produto existe?"));
                }
                
                // E se tem estoque suficiente, né? Senão, não dá pra vender!
                if (!estoqueService.verificarEstoqueDisponivel(idDoProduto, quantidadeDoProduto)) {
                    return ResponseEntity.badRequest().body(Map.of("mensagem", "Xi! Estoque insuficiente para o produto: " + produtoExiste.get().getNome() + "."));
                }
                
                // Criando o item da venda
                ItemVenda itemNovo = new ItemVenda();
                itemNovo.setProduto(produtoExiste.get());
                itemNovo.setQuantidade(quantidadeDoProduto);
                listaDeItensParaVenda.add(itemNovo);
            }
            
            // Agora sim, registrando a venda de verdade!
            Venda vendaRegistradaComSucesso = vendaService.registrarVenda(vendaNova, listaDeItensParaVenda);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(vendaRegistradaComSucesso);
            
        } catch (Exception e) {
            // Se der algum erro, a gente avisa!
            return ResponseEntity.badRequest().body(Map.of("mensagem", "Putz! Deu um erro ao registrar a venda: " + e.getMessage()));
        }
    }
    
    // Um endpoint pra gerar umas vendas de mentirinha, pra testar o sistema!
    @PostMapping("/gerar-vendas-ficticias")
    public ResponseEntity<?> gerarVendasDeMentirinha() {
        try {
            List<Venda> vendasQueForamGeradas = new ArrayList<>();
            
            // Procurando produtos de ração (seja "ração", "racao" ou "feed")
            List<Produto> todosOsProdutos = produtoService.listarTodos();
            List<Produto> racoesDisponiveis = todosOsProdutos.stream()
                .filter(p -> p.getNome().toLowerCase().contains("ração") || 
                           p.getNome().toLowerCase().contains("racao") ||
                           p.getNome().toLowerCase().contains("feed"))
                .toList();
            
            // Se não tiver ração cadastrada, a gente avisa
            if (racoesDisponiveis.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("mensagem", "Nenhum produto de ração encontrado. Cadastra uns aí primeiro, por favor!"));
            }
            
            // Pegando clientes e usuários pra simular as vendas
            List<Cliente> todosOsClientes = clienteService.listarTodos();
            List<Usuario> todosOsUsuarios = usuarioService.listarTodos();
            
            if (todosOsClientes.isEmpty() || todosOsUsuarios.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("mensagem", "Precisa ter clientes e usuários cadastrados pra eu conseguir gerar vendas, tá?"));
            }
            
            Random aleatorio = new Random();
            
            // Gerando 10 vendas de mentirinha
            for (int i = 0; i < 10; i++) {
                try {
                    // Escolhendo um cliente e um usuário na sorte
                    Cliente clienteSorteado = todosOsClientes.get(aleatorio.nextInt(todosOsClientes.size()));
                    Usuario usuarioSorteado = todosOsUsuarios.get(aleatorio.nextInt(todosOsUsuarios.size()));
                    
                    // Data da venda: nos últimos 30 dias, pra parecer real
                    LocalDate dataDaVenda = LocalDate.now().minusDays(aleatorio.nextInt(30));
                    
                    // Criando a venda
                    Venda vendaFicticia = new Venda();
                    vendaFicticia.setCliente(clienteSorteado);
                    vendaFicticia.setUsuario(usuarioSorteado);
                    vendaFicticia.setDataVenda(dataDaVenda);
                    
                    // Adicionando uns itens na venda (1 a 3 produtos por venda)
                    List<ItemVenda> itensDaVendaFicticia = new ArrayList<>();
                    int quantidadeDeItens = aleatorio.nextInt(3) + 1;
                    
                    Set<Long> produtosJaUsadosNessaVenda = new HashSet<>();
                    
                    for (int j = 0; j < quantidadeDeItens; j++) {
                        Produto produtoSorteado = racoesDisponiveis.get(aleatorio.nextInt(racoesDisponiveis.size()));
                        
                        // Pra não repetir produto na mesma venda, né?
                        if (produtosJaUsadosNessaVenda.contains(produtoSorteado.getId())) {
                            continue;
                        }
                        produtosJaUsadosNessaVenda.add(produtoSorteado.getId());
                        
                        // Quantidade aleatória entre 1 e 5
                        int qtd = aleatorio.nextInt(5) + 1;
                        
                        // Vê se tem estoque antes de adicionar
                        if (estoqueService.verificarEstoqueDisponivel(produtoSorteado.getId(), qtd)) {
                            ItemVenda itemFicticio = new ItemVenda();
                            itemFicticio.setProduto(produtoSorteado);
                            itemFicticio.setQuantidade(qtd);
                            itensDaVendaFicticia.add(itemFicticio);
                        }
                    }
                    
                    // Só registra a venda se tiver itens válidos
                    if (!itensDaVendaFicticia.isEmpty()) {
                        Venda vendaRegistrada = vendaService.registrarVenda(vendaFicticia, itensDaVendaFicticia);
                        vendasQueForamGeradas.add(vendaRegistrada);
                    }
                    
                } catch (Exception e) {
                    // Se uma venda der erro, a gente só anota e segue o baile!
                    System.err.println("Deu ruim ao gerar a venda " + (i + 1) + ": " + e.getMessage());
                }
            }
            
            return ResponseEntity.ok(Map.of(
                "mensagem", "Vendas de mentirinha geradas com sucesso!",
                "quantidade", vendasQueForamGeradas.size(),
                "vendas", vendasQueForamGeradas
            ));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("mensagem", "Eita! Erro ao gerar as vendas de mentirinha: " + e.getMessage()));
        }
    }
    
    // Pra gerar uma venda mais específica, com os dados que a gente quiser!
    @PostMapping("/gerar-venda-personalizada")
    public ResponseEntity<?> gerarVendaDoSeuJeito(@RequestBody Map<String, Object> pedidoPersonalizado) {
        try {
            // Pegando os detalhes que a gente pode querer personalizar
            String nomeDoCliente = (String) pedidoPersonalizado.get("nomeCliente");
            String nomeDoProduto = (String) pedidoPersonalizado.get("nomeProduto");
            Integer quantidadeDesejada = pedidoPersonalizado.get("quantidade") != null ? 
                Integer.parseInt(pedidoPersonalizado.get("quantidade").toString()) : null;
            String dataDaVendaString = (String) pedidoPersonalizado.get("dataVenda");
            
            // Achando ou escolhendo um cliente
            Cliente clienteDaVez;
            if (nomeDoCliente != null && !nomeDoCliente.trim().isEmpty()) {
                List<Cliente> clientesAchados = clienteService.buscarPorNome(nomeDoCliente);
                if (clientesAchados.isEmpty()) {
                    return ResponseEntity.badRequest().body(Map.of("mensagem", "Cliente não encontrado: " + nomeDoCliente + ". Tenta outro nome?"));
                }
                clienteDaVez = clientesAchados.get(0);
            } else {
                List<Cliente> todosOsClientes = clienteService.listarTodos();
                if (todosOsClientes.isEmpty()) {
                    return ResponseEntity.badRequest().body(Map.of("mensagem", "Nenhum cliente cadastrado. Cadastra um aí pra gente!"));
                }
                clienteDaVez = todosOsClientes.get(new Random().nextInt(todosOsClientes.size()));
            }
            
            // Achando ou escolhendo um produto
            Produto produtoDaVez;
            if (nomeDoProduto != null && !nomeDoProduto.trim().isEmpty()) {
                List<Produto> produtosAchados = produtoService.buscarPorNome(nomeDoProduto);
                if (produtosAchados.isEmpty()) {
                    return ResponseEntity.badRequest().body(Map.of("mensagem", "Produto não encontrado: " + nomeDoProduto + ". Digita certinho, por favor!"));
                }
                produtoDaVez = produtosAchados.get(0);
            } else {
                List<Produto> todosOsProdutos = produtoService.listarTodos();
                List<Produto> racoesDisponiveis = todosOsProdutos.stream()
                    .filter(p -> p.getNome().toLowerCase().contains("ração") || 
                               p.getNome().toLowerCase().contains("racao") ||
                               p.getNome().toLowerCase().contains("feed"))
                    .toList();
                
                if (racoesDisponiveis.isEmpty()) {
                    return ResponseEntity.badRequest().body(Map.of("mensagem", "Nenhum produto de ração encontrado. Que tal cadastrar alguns?"));
                }
                produtoDaVez = racoesDisponiveis.get(new Random().nextInt(racoesDisponiveis.size()));
            }
            
            // Definindo a quantidade, se não foi informada
            if (quantidadeDesejada == null) {
                quantidadeDesejada = new Random().nextInt(5) + 1; // De 1 a 5 unidades
            }
            
            // Vê se tem estoque pro que a gente quer vender
            if (!estoqueService.verificarEstoqueDisponivel(produtoDaVez.getId(), quantidadeDesejada)) {
                return ResponseEntity.badRequest().body(Map.of("mensagem", "Poxa! Estoque insuficiente para o produto: " + produtoDaVez.getNome() + "."));
            }
            
            // Definindo a data da venda, se não foi informada
            LocalDate dataDaVenda;
            if (dataDaVendaString != null && !dataDaVendaString.trim().isEmpty()) {
                dataDaVenda = LocalDate.parse(dataDaVendaString);
            } else {
                dataDaVenda = LocalDate.now(); // Hoje mesmo!
            }
            
            // Escolhendo um usuário pra registrar a venda
            List<Usuario> todosOsUsuarios = usuarioService.listarTodos();
            if (todosOsUsuarios.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("mensagem", "Nenhum usuário cadastrado. Não tem quem registre a venda!"));
            }
            Usuario usuarioDaVez = todosOsUsuarios.get(new Random().nextInt(todosOsUsuarios.size()));
            
            // Montando a venda personalizada
            Venda vendaPersonalizada = new Venda();
            vendaPersonalizada.setCliente(clienteDaVez);
            vendaPersonalizada.setUsuario(usuarioDaVez);
            vendaPersonalizada.setDataVenda(dataDaVenda);
            
            // Criando o item dessa venda
            ItemVenda itemPersonalizado = new ItemVenda();
            itemPersonalizado.setProduto(produtoDaVez);
            itemPersonalizado.setQuantidade(quantidadeDesejada);
            
            List<ItemVenda> itensParaEssaVenda = Arrays.asList(itemPersonalizado);
            
            // Registrando a venda personalizada
            Venda vendaRegistrada = vendaService.registrarVenda(vendaPersonalizada, itensParaEssaVenda);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "mensagem", "Venda personalizada gerada com sucesso! Uhu!",
                "venda", vendaRegistrada
            ));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("mensagem", "Que pena! Erro ao gerar venda personalizada: " + e.getMessage()));
        }
    }
    
    // Pra atualizar uma venda que já existe
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarVendaExistente(@PathVariable Long id, @RequestBody Map<String, Object> dadosDaVenda) {
        try {
            // Vê se a venda que a gente quer atualizar existe
            Optional<Venda> vendaPraAtualizar = vendaService.buscarPorId(id);
            if (vendaPraAtualizar.isEmpty()) {
                return ResponseEntity.notFound().build(); // Se não achou, 404!
            }
            
            // Pegando as infos pra atualizar
            Long idDoCliente = Long.parseLong(dadosDaVenda.get("clienteId").toString());
            LocalDate dataDaVenda = LocalDate.parse(dadosDaVenda.get("dataVenda").toString());
            String statusDaVenda = dadosDaVenda.get("status") != null ? dadosDaVenda.get("status").toString() : "FINALIZADA";
            
            // Vê se o cliente novo existe
            Optional<Cliente> clienteExiste = clienteService.buscarPorId(idDoCliente);
            if (clienteExiste.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("mensagem", "Cliente não encontrado. Não dá pra atualizar com um cliente que não existe!"));
            }
            
            // Atualizando o objeto da venda
            Venda venda = vendaPraAtualizar.get();
            venda.setCliente(clienteExiste.get());
            venda.setDataVenda(dataDaVenda);
            venda.setStatus(statusDaVenda);
            
            // Se tiver itens pra atualizar, a gente mexe neles também
            if (dadosDaVenda.containsKey("itens")) {
                List<Map<String, Object>> itensRecebidos = (List<Map<String, Object>>) dadosDaVenda.get("itens");
                List<ItemVenda> listaDeItensNovos = new ArrayList<>();
                
                for (Map<String, Object> itemDoPedido : itensRecebidos) {
                    Long idDoProduto = Long.parseLong(itemDoPedido.get("produtoId").toString());
                    Integer quantidadeDoProduto = Integer.parseInt(itemDoPedido.get("quantidade").toString());
                    
                    // Vê se o produto existe
                    Optional<Produto> produtoExiste = produtoService.buscarPorId(idDoProduto);
                    if (produtoExiste.isEmpty()) {
                        return ResponseEntity.badRequest().body(Map.of("mensagem", "Produto não encontrado: " + idDoProduto + "."));
                    }
                    
                    // Criando o item novo
                    ItemVenda itemNovo = new ItemVenda();
                    itemNovo.setProduto(produtoExiste.get());
                    itemNovo.setQuantidade(quantidadeDoProduto);
                    listaDeItensNovos.add(itemNovo);
                }
                
                // Atualizando a venda com os novos itens
                Venda vendaAtualizada = vendaService.atualizarVenda(venda, listaDeItensNovos);
                return ResponseEntity.ok(vendaAtualizada);
            } else {
                // Se não tiver itens, atualiza só os dados da venda mesmo
                Venda vendaAtualizada = vendaService.atualizarVendaSemItens(venda);
                return ResponseEntity.ok(vendaAtualizada);
            }
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("mensagem", "Ai, não consegui atualizar a venda: " + e.getMessage()));
        }
    }
    
    // Pra excluir uma venda, tipo quando cancelam
    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluirVendaExistente(@PathVariable Long id) {
        try {
            // Vê se a venda existe antes de apagar
            Optional<Venda> vendaPraExcluir = vendaService.buscarPorId(id);
            if (vendaPraExcluir.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            // Excluindo a venda
            vendaService.excluirVenda(id);
            
            return ResponseEntity.ok(Map.of("mensagem", "Venda excluída com sucesso! Menos uma pra se preocupar."));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("mensagem", "Putz! Erro ao excluir a venda: " + e.getMessage()));
        }
    }
    
    // Pra verificar o estoque de um produto, rapidinho!
    @GetMapping("/produto/{produtoId}/estoque")
    public ResponseEntity<?> checarEstoqueDoProduto(@PathVariable Long produtoId) {
        Optional<Estoque> estoqueDoProduto = estoqueService.buscarPorProdutoId(produtoId);
        
        if (estoqueDoProduto.isPresent()) {
            return ResponseEntity.ok(estoqueDoProduto.get());
        } else {
            return ResponseEntity.notFound().build(); // Se não achou o estoque, 404!
        }
    }
    
    // Pra gerar um relatório de vendas por período, tipo pra ver o faturamento do mês!
    @GetMapping("/relatorio/periodo")
    public ResponseEntity<?> gerarRelatorioDeVendasPorPeriodo(
            @RequestParam String dataInicio,
            @RequestParam String dataFim) {
        try {
            LocalDate inicioDoPeriodo = LocalDate.parse(dataInicio);
            LocalDate fimDoPeriodo = LocalDate.parse(dataFim);
            
            List<Venda> vendasNoPeriodo = vendaService.buscarPorPeriodo(inicioDoPeriodo, fimDoPeriodo);
            
            // Calculando o valor total das vendas nesse período
            BigDecimal valorTotalDoPeriodo = vendasNoPeriodo.stream()
                .map(Venda::getValorTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
            
            return ResponseEntity.ok(Map.of(
                "periodo", Map.of("inicio", inicioDoPeriodo, "fim", fimDoPeriodo),
                "quantidadeDeVendas", vendasNoPeriodo.size(),
                "valorTotal", valorTotalDoPeriodo,
                "vendas", vendasNoPeriodo
            ));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("mensagem", "Ih! Deu erro ao gerar o relatório: " + e.getMessage()));
        }
    }
}

