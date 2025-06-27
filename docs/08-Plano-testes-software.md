# Plano de testes de software

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>, <a href="05-Projeto-interface.md"> Projeto de interface</a>

O plano de testes de software é gerado a partir da especificação do sistema e consiste em casos de teste que deverão ser executados quando a implementação estiver parcial ou totalmente pronta. 

| **Caso de teste**  | **CT-001 – Efetuar login**  |
|:---: |:---: |
| Requisito associado | RF-011 - Registrar login de funcionários no sistema com credenciais(nome de usuário e senha). |
| Objetivo do teste | Verificar se o usuário consegue realizar login. |
| Passos | - Acessar a aplicação <br> - Abrir o terminal no package json principal do front end  com o comando npm start <br> - Clicar no botão "Entre para cuidar do seu pet" <br> - Preencher o campo de login <br> - Preencher o campo de senha <br> - Clicar em "Entrar" |
| Critério de êxito | - O login foi realizado com sucesso. |
| Responsável pela elaboração do caso de teste | Gabriel. |

<br>

| **Caso de teste**  | **CT-002 – Cadastrar fornecedor**  |
|:---: |:---: |
| Requisito associado | RF-001 - Permitir o cadastro de fornecedores. |
| Objetivo do teste | Verificar se o usuário consegue cadastrar fornecedores na aplicação. |
| Passos | - Acessar a aplicação <br> - Abrir o terminal no package json principal do front end  com o comando npm start  <br> - Clicar no botão "Entre para cuidar do seu pet" <br> - Fazer login <br> -  Clicar no card de fornecedor  <br> Clicar no botão de cadastro <br> Preencher os campos obrigatórios (e-mail, nome, responsavel, telefone, observações, CEP, logradouro, bairro, cidade e estado) <br> - Clicar em "Cadastrar" |
| Critério de êxito | - O cadastro foi realizado com sucesso. |
| Responsável pela elaboração do caso de teste | Miriam. |

<br>

| **Caso de teste**  | **CT-003 – Editar fornecedor**  |
|:---: |:---: |
| Requisito associado | RF-017- Permitir a edição dos cadastros de fornecedores, clientes, categorias, produtos e funcionários. |
| Objetivo do teste | Verificar se o usuário consegue editar um fornecedor cadastrado. |
| Passos | - Acessar a aplicação <br> - Abrir o terminal no package json principal do front end  com o comando npm start  <br> - Clicar no botão "Entre para cuidar do seu pet" <br> - Fazer login <br>  - Clicar no card de fornecedor   <br> Clicar no icone de lápis para editar <br> - Preencher os campos obrigatórios (e-mail, nome, responsavel, telefone, observações, CEP, logradouro, bairro, cidade e estado)  e editar o(s) campo (s) necessários <br> - Clicar em "Salvar"
| Critério de êxito | - A edição foi realizada com sucesso. |
| Responsável pela elaboração do caso de teste | Miriam. |

<br>

| **Caso de teste**  | **CT-004 – Excluir fornecedor**  |
|:---: |:---: |
| Requisito associado | RF-018- Permitir a exclusão de registros, solicitando confirmação do usuários antes de proceder com a remoção. |
| Objetivo do teste | Verificar se o usuário consegue excluir um fornecedor cadastrado. |
| Passos | - Acessar a aplicação <br> - Abrir o terminal no package json principal do front end  com o comando npm start  <br> - Clicar no botão "Entre para cuidar do seu pet" <br> - Fazer login <br>  - Clicar no card de fornecedor  <br> Clicar no icone de lixeira para excluir <br> -Se deseja excluir, clique em confrimar, se não em cancelar <br> 
| Critério de êxito | - A exclusão foi realizada com sucesso. |
| Responsável pela elaboração do caso de teste | Miriam. |

<br>

