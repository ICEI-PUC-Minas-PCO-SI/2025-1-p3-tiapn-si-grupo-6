# Projeto de interface

A plataforma ERPet foi projetada para oferecer uma experiência simples, intuitiva e funcional, considerando o perfil dos usuários e os requisitos levantados na fase de especificação. A seguir, são apresentadas as principais telas do sistema, bem como a lógica de interação do usuário com as funcionalidades propostas.

A interface foi desenhada com base em princípios de usabilidade, acessibilidade e design responsivo, garantindo seu uso em computadores, tablets e smartphones. Dessa forma, tanto funcionários quanto gerentes podem utilizar o sistema de maneira eficiente, independentemente do dispositivo utilizado.

 ## User flow
<p align="center">
  <img src="images/Userflow.png" alt="Userflow" width="800px"> <br/>
    <strong>Figura:</strong> Userflow do sistema
</p>

### Diagrama de fluxo

O diagrama apresenta o estudo do fluxo de interação do usuário com o sistema interativo, muitas vezes sem a necessidade de desenhar o design das telas da interface. Isso permite que o design das interações seja bem planejado e tenha impacto na qualidade do design do wireframe interativo que será desenvolvido logo em seguida.

<p align="center">
  <img src="images/Diagrama de fluxo -ERPet (1).jpg" alt="Diagrama de fluxo" width="800px"> <br/>
    <strong>Figura:</strong> Diagrama de fluxo do sistema
</p>

## Wireframes

### Landing Page
<p align="center">
  <img src="images/landing-wireframe.png" alt="Wireframe Landing Page" width="800px"> <br/>
</p>

### Login
<p align="center">
  <img src="images/wireframe-login.png" alt="Wireframe Login" width="800px"> <br/>
</p>

### Tela Inicial
<p align="center">
  <img src="images/wireframe_tela_inicial.png" alt="Wireframe Tela Inicial" width="800px"> <br/>
</p>


### Gestão de Clientes
<p align="center">
  <img src="images/wireframe_gestao_clientes.png" alt="Wireframe Gestão de Clientes" width="800px"> <br/>
</p>


### Cadastro de Clientes
<p align="center">
  <img src="images/wireframe_cadastro_clientes.png" alt="Wireframe Cadastro de Clientes" width="800px"> <br/>
</p>

### Gestão de Fornecedor
<p align="center">
  <img src="images/fornecedor-wireframe.png" alt="Wireframe Gestão de Fornecedor" width="800px"> <br/>
</p>

### Cadastro de Fornecedor
<p align="center">
  <img src="images/cadastro-fornecedor-wireframe.png" alt=" Wireframe Cadastro de Fornecedor" width="800px"> <br/>
</p>


### Gestão de Produtos
<p align="center">
  <img src="images/cadastro-fornecedor-wireframe.png" alt="Wireframe Gestão de Produtos" width="800px"> <br/>
</p>

### Cadastro de Produtos
<p align="center">
  <img src="images/gestao-produtos-wireframe.png" alt="Wireframe Cadastro de Produtos" width="800px"> <br/>
</p>

### Conferência XML
<p align="center">
  <img src="images/conferencia-xml-wireframe.png" alt="Wireframe Conferência XML" width="800px"> <br/>
</p>

### Montar Pedido Compra
<p align="center">
  <img src="images/pedido-compra-wireframe.png" alt="Wireframe Montar Pedido Compra" width="800px"> <br/>
</p>

### Registro Venda
<p align="center">
  <img src="images/registro-venda-wireframe.png" alt="Wireframe Registro Venda" width="800px"> <br/>
</p>

### Relatórios
<p align="center">
  <img src="images/conferencia-xml-wireframe.png" alt="Wireframe Relatórios" width="800px"> <br/>
</p>

### Gestão de Funcionários
<p align="center">
  <img src="images/funcionario-wireframe.png" alt="Wireframe Conferência XML" width="800px"> <br/>
</p>

### Cadastro Funcionários
<p align="center">
  <img src="images/cadastro-funcionario-wireframe.png" alt=" Wireframe Cadastro Funcionários" width="800px"> <br/>
</p>


## Interface do sistema

### Tela principal do sistema

Esta tela apresenta uma visão geral da média de vendas ao longo do ano e destaca os 10 produtos mais vendidos no mês. Também exibe uma lista de produtos com baixo estoque, cada um com um botão "Repor Estoque", que quando selecionado direciona para a página de Montagem de Pedido de Compra. Além disso, há uma seção dedicada a itens próximos da data de vencimento, indicando os respectivos percentuais de desconto aplicados. 
<p align="center">
  <img src="images/tela-principal-interface.png" alt="Tela principal do sistema" width="600px"> <br/>
