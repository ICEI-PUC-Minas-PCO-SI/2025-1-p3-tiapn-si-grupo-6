<h1>Plano do Projeto de Testes </h1>
Este repositório contém todos os artefatos, casos de teste e suítes automatizadas utilizados para validar a aplicação ERPet, um sistema ERP desenvolvido para gestão de uma casa de ração. O objetivo deste repositório é centralizar exclusivamente os testes de software, separados do código-fonte principal.

<h2>Tipos de Testes Implementados</h2>
Este repositório contém 30 casos de teste divididos da seguinte forma:

* 10 Testes Unitários
* 10 Testes Funcionais Automatizados (Selenium)
* 10 Testes Funcionais Manuais (com prints)


## 1. Testes Unitários (10 casos)

| Código | Descrição | Resultado Esperado |
|:------:|:----------|:-------------------|
| UT01   | Validar nome da categoria obrigatório | Erro "Nome obrigatório" |
| UT02   | Verificar unicidade do código de barras | Erro de duplicidade |
| UT03   | Calcular total de venda | Total = 25,00 |
| UT04   | Validar estoque para venda | Erro "Estoque insuficiente" |
| UT05   | Validar data de validade (não pode ser passada) | Erro "Data de validade inválida" |
| UT06   | Validar formato telefone fornecedor | Erro "Formato de telefone inválido" |
| UT07   | Validar nome obrigatório do cliente | Erro "Nome do cliente obrigatório" |
| UT08   | Validar upload de XML | Apenas .xml aceito |
| UT09   | Validar média mensal no dashboard | Média correta |
| UT10   | Restaurar produto excluído | Status alterado para ativo |

## 2. Testes Funcionais Automatizados (Selenium)
| Código | Cenário | Resultado Esperado |
|:------:|:----------|:-------------------|
| FT01   | Cadastrar categoria válida | Categoria listada |
| FT02   | Categoria sem nome | Erro exibido |
| FT03   | Cadastrar produto completo | Produto listado |
| FT04   | Editar produto | Preço atualizado |
| FT05   | Registrar venda válida | Venda concluída |
| FT06   | Venda sem cliente | Erro "Cliente obrigatório" |
| FT07   | Exportar relatório CSV | Download realizado |
| FT08   | Importar XML válido | Dados carregados |
| FT09   | Importar XML inválido | Erro exibido |
| FT10   | Cadastrar fornecedor | Fornecedor listado |

## 2. Testes Funcionais Automatizados (Selenium)
| Código | Cenário | Resultado Esperado |
|:------:|:----------|:-------------------|
| FT01   | Cadastrar categoria válida | Categoria listada |
| FT02   | Categoria sem nome | Erro exibido |
| FT03   | Cadastrar produto completo | Produto listado |
| FT04   | Editar produto | Preço atualizado |
| FT05   | Registrar venda válida | Venda concluída |
| FT06   | Venda sem cliente | Erro "Cliente obrigatório" |
| FT07   | Exportar relatório CSV | Download realizado |
| FT08   | Importar XML válido | Dados carregados |
| FT09   | Importar XML inválido | Erro exibido |
| FT10   | Cadastrar fornecedor | Fornecedor listado |

## 3. Testes Funcionais Automatizados (Selenium)
| Código | Cenário | Resultado Esperado |
|:------:|:----------|:-------------------|
| MT01   | Listar categorias             | Lista exibida         |
| MT02   | Excluir categoria             | Categoria removida    |
| MT03   | Visualizar produtos excluídos | Lista carregada       |
| MT04   | Editar fornecedor             | Alteração salva       |
| MT05   | Excluir cliente               | Movido para excluídos |
| MT06   | Registrar venda manual        | Venda registrada      |
| MT07   | Consultar dashboard           | Gráficos exibidos     |
| MT08   | Gerar relatório CSV           | Download realizado    |
| MT09   | Criar pedido de compra        | Pedido criado         |
| MT10   | Cadastrar usuário             | Usuário listado       |

