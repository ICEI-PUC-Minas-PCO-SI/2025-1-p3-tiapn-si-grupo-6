package com.erpet.services;

import com.erpet.models.*;
import com.erpet.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

@Service
public class DadosFicticiasService {

    // A gente precisa de todos esses caras pra mexer com o banco
    @Autowired
    private VendaService vendaService;
    
    @Autowired
    private ProdutoService produtoService;
    
    @Autowired
    private ClienteService clienteService;
    
    @Autowired
    private UsuarioService usuarioService;
    
    @Autowired
    private EstoqueService estoqueService;
    
    @Autowired
    private CategoriaRepository categoriaRepository;
    
    @Autowired
    private ProdutoRepository produtoRepository;
    
    @Autowired
    private ClienteRepository clienteRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private EstoqueRepository estoqueRepository;
    
    // Esse método é tipo o "faz tudo" pra popular o banco com dados de teste
    @Transactional
    public Map<String, Object> popularBancoComDadosDeTeste() {
        Map<String, Object> resultadoDaPopulacao = new HashMap<>();
        
        try {
            // Primeiro, vamos criar umas categorias, se já não tiver
            List<Categoria> categoriasCriadas = criarCategoriasBase();
            resultadoDaPopulacao.put("categorias", categoriasCriadas.size());
            
            // Depois, os produtos de ração, usando as categorias que a gente fez
            List<Produto> produtosCriados = criarProdutosDeRacao(categoriasCriadas);
            resultadoDaPopulacao.put("produtos", produtosCriados.size());
            
            // Agora, vamos dar um estoque pra esses produtos, senão não dá pra vender!
            List<Estoque> estoquesIniciais = abastecerEstoque(produtosCriados);
            resultadoDaPopulacao.put("estoques", estoquesIniciais.size());
            
            // Clientes novos na área, se precisar
            List<Cliente> clientesNovos = cadastrarClientes();
            resultadoDaPopulacao.put("clientes", clientesNovos.size());
            
            // E uns usuários pra operar o sistema
            List<Usuario> usuariosNovos = cadastrarUsuarios();
            resultadoDaPopulacao.put("usuarios", usuariosNovos.size());
            
            // Por fim, as vendas! A parte mais legal, né?
            List<Venda> vendasGeradas = simularVendas(produtosCriados, clientesNovos, usuariosNovos);
            resultadoDaPopulacao.put("vendas", vendasGeradas.size());
            
            resultadoDaPopulacao.put("sucesso", true);
            resultadoDaPopulacao.put("mensagem", "Banco de dados populado com sucesso! Tudo pronto pra testar!");
            
        } catch (Exception e) {
            resultadoDaPopulacao.put("sucesso", false);
            resultadoDaPopulacao.put("mensagem", "Ops! Deu ruim ao popular o banco: " + e.getMessage());
        }
        
        return resultadoDaPopulacao;
    }
    
    // Método pra criar as categorias básicas de ração
    private List<Categoria> criarCategoriasBase() {
        List<Categoria> categorias = new ArrayList<>();
        
        String[] nomesCategoria = {
            "Ração para Cães",
            "Ração para Gatos", 
            "Ração para Peixes",
            "Ração para Aves",
            "Ração para Roedores",
            "Suplementos Alimentares"
        };
        
        for (String nome : nomesCategoria) {
            // Vê se a categoria já existe pra não duplicar
            List<Categoria> existentes = categoriaRepository.findByNomeContainingIgnoreCase(nome);
            if (existentes.isEmpty()) {
                Categoria categoria = new Categoria();
                categoria.setNome(nome);
                categoria.setDescricao("Categoria para " + nome.toLowerCase() + ".");
                categoria.setAtivo(true);
                categorias.add(categoriaRepository.save(categoria));
            } else {
                categorias.add(existentes.get(0)); // Se já tem, usa a que existe
            }
        }
        
        return categorias;
    }
    