| **Caso de teste**  | **CT-005 – Pesquisar fornecedor**  |
|:---: |:---: |
| Requisito associado |RF-020 - Permitir a consulta de funcionários, clientes, fornecedores, categorias e produtos cadastrados. |
| Objetivo do teste | Verificar se o usuário consegue pesquisar fornecedores na aplicação. |
| Passos | - Acessar a aplicação <br> - Abrir o terminal no package json principal do front end  com o comando npm start  <br> - Clicar no botão "Entre para cuidar do seu pet" <br> - Fazer login <br> -  Clicar no card de fornecedor  <br> Clicar na caixa de pesquisa <br> Digitar o nome do fornecedor <br> - Clicar em "Pesquisar" |
| Critério de êxito | - A pesquisa retornou o fornecedor registrado. |
| Responsável pela elaboração do caso de teste | Miriam. |

<br>

| **Caso de teste**  | **CT-006 – Cadastrar cliente**  |
|:---: |:---: |
| Requisito associado | RF-002 - Permitir o cadastro de clientes com informações como nome, endereço e contato. |
| Objetivo do teste | Verificar se o usuário consegue cadastrar clientes na aplicação. |
| Passos | - Acessar a aplicação <br> - Abrir o terminal no package json principal do front end  com o comando npm start  <br> - Clicar no botão "Entre para cuidar do seu pet" <br> - Fazer login <br> -  Clicar no card de  clientes <br> Clicar no botão de cadastro <br> Preencher os campos obrigatórios (e-mail, nome, telefone, observações, CEP, numero, logradouro, bairro, cidade e estado) <br> - Clicar em "Cadastrar" |
| Critério de êxito | - O cadastro foi realizado com sucesso. |
| Responsável pela elaboração do caso de teste | Alice. |

<br>

| **Caso de teste**  | **CT-007 – Editar cliente**  |
|:---: |:---: |
| Requisito associado | RF-017- Permitir a edição dos cadastros de fornecedores, clientes, categorias, produtos e funcionários. |
| Objetivo do teste | Verificar se o usuário consegue editar um cliente cadastrado. |
| Passos | - Acessar a aplicação <br> - Abrir o terminal no package json principal do front end  com o comando npm start  <br> - Clicar no botão "Entre para cuidar do seu pet" <br> - Fazer login <br>  -Clicar no card de  clientes  <br> Clicar no icone de lápis para editar <br> - Preencher os campos obrigatórios (e-mail, nome, telefone, observações, CEP, numero, logradouro, bairro, cidade e estado)  e editar o(s) campo (s) necessários <br> - Clicar em "Salvar"
| Critério de êxito | - A edição foi realizada com sucesso. |
| Responsável pela elaboração do caso de teste | Alice. |

<br>

| **Caso de teste**  | **CT-008 – Excluir cliente**  |
|:---: |:---: |
| Requisito associado | RF-018- Permitir a exclusão de registros, solicitando confirmação do usuários antes de proceder com a remoção. |
| Objetivo do teste | Verificar se o usuário consegue excluir um cliente cadastrado. |
| Passos | - Acessar a aplicação <br> - Abrir o terminal no package json principal do front end  com o comando npm start  <br> - Clicar no botão "Entre para cuidar do seu pet" <br> - Fazer login <br>  -Clicar no card de  clientes  <br> Clicar no icone de lixeira para excluir <br> -Se deseja excluir, clique em confrimar, se não em cancelar <br> 
| Critério de êxito | - A exclusão foi realizada com sucesso. |
| Responsável pela elaboração do caso de teste | Alice. |

<br>

| **Caso de teste**  | **CT-009 – Pesquisar cliente**  |
|:---: |:---: |
| Requisito associado |RF-020 - Permitir a consulta de funcionários, clientes, fornecedores, categorias e produtos cadastrados. |
| Objetivo do teste | Verificar se o usuário consegue pesquisar cliente na aplicação. |
| Passos | - Acessar a aplicação <br> - Abrir o terminal no package json principal do front end  com o comando npm start  <br> - Clicar no botão "Entre para cuidar do seu pet" <br> - Fazer login <br> -  Clicar no card de cliente  <br> Clicar na caixa de pesquisa <br> Digitar o nome do fornecedor <br> - Clicar em "Pesquisar" |
| Critério de êxito | - A pesquisa retornou o cliente registrado. |
| Responsável pela elaboração do caso de teste | Alice. |

