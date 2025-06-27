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

## 📽️ Demonstração em Vídeo

🎬 [Assista ao vídeo do sistema no Google Drive](https://drive.google.com/file/d/10uvwEmvpsx3VUXadE_gs7QaILAjMJeNS/view?usp=sharing)

## Instruções de utilização

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

# 📚 Navegação e Uso do Sistema ERPet

### 1. Página Inicial (Home)

Página inicial com os cards das funcionalidades principais.  
A partir daqui, o usuário pode navegar para outras seções por meio dos botões ou do menu lateral.

---

### 2. Categorias

**Listar Categorias:** Exibe uma lista com todas as categorias cadastradas.  
Cada item mostra o nome e descrição da categoria.  
Possui botões para editar e excluir.

**Cadastrar Categoria:** Formulário para adicionar uma nova categoria.  
Campos obrigatórios: nome e descrição.  
Botões para salvar e cancelar o formulário.

---

### 3. Produtos

**Listar Produtos:** Tabela com os produtos cadastrados, exibindo nome, categoria, preço e estoque.  
Permite buscar e filtrar produtos.  
Cada linha possui opções para editar e excluir.

**Cadastrar Produto:**  
Formulário para adicionar um novo produto, com os seguintes campos:  
- Nome  
- Código de barras  
- Descrição  
- Quantidade  
- Preço  
- Foto  
- Categoria  
- Fornecedor  
- Disponibilidade  
- Data de validade  

**Editar Produto:** Tela para modificar os dados de um produto já existente.  
Também há a opção de visualizar produtos excluídos.

---

### 4. Fornecedores

**Listar Fornecedores:** Exibe os fornecedores cadastrados com informações como nome, contato e endereço.  
Botões para editar, excluir e visualizar fornecedores excluídos.

**Cadastrar Fornecedor:** Formulário para adicionar um novo fornecedor.

---

### 5. Vendas

**Registrar Venda:**  
Formulário para registrar uma nova venda.  
Inclui seleção do cliente, escolha dos produtos, quantidades e cálculo automático do valor total.

---

### 6. Dashboard

Visão geral das principais métricas do petshop.  
Gráficos e indicadores que apresentam:

- Média de vendas por mês  
- Lista dos 10 produtos mais vendidos no mês  
- Produtos com estoque baixo  
- Produtos próximos do vencimento  

---

### 7. Relatórios de Vendas

Opção de exportar os dados de vendas no formato `.csv`, contendo os seguintes campos:  
- ID  
- Data da venda  
- Valor  
- Cliente  
- Usuário responsável  
- Produtos vendidos  
- Observações  

---

### 8. Clientes

**Listar Clientes:** Exibe os clientes cadastrados com nome, contato e logradouro.  
Botões para editar, excluir e visualizar clientes excluídos.

**Cadastrar Cliente:** Formulário para adicionar um novo cliente.

---

### 9. Pedido de Compra

**Listar Pedido de Compra:** Exibe todos os pedidos de compra realizados.  
Botões para editar, excluir e visualizar pedidos excluídos.

**Cadastrar Pedido de Compra:** Formulário para montar um novo pedido de compra, selecionando produtos e fornecedores.

---

### 10. Usuários

Tela voltada ao gerente do sistema, responsável por controlar os usuários cadastrados no sistema.  
Possibilita cadastrar, editar, desativar e listar usuários.

---

### 11. XML

Tela dedicada à importação de arquivos XML, como notas fiscais eletrônicas (NF-e).  
Permite que o usuário envie arquivos `.xml` e visualize os dados extraídos automaticamente, como produtos, fornecedores e valores totais.  
Esses dados podem ser importados diretamente para o sistema, agilizando o cadastro e controle de produtos ou vendas.


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