    // Aqui a gente cria uns produtos de ração, separando por bicho
    private List<Produto> criarProdutosDeRacao(List<Categoria> categorias) {
        List<Produto> produtos = new ArrayList<>();
        Random random = new Random();
        
        // Rações pra cachorros
        Categoria racaoCaes = categorias.stream()
            .filter(c -> c.getNome().contains("Cães"))
            .findFirst().orElse(categorias.get(0)); // Se não achar, pega a primeira
            
        String[] racoesCaes = {
            "Ração Premier Cães Adultos 15kg",
            "Ração Royal Canin Medium Adult 15kg", 
            "Ração Pedigree Cães Adultos 10kg",
            "Ração Golden Formula Cães Filhotes 15kg",
            "Ração Nutrópica Cães Sênior 10kg"
        };
        
        for (String nome : racoesCaes) {
            // Evita produto duplicado
            if (produtoRepository.findByNomeContainingIgnoreCase(nome.split(" ")[1]).isEmpty()) {
                Produto produto = new Produto();
                produto.setNome(nome);
                produto.setDescricao("Ração top pra cães, com ingredientes selecionados. Seu pet vai amar!");
                produto.setPrecoUnitario(new BigDecimal(80 + random.nextInt(120))); // Preço entre R$ 80 e R$ 200
                produto.setCategoria(racaoCaes);
                produto.setAtivo(true);
                produtos.add(produtoRepository.save(produto));
            }
        }
        
        // Rações pra gatinhos
        Categoria racaoGatos = categorias.stream()
            .filter(c -> c.getNome().contains("Gatos"))
            .findFirst().orElse(categorias.get(1));
            
        String[] racoesGatos = {
            "Ração Whiskas Gatos Adultos 10kg",
            "Ração Royal Canin Feline Adult 7kg",
            "Ração Premier Pet Gatos Castrados 10kg",
            "Ração Golden Gatos Filhotes 10kg",
            "Ração Nutrópica Gatos Sênior 7kg"
        };
        
        for (String nome : racoesGatos) {
            if (produtoRepository.findByNomeContainingIgnoreCase(nome.split(" ")[1]).isEmpty()) {
                Produto produto = new Produto();
                produto.setNome(nome);
                produto.setDescricao("Ração balanceada pra gatos, com sabor que eles não resistem!");
                produto.setPrecoUnitario(new BigDecimal(60 + random.nextInt(80))); // Preço entre R$ 60 e R$ 140
                produto.setCategoria(racaoGatos);
                produto.setAtivo(true);
                produtos.add(produtoRepository.save(produto));
            }
        }
        
        // Rações pra peixinhos
        Categoria racaoPeixes = categorias.stream()
            .filter(c -> c.getNome().contains("Peixes"))
            .findFirst().orElse(categorias.get(2));
            
        String[] racoesPeixes = {
            "Ração Tetra Min Flakes 500g",
            "Ração Alcon Basic Peixes Tropicais 200g",
            "Ração Sera Vipan Flakes 1kg",
            "Ração Nutrópica Peixes Ornamentais 280g"
        };
        
        for (String nome : racoesPeixes) {
            if (produtoRepository.findByNomeContainingIgnoreCase(nome.split(" ")[1]).isEmpty()) {
                Produto produto = new Produto();
                produto.setNome(nome);
                produto.setDescricao("Ração nutritiva pra peixes ornamentais, pra eles ficarem saudáveis e coloridos!");
                produto.setPrecoUnitario(new BigDecimal(15 + random.nextInt(35))); // Preço entre R$ 15 e R$ 50
                produto.setCategoria(racaoPeixes);
                produto.setAtivo(true);
                produtos.add(produtoRepository.save(produto));
            }
        }
        
        // Rações pra passarinhos
        Categoria racaoAves = categorias.stream()
            .filter(c -> c.getNome().contains("Aves"))
            .findFirst().orElse(categorias.get(3));
            
        String[] racoesAves = {
            "Ração Megazoo Calopsitas 350g",
            "Ração Alcon Club Canários 500g",
            "Ração Nutrópica Papagaios 600g",
            "Ração Zootekna Periquitos 500g"
        };
        
        for (String nome : racoesAves) {
            if (produtoRepository.findByNomeContainingIgnoreCase(nome.split(" ")[1]).isEmpty()) {
                Produto produto = new Produto();
                produto.setNome(nome);
                produto.setDescricao("Ração especial pra aves, cheia de vitaminas e minerais. Eles vão cantar de alegria!");
                produto.setPrecoUnitario(new BigDecimal(20 + random.nextInt(40))); // Preço entre R$ 20 e R$ 60
                produto.setCategoria(racaoAves);
                produto.setAtivo(true);
                produtos.add(produtoRepository.save(produto));
            }
        }
        
        return produtos;
    }
    