<br>

| **Caso de teste**  | **CT-010 – Cadastrar usuário**  |
|:---: |:---: |
| Requisito associado | RF-003 - Permitir o cadastro de funcionários com informações como nome, login, tipo de usuário e endereço. |
| Objetivo do teste | Verificar se o usuário consegue cadastrar outros funcionários na aplicação. |
| Passos | - Acessar a aplicação <br> - Abrir o terminal no package json principal do front end  com o comando npm start  <br> - Clicar no botão "Entre para cuidar do seu pet" <br> - Fazer login <br> -  Clicar no card de usuários  <br> Clicar no botão de cadastro <br> Preencher os campos obrigatórios (e-mail, nome, login,tipo de usuário,senha, confirmar senha, CEP, logradouro, número, bairro, cidade e estado) <br> - Clicar em "Cadastrar" |
| Critério de êxito | - O cadastro foi realizado com sucesso. |
| Responsável pela elaboração do caso de teste | Eduarda. |

<br>

| **Caso de teste**  | **CT-011 – Editar usuário**  |
|:---: |:---: |
| Requisito associado | RF-017- Permitir a edição dos cadastros de fornecedores, clientes, categorias, produtos e funcionários. |
| Objetivo do teste | Verificar se o usuário consegue editar um usuário cadastrado. |
| Passos | - Acessar a aplicação <br> - Abrir o terminal no package json principal do front end  com o comando npm start  <br> - Clicar no botão "Entre para cuidar do seu pet" <br> - Fazer login <br>  -Clicar no card de  usuários  <br> Clicar no icone de lápis para editar <br> - Preencher os campos obrigatórios (e-mail, nome, login,tipo de usuário,senha, confirmar senha, CEP, logradouro, número, bairro, cidade e estado)  e editar o(s) campo (s) necessários. OBS: se não quiser alterar a senha, deixe-a em branco <br> - Clicar em "Salvar"
| Critério de êxito | - A edição foi realizada com sucesso. |
| Responsável pela elaboração do caso de teste | Eduarda. |


<br>

| **Caso de teste**  | **CT-012 – Excluir usuário**  |
|:---: |:---: |
| Requisito associado | RF-018- Permitir a exclusão de registros, solicitando confirmação do usuários antes de proceder com a remoção. |
| Objetivo do teste | Verificar se o usuário consegue excluir um usuário cadastrado. |
| Passos | - Acessar a aplicação <br> - Abrir o terminal no package json principal do front end  com o comando npm start  <br> - Clicar no botão "Entre para cuidar do seu pet" <br> - Fazer login <br>  -Clicar no card de  usuários  <br> Clicar no icone de lixeira para excluir <br> -Se deseja excluir, clique em confrimar, se não em cancelar <br> 
| Critério de êxito | - A exclusão foi realizada com sucesso. |
| Responsável pela elaboração do caso de teste | Eduarda. |

<br>

| **Caso de teste**  | **CT-013 – Pesquisar usuário**  |
|:---: |:---: |
| Requisito associado |RF-020 - Permitir a consulta de funcionários, clientes, fornecedores, categorias e produtos cadastrados. |
| Objetivo do teste | Verificar se o usuário consegue pesquisar usuários na aplicação. |
| Passos | - Acessar a aplicação <br> - Abrir o terminal no package json principal do front end  com o comando npm start  <br> - Clicar no botão "Entre para cuidar do seu pet" <br> - Fazer login <br> -  Clicar no card de usuário  <br> Clicar na caixa de pesquisa <br> Digitar o nome do usuário <br> - Clicar em "Pesquisar" |
| Critério de êxito | - A pesquisa retornou o usuário registrado. |
| Responsável pela elaboração do caso de teste | Eduarda. |