</p>

 ### Tela de Gestão de Cliente
 Esta tela apresenta os clientes que já foram cadastrados, com seus dados. O administrador pode pesquisar algum cliente especifico através da caixa de pesquisa, utilizar filtros, e, caso o cliente não esteja cadastrado ele pode clicar no botão de cadastro e ser redirecionado para a pagina de cadastro.

<p align="center">
  <img src="images/gestao-cliente-interface.png" alt="Tela de Gestão de Clientes" width="600px"> <br/>
</p>

 ###  Tela de Cadastro de Cliente
 Esta tela apresenta os dados que devem ser preenchidos para realizar o cadastro do cliente do PetShop: nome completo, telefone, endereço, logradouro e email, caso o administrador queira salvar o cadastro ele deve clicar em cadastrar, se quiser cancelar, deve clicar em cancelar. O administrador poderá clicar no botão "ver clientes cadastrados" e será redirecionado para a pagina de lista de clientes já cadastrados. 
<p align="center">
  <img src="images/cadastrar-cliente-interface.png" alt="Tela de Cadastro de Cliente" width="600px"> <br/>
</p>

### Tela de Cadastro de Fornecedor
Permite o registro de novos fornecedores, incluindo dados como nome, CNPJ, endereço e observações.

<p align="center">
  <img src="images/cadastro-fornecedor-interface.png" alt="Tela de Gestão de Produto" width="600px"> <br/>
</p>

### Tela de Gestão de Fornecedor
Exibe a lista de fornecedores cadastrados, com funcionalidades para buscar, editar ou remover fornecedores existentes.

<p align="center">
  <img src="images/fornecedor-interface.png" alt="Tela de Gestão de Fornecedor" width="600px"> <br/>
</p>

### Tela de Cadastro de Produto
Formulário para cadastrar produtos com nome, descrição, categoria, preço, quantidade, validade, e link da imagem.

<p align="center">
  <img src="images/cadastro-produtos-interface.png" alt="Tela de Cadastro de Produto" width="600px"> <br/>
</p>

### Tela de Gestão de Produto
Lista os produtos cadastrados no sistema com possibilidade de filtrar, atualizar ou excluir registros.

<p align="center">
  <img src="images/gestao-produtos-interface.png" alt="Tela de Gestão de Produto" width="600px"> <br/>
</p>

### Tela de Conferência de XML
Permite o upload e leitura de arquivos XML de notas fiscais, exibindo informações importantes como produtos, valores e fornecedor. Faz a conferência automática de acordo com a ordem de compra selecionada e já é possível entrar com ela no sistema para atualizar os dados de produto e estoque.

<p align="center">
  <img src="images/conferencia-xml-interface.png" alt="Tela de Conferência de XML" width="600px"> <br/>
</p>

### Tela de Montagem de Pedido de Compra
Permite criar e editar pedidos de compra, associando produtos, quantidades e fornecedor.

<p align="center">
  <img src="images/pedido-compra-interface.png" alt="Tela de Montagem de Pedido de Compra" width="600px"> <br/>
</p>

### Tela de Registro de Venda
Utilizada para registrar novas vendas, associando produtos e cliente, calculando valores totais e permitindo inserção de observações.

<p align="center">
  <img src="images/registro-venda-interface.png" alt="Tela de Relatórios" width="600px"> <br/>
</p>


### Tela de Relatórios
Gera relatórios administrativos, como vendas por período, pedidos de compra, produtos cadastrados ou mais vendidos, e movimentação de funcionários.

<p align="center">
  <img src="images/relatorio-interface.png" alt="Tela de Relatórios" width="600px"> <br/>
</p>

### Landing page
Tela inicial pública do sistema, voltada para apresentação da plataforma. Exibe informações resumidas sobre os recursos do sistema, vantagens, diferenciais e contatos.

<p align="center">
  <img src="images/landing-interface.png" alt="Landing page" width="600px"> <br/>
</p>

### Login
Tela responsável por autenticar os usuários do sistema. Nela, o funcionário (admin, gerente ou colaborador) insere seu nome de usuário e senha.

<p align="center">
  <img src="images/login-interface.png" alt="Tela de Login" width="600px"> <br/>
</p>

### Tela de Cadastro de Funcionários
Permitir cadastrar novos funcionários no sistema, com informações essenciais para o gerenciamento da equipe.

<p align="center">
  <img src="images/cadastro-funcionario-interface.png" alt="Tela de Cadastro de Funcionários" width="600px"> <br/>
</p>

### Tela de Gestão de Funcionários
Permitir visualizar, gerenciar e editar as informações dos funcionários cadastrados no sistema.

<p align="center">
  <img src="images/funcionario-interface.png" alt="Tela de Gestão de Funcionários" width="600px"> <br/>
</p>