    // Coloca umas quantidades no estoque pra gente poder vender
    private List<Estoque> abastecerEstoque(List<Produto> produtos) {
        List<Estoque> estoques = new ArrayList<>();
        Random random = new Random();
        
        for (Produto produto : produtos) {
            // Vê se já tem estoque pra esse produto
            Optional<Estoque> estoqueExistente = estoqueRepository.findByProdutoId(produto.getId());
            if (estoqueExistente.isEmpty()) {
                Estoque estoque = new Estoque();
                estoque.setProduto(produto);
                estoque.setQuantidadeAtual(50 + random.nextInt(200)); // De 50 a 250 unidades
                estoque.setQuantidadeMinima(10 + random.nextInt(20)); // Mínimo de 10 a 30 unidades
                estoques.add(estoqueRepository.save(estoque));
            } else {
                estoques.add(estoqueExistente.get()); // Se já tem, usa o que tem
            }
        }
        
        return estoques;
    }
    
    // Cria uns clientes pra gente ter quem compre
    private List<Cliente> cadastrarClientes() {
        List<Cliente> clientes = new ArrayList<>();
        
        String[][] dadosClientes = {
            {"João Silva", "joao.silva@email.com", "(11) 99999-1111", "12345678901"},
            {"Maria Santos", "maria.santos@email.com", "(11) 99999-2222", "12345678902"},
            {"Pedro Oliveira", "pedro.oliveira@email.com", "(11) 99999-3333", "12345678903"},
            {"Ana Costa", "ana.costa@email.com", "(11) 99999-4444", "12345678904"},
            {"Carlos Ferreira", "carlos.ferreira@email.com", "(11) 99999-5555", "12345678905"},
            {"Lucia Rodrigues", "lucia.rodrigues@email.com", "(11) 99999-6666", "12345678906"},
            {"Roberto Lima", "roberto.lima@email.com", "(11) 99999-7777", "12345678907"},
            {"Fernanda Alves", "fernanda.alves@email.com", "(11) 99999-8888", "12345678908"}
        };
        
        for (String[] dados : dadosClientes) {
            // Vê se o cliente já tá cadastrado
            List<Cliente> existentes = clienteRepository.findByNomeContainingIgnoreCase(dados[0]);
            if (existentes.isEmpty()) {
                Cliente cliente = new Cliente();
                cliente.setNome(dados[0]);
                cliente.setEmail(dados[1]);
                cliente.setTelefone(dados[2]);
                cliente.setCpf(dados[3]);
                cliente.setAtivo(true);
                clientes.add(clienteRepository.save(cliente));
            } else {
                clientes.add(existentes.get(0));
            }
        }
        
        return clientes;
    }
    
    // Cria uns usuários pra gente logar no sistema
    private List<Usuario> cadastrarUsuarios() {
        List<Usuario> usuarios = new ArrayList<>();
        
        String[][] dadosUsuarios = {
            {"admin", "Administrador", "admin@erpet.com"},
            {"vendedor1", "João Vendedor", "joao@erpet.com"},
            {"vendedor2", "Maria Vendedora", "maria@erpet.com"},
            {"gerente", "Carlos Gerente", "carlos@erpet.com"}
        };
        
        for (String[] dados : dadosUsuarios) {
            // Vê se o usuário já existe
            Optional<Usuario> existente = usuarioRepository.findByLogin(dados[0]);
            if (existente.isEmpty()) {
                Usuario usuario = new Usuario();
                usuario.setLogin(dados[0]);
                usuario.setNome(dados[1]);
                usuario.setEmail(dados[2]);
                usuario.setSenha("123456"); // Em produção, a gente usaria um hash, né? Mas pra teste, tá valendo!
                usuario.setAtivo(true);
                usuarios.add(usuarioRepository.save(usuario));
            } else {
                usuarios.add(existente.get());
            }
        }
        
        return usuarios;
    }
    