<br>

 **Caso de teste**  | **CT-014 – Editar senha de usuário**  |
|:---: |:---: |
| Requisito associado | RF-019- Possibilitar alteração da senha pelo usuário, mediante validação da senha atual. |
| Objetivo do teste | Verificar se o usuário consegue alterar uma senha cadastrada. |
| Passos | - Acessar a aplicação <br> - Abrir o terminal no package json principal do front end  com o comando npm start  <br> - Clicar no botão "Entre para cuidar do seu pet" <br> - Fazer login <br>  -Clicar no card de  usuários  <br> Clicar no icone de lápis para editar <br> - Preencher os campos obrigatórios (e-mail, nome, login,tipo de usuário, CEP, logradouro, número, bairro, cidade e estado), digite a senha desejada no campo de senha e a digite novamente no campo de confirmar senha <br> - Clicar em "Salvar"
| Critério de êxito | - A edição de senha foi realizada com sucesso. |
| Responsável pela elaboração do caso de teste | Eduarda. |


<br>

| **Caso de teste**  | **CT-015 – Cadastrar categoria**  |
|:---: |:---: |
| Requisito associado | RF-006 - Permitir o cadastro de categorias. |
| Objetivo do teste | Verificar se o usuário consegue cadastrar categorias na aplicação. |
| Passos | - Acessar a aplicação <br> - Abrir o terminal no package json principal do front end  com o comando npm start  <br> - Clicar no botão "Entre para cuidar do seu pet" <br> - Fazer login <br> -  Clicar no card de categorias  <br> Clicar no botão de cadastro <br> Preencher os campos obrigatórios (nome e descrição) <br> - Clicar em "Cadastrar Categoria" |
| Critério de êxito | - O cadastro foi realizado com sucesso. |
| Responsável pela elaboração do caso de teste | Wanessa. |

<br>

| **Caso de teste**  | **CT-016 – Editar categoria**  |
|:---: |:---: |
| Requisito associado | RF-017- Permitir a edição dos cadastros de fornecedores, clientes, categorias, produtos e funcionários. |
| Objetivo do teste | Verificar se o usuário consegue editar uma categoria cadastrada. |
| Passos | - Acessar a aplicação <br> - Abrir o terminal no package json principal do front end  com o comando npm start  <br> - Clicar no botão "Entre para cuidar do seu pet" <br> - Fazer login <br>  -Clicar no card de  categorias  <br> Clicar no icone de lápis para editar <br> - Preencher os campos obrigatórios (nome e descrição)  e editar o(s) campo (s) necessários <br> - Clicar em "Salvar"
| Critério de êxito | - A edição foi realizada com sucesso. |
| Responsável pela elaboração do caso de teste | Wanessa. |


<br>

| **Caso de teste**  | **CT-017 – Excluir categoria**  |
|:---: |:---: |
| Requisito associado | RF-018- Permitir a exclusão de registros, solicitando confirmação do usuários antes de proceder com a remoção. |
| Objetivo do teste | Verificar se o usuário consegue excluir uma categoria cadastrada. |
| Passos | - Acessar a aplicação <br> - Abrir o terminal no package json principal do front end  com o comando npm start  <br> - Clicar no botão "Entre para cuidar do seu pet" <br> - Fazer login <br>  -Clicar no card de  categorias  <br> Clicar no icone de lixeira para excluir <br> -Se deseja excluir, clique em confrimar, se não em cancelar <br> 
| Critério de êxito | - A exclusão foi realizada com sucesso. |
| Responsável pela elaboração do caso de teste | Wanessa. |

<br>

