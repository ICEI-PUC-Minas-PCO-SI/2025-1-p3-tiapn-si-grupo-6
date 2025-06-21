-- Script SQL pra deixar o banco do ERPet com uns dados de teste.

-- Primeiro, vamos garantir que as categorias de ração existam!
INSERT INTO categorias (nome, descricao, ativo, data_criacao) VALUES
("Ração para Cães", "Tudo de bom para os nossos amigos caninos!", true, NOW()),
("Ração para Gatos", "A melhor comida para os felinos mais exigentes!", true, NOW()),
("Ração para Peixes", "Pra deixar os peixinhos nadando felizes e saudáveis!", true, NOW()),
("Ração para Aves", "Comida especial para os passarinhos cantarem mais alto!", true, NOW()),
("Ração para Roedores", "Pra roer à vontade e manter a energia lá em cima!", true, NOW()),
("Suplementos Alimentares", "Um reforço extra pra saúde dos nossos bichinhos!", true, NOW())
ON CONFLICT (nome) DO NOTHING; -- Assim a gente não duplica se já tiver!

-- Agora, vamos cadastrar umas rações de cachorro bem famosas!
INSERT INTO produtos (nome, descricao, preco_unitario, categoria_id, ativo, data_criacao) VALUES
("Ração Premier Cães Adultos 15kg", "Ração premium que seu cão adulto vai amar, com ingredientes selecionados a dedo!", 159.90, 
 (SELECT id FROM categorias WHERE nome = "Ração para Cães" LIMIT 1), true, NOW()),
("Ração Royal Canin Medium Adult 15kg", "Super premium pra cães de porte médio, energia de sobra e pelos brilhantes!", 189.90,
 (SELECT id FROM categorias WHERE nome = "Ração para Cães" LIMIT 1), true, NOW()),
("Ração Pedigree Cães Adultos 10kg", "Aquele clássico que todo cachorro adora, completo e balanceado!", 89.90,
 (SELECT id FROM categorias WHERE nome = "Ração para Cães" LIMIT 1), true, NOW()),
("Ração Golden Formula Cães Filhotes 15kg", "Pra filhotinhos crescerem fortes e saudáveis, com tudo que eles precisam!", 149.90,
 (SELECT id FROM categorias WHERE nome = "Ração para Cães" LIMIT 1), true, NOW()),
("Ração Nutrópica Cães Sênior 10kg", "Pensada nos vovôs e vovós de quatro patas, pra uma vida mais confortável!", 129.90,
 (SELECT id FROM categorias WHERE nome = "Ração para Cães" LIMIT 1), true, NOW())
ON CONFLICT (nome) DO NOTHING;

-- E as rações pros nossos gatinhos!
INSERT INTO produtos (nome, descricao, preco_unitario, categoria_id, ativo, data_criacao) VALUES
("Ração Whiskas Gatos Adultos 10kg", "Sabor irresistível que faz os gatos ronronarem de felicidade!", 119.90,
 (SELECT id FROM categorias WHERE nome = "Ração para Gatos" LIMIT 1), true, NOW()),
("Ração Royal Canin Feline Adult 7kg", "O toque super premium que seu gato merece, pra uma vida plena!", 139.90,
 (SELECT id FROM categorias WHERE nome = "Ração para Gatos" LIMIT 1), true, NOW()),
("Ração Premier Pet Gatos Castrados 10kg", "Especialmente formulada pra gatos castrados, ajuda a manter o peso ideal!", 109.90,
 (SELECT id FROM categorias WHERE nome = "Ração para Gatos" LIMIT 1), true, NOW()),
("Ração Golden Gatos Filhotes 10kg", "Pra gatinhos que estão começando a vida, com todos os nutrientes essenciais!", 99.90,
 (SELECT id FROM categorias WHERE nome = "Ração para Gatos" LIMIT 1), true, NOW()),
