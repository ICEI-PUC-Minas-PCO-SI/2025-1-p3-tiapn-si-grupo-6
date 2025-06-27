# ERPet

`CURSO: Sistemas de Informação`

`DISCIPLINA: Trabalho Interdisciplinar Aplicações para Processos de Negócios`

`1º semestre/2025`

A PexPetShop é um pet shop de pequeno porte localizado no bairro Tirol, em Belo Horizonte, que combina loja, farmácia veterinária e atendimento clínico. A empresa se destaca pelo compromisso com o bem-estar animal, oferecendo um atendimento personalizado e acessível aos tutores de pets. Entretanto, apesar do crescimento e da busca por excelência, enfrenta desafios como a necessidade de expandir sua base de clientes, manter a qualidade dos serviços e garantir uma equipe qualificada.

Desse modo, com o aumento da demanda, a gestão do pet shop tornou-se desorganizada, afetando o controle de estoque, o agendamento de serviços e a retenção de clientes. Sendo assim, para solucionar esses problemas, pretende-se desenvolver um sistema que automatize o controle de produtos, otimize o agendamento de atendimentos, implemente um programa de fidelidade e permita que o gerente acompanhe as operações remotamente. Essas melhorias visam garantir maior eficiência e crescimento sustentável para o negócio.

## Integrantes

* Alice Machado Villalba Costa
* Eduarda Silva Santos Nunis
* Gabriel Lucas Diniz Alves
* Maria Clara Felipe Nascimento
* Miriam Cristina Alves de Jesus
* Wanessa Cristina Ribeiro de Paula

## Professor

* Amália Soares Vieira de Vasconcelos

## Instruções de utilização

Assim que a primeira versão do sistema estiver disponível, deverá complementar com as instruções de utilização. Descreva como instalar eventuais dependências e como executar a aplicação.

Não deixe de informar o link onde a aplicação estará disponível para acesso (por exemplo: https://adota-pet.herokuapp.com/src/index.html).

Se houver usuário de teste, o login e a senha também deverão ser informados aqui (por exemplo: usuário - admin / senha - admin).

O link e o usuário/senha descritos acima são apenas exemplos de como tais informações deverão ser apresentadas.

# Documentação

<ol>
<li><a href="docs/01-Contexto.md"> Documentação de contexto</a></li>
<li><a href="docs/02-Especificacao.md"> Especificação do projeto</a></li>
<li><a href="docs/03-Metodologia.md"> Metodologia</a></li>
<li><a href="docs/04-Modelagem-processos-negocio.md"> Modelagem dos processos de negócios</a></li>
<li><a href="docs/05-Projeto-interface.md"> Projeto de interface</a></li>
<li><a href="docs/06-Template-padrao.md"> Template padrão da aplicação</a></li>
<li><a href="docs/07-Arquitetura-solucao.md"> Arquitetura da solução</a></li>
<li><a href="docs/08-Plano-testes-software.md"> Plano de testes de software</a></li>
<li><a href="docs/09-Registro-testes-software.md"> Registro de testes de software</a></li>
<li><a href="docs/10-Conclusao.md"> Conclusão</a></li>
<li><a href="docs/11-Referencias.md"> Referências</a></li>
</ol>

# Código

* <a href="src/README.md">Código</a>

# Apresentação

* <a href="presentation/README.md">Apresentação do projeto</a>


# Instruções de utilização

# Requisitos
Java JDK 11 ou superior
Maven instalado
Node.js e npm instalados
MySQL configurado com o banco de dados do ERPet
IDE recomendada: Eclipse, IntelliJ ou VS Code para backend; editor de código para frontend

# Configuração do ambiente
Banco de dados
Importe o script SQL disponível na pasta database/erpetscript.sql no seu servidor MySQL.
Verifique se o banco está rodando e acessível.
Atualize o arquivo application.properties no backend com as credenciais corretas do banco (usuário, senha, URL).

# Backend (Java Spring Boot)

Na raiz do projeto backend, rode:
bash
Copiar
Editar
mvn clean install
mvn spring-boot:run
O backend iniciará em http://localhost:8080 e ficará responsável pelas operações de CRUD e consultas.

# Frontend (React)

Na pasta do frontend, execute:
bash
Copiar
Editar
npm install
npm start
A aplicação frontend estará disponível em http://localhost:3000.

# Navegação e uso do sistema

# 1. Página Inicial (Home)
Página inicial com os cards das funcionalidades principais.
A partir daqui, navegue para outras seções ou pelo menu lateral.

# 2. Categorias
Listar Categorias: Exibe uma lista com todas as categorias cadastradas.
Cada item mostra o nome e descrição da categoria.
Possui botões para editar e excluir.

Cadastrar Categoria: Formulário para adicionar uma nova categoria.
Campos obrigatórios: nome e descrição.
Botão para salvar e cancelar o formulário.


# 3. Produtos
Listar Produtos: Tabela contendo os produtos cadastrados, mostrando nome, categoria, preço e estoque.
Permite buscar e filtrar produtos.
Opções para editar e excluir cada produto.

Cadastrar Produto: Formulário para adicionar novo produto, com campos para nome,código de Barras, descrição, quantidade, preço, foto, categoria, fornecedor, disponibilidade  e data de validade.
Editar Produto: Tela para modificar dados do produto selecionado.
Opção de visualizar produtos excluídos.

# 4. Fornecedor
Listar Fornecedores: Exibe os fornecedores cadastrados, com informações como nome, contato e endereço.
Botões para editar, excluir e visualizar fornecedores excluidos.
Cadastrar Fornecedor: Formulário para adicionar novo fornecedor.

# 5. Vendas
Registrar Venda: Formulário para registrar uma nova venda.
Seleção do cliente, produtos e quantidades.
Calculo do valor total da venda.

# 6. Dashboard
Visão geral das principais métricas do petshop.

Gráficos que apresentam:
Média de vendas por mês.
Lista dos 10 produtos mais vendidos no mês.
Produtos com estoque baixo.
Produtos próximos do vencimento.

# 7.Relatórios de Vendas

Opção de exportar vendas com formato csv contendo campos id, data da venda, valor, cliente, usuario, produtos vendidos e observações.

# 8.Clientes
Listar Clientes: Exibe os clientes cadastrados, com informações como nome, contato e logadouro.
Botões para editar, excluir e visualizar clientes excluidos.
Cadastrar Cliente: Formulário para adicionar novo cliente.

# 9.Pedido de Compra
Listar Pedido de Compra: Exibe os pedidos de compras.
Botões para editar, excluir e visualizar pedidos excluidos.
Formulário para montar Pedido de Compra.

# 10.Usuários
Tela para o gerente controlar os usuários.

# 11.XML
Permite que o usuário envie arquivos XML e visualize os dados extraídos automaticamente, agilizando o processo de cadastro e controle de produtos ou vendas.