| **Caso de teste**  | **CT-018 – Pesquisar categoria**  |
|:---: |:---: |
| Requisito associado |RF-020 - Permitir a consulta de funcionários, clientes, fornecedores, categorias e produtos cadastrados. |
| Objetivo do teste | Verificar se o usuário consegue pesquisar uma categoria na aplicação. |
| Passos | - Acessar a aplicação <br> - Abrir o terminal no package json principal do front end  com o comando npm start  <br> - Clicar no botão "Entre para cuidar do seu pet" <br> - Fazer login <br> -  Clicar no card de categorias <br> Clicar na caixa de pesquisa <br> Digitar o nome da categoria <br> - Clicar em "Pesquisar" |
| Critério de êxito | - A pesquisa retornou a categoria registrado. |
| Responsável pela elaboração do caso de teste | Wanessa. |

<br>

| **Caso de teste**  | **CT-019 – Cadastrar produto**  |
|:---: |:---: |
| Requisito associado | RF-004 - Permitir o registro de novos produtos com nome e data de validade. |
| Objetivo do teste | Verificar se o usuário consegue cadastrar novos produtos na aplicação. |
| Passos | - Acessar a aplicação <br> - Abrir o terminal no package json principal do front end  com o comando npm start  <br> - Clicar no botão "Entre para cuidar do seu pet" <br> - Fazer login <br> -  Clicar no card de produtos  <br> Clicar no botão de cadastro <br> Preencher os campos obrigatórios (nome, quantidade, descrição, status de disponivel,preço, data de validade, foto, categoria, fornecedor) <br> - Clicar em "Cadastrar Produto" |
| Critério de êxito | - O cadastro foi realizado com sucesso. |
| Responsável pela elaboração do caso de teste | Gabriel. |

<br>

| **Caso de teste**  | **CT-020 – Editar produto**  |
|:---: |:---: |
| Requisito associado | RF-017- Permitir a edição dos cadastros de fornecedores, clientes, categorias, produtos e funcionários. |
| Objetivo do teste | Verificar se o usuário consegue editar um produto cadastrado. |
| Passos | - Acessar a aplicação <br> - Abrir o terminal no package json principal do front end  com o comando npm start  <br> - Clicar no botão "Entre para cuidar do seu pet" <br> - Fazer login <br>  -Clicar no card de  produtos  <br> Clicar no icone de lápis para editar <br> - Preencher os campos obrigatórios (nome, quantidade, descrição, status de disponivel,preço, data de validade, foto, categoria, fornecedor)  e editar o(s) campo (s) necessários <br> - Clicar em "Salvar"
| Critério de êxito | - A edição foi realizada com sucesso. |
| Responsável pela elaboração do caso de teste | Gabriel. |

<br>

| **Caso de teste**  | **CT-021 – Excluir produto**  |
|:---: |:---: |
| Requisito associado | RF-018- Permitir a exclusão de registros, solicitando confirmação do usuários antes de proceder com a remoção. |
| Objetivo do teste | Verificar se o usuário consegue excluir um produto cadastrado. |
| Passos | - Acessar a aplicação <br> - Abrir o terminal no package json principal do front end  com o comando npm start  <br> - Clicar no botão "Entre para cuidar do seu pet" <br> - Fazer login <br>  -Clicar no card de  produtos  <br> Clicar no icone de lixeira para excluir <br> -Se deseja excluir, clique em confrimar, se não em cancelar <br> 
| Critério de êxito | - A exclusão foi realizada com sucesso. |
| Responsável pela elaboração do caso de teste | Gabriel. |

<br>

| **Caso de teste**  | **CT-022 – Pesquisar produto**  |
|:---: |:---: |
| Requisito associado |RF-020 - Permitir a consulta de funcionários, clientes, fornecedores, categorias e produtos cadastrados. |
| Objetivo do teste | Verificar se o usuário consegue pesquisar um produto na aplicação. |
| Passos | - Acessar a aplicação <br> - Abrir o terminal no package json principal do front end  com o comando npm start  <br> - Clicar no botão "Entre para cuidar do seu pet" <br> - Fazer login <br> -  Clicar no card de produtos <br> Clicar na caixa de pesquisa <br> Digitar o nome da categoria <br> - Clicar em "Pesquisar" |
| Critério de êxito | - A pesquisa retornou o produto registrado. |
| Responsável pela elaboração do caso de teste | Gabriel. |