("Ração Nutrópica Gatos Sênior 7kg", "Pra gatinhos mais velhos, com antioxidantes pra manter a vitalidade!", 89.90,
 (SELECT id FROM categorias WHERE nome = "Ração para Gatos" LIMIT 1), true, NOW())
ON CONFLICT (nome) DO NOTHING;

-- Não podemos esquecer dos peixinhos
INSERT INTO produtos (nome, descricao, preco_unitario, categoria_id, ativo, data_criacao) VALUES
("Ração Tetra Min Flakes 500g", "Flocos deliciosos pra peixes tropicais, eles vão amar!", 45.90,
 (SELECT id FROM categorias WHERE nome = "Ração para Peixes" LIMIT 1), true, NOW()),
("Ração Alcon Basic Peixes Tropicais 200g", "A ração básica que não pode faltar no aquário, pra peixes ornamentais!", 25.90,
 (SELECT id FROM categorias WHERE nome = "Ração para Peixes" LIMIT 1), true, NOW()),
("Ração Sera Vipan Flakes 1kg", "Ração premium em flocos, pra deixar a água limpinha e os peixes saudáveis!", 89.90,
 (SELECT id FROM categorias WHERE nome = "Ração para Peixes" LIMIT 1), true, NOW()),
("Ração Nutrópica Peixes Ornamentais 280g", "Nutrição completa pra peixes de aquário, com tudo que eles precisam!", 35.90,
 (SELECT id FROM categorias WHERE nome = "Ração para Peixes" LIMIT 1), true, NOW())
ON CONFLICT (nome) DO NOTHING;

-- E claro, as rações pras aves
INSERT INTO produtos (nome, descricao, preco_unitario, categoria_id, ativo, data_criacao) VALUES
("Ração Megazoo Calopsitas 350g", "Especialmente pra calopsitas, com sementes que elas adoram!", 29.90,
 (SELECT id FROM categorias WHERE nome = "Ração para Aves" LIMIT 1), true, NOW()),
("Ração Alcon Club Canários 500g", "Ração completa pra canários, pra eles terem energia de sobra!", 39.90,
 (SELECT id FROM categorias WHERE nome = "Ração para Aves" LIMIT 1), true, NOW()),
("Ração Nutrópica Papagaios 600g", "Extrusada e deliciosa pra papagaios, eles vão se esbaldar!", 49.90,
 (SELECT id FROM categorias WHERE nome = "Ração para Aves" LIMIT 1), true, NOW()),
("Ração Zootekna Periquitos 500g", "Balanceada e perfeita pra periquitos, pra uma vida cheia de cor!", 34.90,
 (SELECT id FROM categorias WHERE nome = "Ração para Aves" LIMIT 1), true, NOW())
ON CONFLICT (nome) DO NOTHING;

-- Agora, vamos dar um estoque inicial pra esses produtos, senão não dá pra vender nada!
INSERT INTO estoque (produto_id, quantidade_atual, quantidade_minima, data_atualizacao) 
SELECT p.id, 
       FLOOR(RANDOM() * 200) + 50 as quantidade_atual,  -- De 50 a 250 unidades, pra ter bastante!
       FLOOR(RANDOM() * 20) + 10 as quantidade_minima,  -- Mínimo de 10 a 30, pra gente ficar de olho!
       NOW()
FROM produtos p
WHERE NOT EXISTS (SELECT 1 FROM estoque e WHERE e.produto_id = p.id); -- Só insere se não tiver estoque ainda

