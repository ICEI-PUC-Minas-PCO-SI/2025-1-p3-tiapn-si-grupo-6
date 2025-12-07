<h1>Plano do Projeto de Testes </h1>
Este repositório contém todos os artefatos, casos de teste e suítes automatizadas utilizados para validar a aplicação ERPet, um sistema ERP desenvolvido para gestão de uma casa de ração. O objetivo deste repositório é centralizar exclusivamente os testes de software, separados do código-fonte principal.

<h2>Tipos de Testes Implementados</h2>
Este repositório contém 30 casos de teste divididos da seguinte forma:

* 10 Testes Unitários
* 10 Testes Funcionais Automatizados (Selenium)
* 10 Testes Funcionais Manuais (com prints)


## 1. Testes Unitários

| Código | Descrição do Teste                                      | O que valida                                                                 |
|:------:|----------------------------------------------------------|-------------------------------------------------------------------------------|
| UT01   | Validar edição de categoria                              | Confirma que nome e descrição são atualizados corretamente                   |
| UT02   | Validar cadastro de categoria                            | Garante que uma nova categoria é salva com sucesso                           |
| UT03   | Validar busca de categoria por ID                        | Retorna corretamente uma categoria existente                                 |
| UT04   | Validar exceção ao buscar categoria inexistente          | Garante que uma exceção é lançada quando o ID não existe                     |
| UT05   | Validar conversão de Categoria para CategoriaDTO         | Verifica se os dados são convertidos corretamente para o DTO                 |
| UT06   | Validar salvamento de produto com categoria e fornecedor | Confirma que o produto é salvo com todas as dependências                     |
| UT07   | Validar busca de produto por ID existente                | Retorna corretamente um produto existente                                    |
| UT08   | Validar exceção ao buscar produto por ID inexistente     | Garante que uma exceção é lançada quando o ID não existe                     |
| UT09   | Validar conversão de Produto para ProdutoDTO             | Confirma a conversão correta dos dados essenciais para o DTO                 |
| UT10   | Validar busca de produtos por fornecedor                 | Verifica se os produtos associados ao fornecedor são retornados corretamente |

## 2. Testes Funcionais Automatizados (Selenium)
| Código | Cenário | Resultado Esperado |
|:------:|:----------|:-------------------|
| FT01   | Login válido | Entrar no sistema |
| FT02   | Login inválido | Erro exibido |
| FT03   | Cadastro de usuário | Usuário cadastrado e listado |
| FT04   | Cadastro de categoria | Categoria cadastrada e listada |
| FT05   | Cadastro de fornecedor com CEP | Fornecedor cadastrado e listado |
| FT06   | Venda sem cliente | Erro "Cliente obrigatório" |
| FT07   | Exportar relatório CSV | Download realizado |
| FT08   | Importar XML válido | Dados carregados |
| FT09   | Importar XML inválido | Erro exibido |
| FT10   | Cadastrar fornecedor | Fornecedor listado |


## 3. Testes Funcionais Manuais
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