<br>

| **Caso de teste**  | **CT-023 – Cadastrar pedido de compra**  |
|:---: |:---: |
| Requisito associado | RF-005 - Registrar pedidos de compra. |
| Objetivo do teste | Verificar se o usuário consegue cadastrar pedidos de compra na aplicação. |
| Passos | - Acessar a aplicação <br> - Abrir o terminal no package json principal do front end  com o comando npm start  <br> - Clicar no botão "Entre para cuidar do seu pet" <br> - Fazer login <br> -  Clicar no card de pedido de compra  <br> Clicar no botão de cadastro <br> Preencher os campos obrigatórios (nome, código,preço unitário, quantidade) <br> - Clicar em "Adicionar" |
| Critério de êxito | - O cadastro foi realizado com sucesso. |
| Responsável pela elaboração do caso de teste | Maria Clara. |

<br>

| **Caso de teste**  | **CT-024 – Editar pedido de compra**  |
|:---: |:---: |
| Requisito associado | RF-017- Permitir a edição dos cadastros de fornecedores, clientes, categorias, produtos e funcionários. |
| Objetivo do teste | Verificar se o usuário consegue editar um pedido de compra cadastrado. |
| Passos | - Acessar a aplicação <br> - Abrir o terminal no package json principal do front end  com o comando npm start  <br> - Clicar no botão "Entre para cuidar do seu pet" <br> - Fazer login <br>  -Clicar no card de  pedido de compra  <br> Clicar no icone de lápis para editar <br> - Preencher os campos obrigatórios (nome, código,preço unitário, quantidade)  e editar o(s) campo (s) necessários <br> - Clicar em "Salvar"
| Critério de êxito | - A edição foi realizada com sucesso. |
| Responsável pela elaboração do caso de teste | Maria Clara. |

<br>

| **Caso de teste**  | **CT-025 – Excluir pedido de compra**  |
|:---: |:---: |
| Requisito associado | RF-018- Permitir a exclusão de registros, solicitando confirmação do usuários antes de proceder com a remoção. |
| Objetivo do teste | Verificar se o usuário consegue excluir um pedido de compra cadastrado. |
| Passos | - Acessar a aplicação <br> - Abrir o terminal no package json principal do front end  com o comando npm start  <br> - Clicar no botão "Entre para cuidar do seu pet" <br> - Fazer login <br>  -Clicar no card de  pedido de compra  <br> Clicar no icone de lixeira para excluir <br> -Se deseja excluir, clique em confrimar, se não em cancelar <br> 
| Critério de êxito | - A exclusão foi realizada com sucesso. |
| Responsável pela elaboração do caso de teste | Maria Clara. |

<br>

| **Caso de teste**  | **CT-026 – Pesquisar pedido de compra**  |
|:---: |:---: |
| Requisito associado |RF-020 - Permitir a consulta de funcionários, clientes, fornecedores, categorias e produtos cadastrados. |
| Objetivo do teste | Verificar se o usuário consegue pesquisar um produto na aplicação. |
| Passos | - Acessar a aplicação <br> - Abrir o terminal no package json principal do front end  com o comando npm start  <br> - Clicar no botão "Entre para cuidar do seu pet" <br> - Fazer login <br> -  Clicar no card de pedido de compra <br> Clicar na caixa de pesquisa <br> Digitar o nome da categoria <br> - Clicar em "Pesquisar" |
| Critério de êxito | - A pesquisa retornou o pedido de compra registrado. |
| Responsável pela elaboração do caso de teste | Maria Clara. |

<br>

## Ferramentas de testes (opcional)

Foi usada a seguinte ferramenta: 
- Postman, para testar o backend.
 