-- Vamos cadastrar uns clientes de mentirinha pra simular as vendas!
INSERT INTO clientes (nome, email, telefone, cpf, ativo, data_criacao) VALUES
("João Silva", "joao.silva@email.com", "(11) 99999-1111", "12345678901", true, NOW()),
("Maria Santos", "maria.santos@email.com", "(11) 99999-2222", "12345678902", true, NOW()),
("Pedro Oliveira", "pedro.oliveira@email.com", "(11) 99999-3333", "12345678903", true, NOW()),
("Ana Costa", "ana.costa@email.com", "(11) 99999-4444", "12345678904", true, NOW()),
("Carlos Ferreira", "carlos.ferreira@email.com", "(11) 99999-5555", "12345678905", true, NOW()),
("Lucia Rodrigues", "lucia.rodrigues@email.com", "(11) 99999-6666", "12345678906", true, NOW()),
("Roberto Lima", "roberto.lima@email.com", "(11) 99999-7777", "12345678907", true, NOW()),
("Fernanda Alves", "fernanda.alves@email.com", "(11) 99999-8888", "12345678908", true, NOW())
ON CONFLICT (cpf) DO NOTHING; -- Pra não ter cliente duplicado, né?

-- E uns usuários pra gente logar e testar o sistema!
INSERT INTO usuarios (login, nome, email, senha, ativo, data_criacao) VALUES
("admin", "Administrador", "admin@erpet.com", "123456", true, NOW()), -- Senha simples pra teste!
("vendedor1", "João Vendedor", "joao@erpet.com", "123456", true, NOW()),
("vendedor2", "Maria Vendedora", "maria@erpet.com", "123456", true, NOW()),
("gerente", "Carlos Gerente", "carlos@erpet.com", "123456", true, NOW())
ON CONFLICT (login) DO NOTHING;

-- Inserindo umas vendas de exemplo


WITH vendas_de_mentirinha AS (
  INSERT INTO vendas (cliente_id, usuario_id, data_venda, valor_total, status, data_criacao)
  SELECT 
    c.id as cliente_id,
    u.id as usuario_id,
    CURRENT_DATE - INTERVAL '1 day' * FLOOR(RANDOM() * 30) as data_venda, -- Vendas dos últimos 30 dias
    0 as valor_total, -- A gente calcula isso depois
    'FINALIZADA' as status,
    NOW() as data_criacao
  FROM clientes c
  CROSS JOIN usuarios u
  WHERE c.id <= 3 AND u.id <= 2  -- Pra não criar um monte de venda agora, só umas poucas!
  RETURNING id, cliente_id, usuario_id
)
INSERT INTO itens_venda (venda_id, produto_id, quantidade, preco_unitario, subtotal)
SELECT 
  v.id as venda_id,
  p.id as produto_id,
  FLOOR(RANDOM() * 5) + 1 as quantidade, -- De 1 a 5 unidades de cada produto
  p.preco_unitario,
  (FLOOR(RANDOM() * 5) + 1) * p.preco_unitario as subtotal
FROM vendas_de_mentirinha v
CROSS JOIN produtos p
WHERE p.nome LIKE '%Ração%'
AND RANDOM() < 0.3; -- Só uns 30% de chance de cada produto de ração entrar na venda, pra não ficar repetitivo!

-- Ah, e agora vamos atualizar o valor total das vendas, pra ficar tudo certinho!
UPDATE vendas 
SET valor_total = (
  SELECT COALESCE(SUM(subtotal), 0)
  FROM itens_venda 
  WHERE venda_id = vendas.id
)
WHERE valor_total = 0; -- Só atualiza as que ainda estão com valor zero

-- Pra gente dar uma espiadinha e ver se deu tudo certo!
SELECT 'Categorias' as tabela, COUNT(*) as total FROM categorias
UNION ALL
SELECT 'Produtos', COUNT(*) FROM produtos
UNION ALL
SELECT 'Estoque', COUNT(*) FROM estoque
UNION ALL
SELECT 'Clientes', COUNT(*) FROM clientes
UNION ALL
SELECT 'Usuários', COUNT(*) FROM usuarios
UNION ALL
SELECT 'Vendas', COUNT(*) FROM vendas
UNION ALL
SELECT 'Itens de Venda', COUNT(*) FROM itens_venda;