    // Essa é a parte que simula as vendas de verdade!
    private List<Venda> simularVendas(List<Produto> produtos, List<Cliente> clientes, List<Usuario> usuarios) {
        List<Venda> vendas = new ArrayList<>();
        Random random = new Random();
        
        // Vamos gerar umas 25 vendas de mentirinha
        for (int i = 0; i < 25; i++) {
            try {
                // Pega um cliente e um usuário aleatórios pra essa venda
                Cliente clienteDaVez = clientes.get(random.nextInt(clientes.size()));
                Usuario usuarioDaVez = usuarios.get(random.nextInt(usuarios.size()));
                
                // Data da venda: nos últimos 60 dias, pra parecer real
                LocalDate dataDaVenda = LocalDate.now().minusDays(random.nextInt(60));
                
                // Cria a venda
                Venda novaVenda = new Venda();
                novaVenda.setCliente(clienteDaVez);
                novaVenda.setUsuario(usuarioDaVez);
                novaVenda.setDataVenda(dataDaVenda);
                
                // Agora, os itens da venda (1 a 4 produtos por venda)
                List<ItemVenda> itensDaVenda = new ArrayList<>();
                int quantidadeDeItens = random.nextInt(4) + 1;
                
                Set<Long> produtosJaAdicionados = new HashSet<>(); // Pra não repetir produto na mesma venda
                
                for (int j = 0; j < quantidadeDeItens; j++) {
                    Produto produtoEscolhido = produtos.get(random.nextInt(produtos.size()));
                    
                    // Se o produto já foi adicionado, pula pro próximo
                    if (produtosJaAdicionados.contains(produtoEscolhido.getId())) {
                        continue;
                    }
                    produtosJaAdicionados.add(produtoEscolhido.getId());
                    
                    // Quantidade aleatória entre 1 e 8
                    int quantidadeDoItem = random.nextInt(8) + 1;
                    
                    // Vê se tem estoque antes de adicionar o item
                    if (estoqueService.verificarEstoqueDisponivel(produtoEscolhido.getId(), quantidadeDoItem)) {
                        ItemVenda item = new ItemVenda();
                        item.setProduto(produtoEscolhido);
                        item.setQuantidade(quantidadeDoItem);
                        itensDaVenda.add(item);
                    }
                }
                
                // Só registra a venda se tiver algum item válido
                if (!itensDaVenda.isEmpty()) {
                    Venda vendaRegistrada = vendaService.registrarVenda(novaVenda, itensDaVenda);
                    vendas.add(vendaRegistrada);
                }
                
            } catch (Exception e) {
                // Se der erro em uma venda, a gente só avisa e continua pras próximas
                System.err.println("Eita! Não consegui gerar a venda " + (i + 1) + ": " + e.getMessage());
            }
        }
        
        return vendas;
    }
    
    // Esse método é pra limpar a bagunça, se precisar
    @Transactional
    public Map<String, Object> limparDadosDeTeste() {
        Map<String, Object> resultadoDaLimpeza = new HashMap<>();
        
        try {
            // Vê quantos registros tinha antes de limpar
            long vendasAntes = vendaService.listarTodas().size();
            // long produtosAntes = produtoService.listarTodos().size(); // Deixei comentado pra não apagar os produtos de verdade
            // long clientesAntes = clienteService.listarTodos().size();
            
            // Apaga as vendas (isso já apaga os itens de venda junto)
            List<Venda> vendasPraApagar = vendaService.listarTodas();
            for (Venda venda : vendasPraApagar) {
                vendaService.excluirVenda(venda.getId());
            }
            
            resultadoDaLimpeza.put("sucesso", true);
            resultadoDaLimpeza.put("mensagem", "Dados de teste limpos com sucesso! Banco novinho em folha (quase).");
            resultadoDaLimpeza.put("vendasRemovidasAntes", vendasAntes);
            resultadoDaLimpeza.put("vendasRemovidasDepois", vendaService.listarTodas().size());
            
        } catch (Exception e) {
            resultadoDaLimpeza.put("sucesso", false);
            resultadoDaLimpeza.put("mensagem", "Vish! Deu erro ao limpar os dados: " + e.getMessage());
        }
        
        return resultadoDaLimpeza;
    }
}

