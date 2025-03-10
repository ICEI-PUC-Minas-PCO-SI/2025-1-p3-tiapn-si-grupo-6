# Especificação do projeto

<span style="color:red">Pré-requisitos: <a href="01-Contexto.md"> Documentação de contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto.

## Personas

Exemplo: _Pedro Paulo tem 26 anos, é arquiteto recém-formado e autônomo. Pensa em se desenvolver profissionalmente por meio de um mestrado fora do país, pois adora viajar, é solteiro e sempre quis fazer um intercâmbio. Está buscando uma agência que o ajude a encontrar universidades na Europa que aceitem alunos estrangeiros._

Enumere e detalhe as personas da sua solução. Para tanto, baseie-se tanto nos documentos disponibilizados na disciplina e/ou nos seguintes links:

> **Links úteis**:
> - [Rock content](https://rockcontent.com/blog/personas/)
> - [Hotmart](https://blog.hotmart.com/pt-br/como-criar-persona-negocio/)
> - [O que é persona?](https://resultadosdigitais.com.br/blog/persona-o-que-e/)
> - [Persona x público-alvo](https://flammo.com.br/blog/persona-e-publico-alvo-qual-a-diferenca/)
> - [Mapa de empatia](https://resultadosdigitais.com.br/blog/mapa-da-empatia/)
> - [Mapa de stalkeholders](https://www.racecomunicacao.com.br/blog/como-fazer-o-mapeamento-de-stakeholders/)
>
Lembre-se que você deve ser enumerar e descrever precisamente e personalizada todos os clientes ideais que sua solução almeja.

## Histórias de usuários

Com base na análise das personas, foram identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Usuário do sistema  | Registrar minhas tarefas           | Não esquecer de fazê-las               |
|Administrador       | Alterar permissões                 | Permitir que possam administrar contas |

Apresente aqui as histórias de usuários que são relevantes para o projeto da sua solução. As histórias de usuários consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuários por contexto, para facilitar consultas recorrentes a esta parte do documento.

> **Links úteis**:
> - [Histórias de usuários com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
> - [Como escrever boas histórias de usuário (user stories)](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)
> - [User stories: requisitos que humanos entendem](https://www.luiztools.com.br/post/user-stories-descricao-de-requisitos-que-humanos-entendem/)
> - [Histórias de usuários: mais exemplos](https://www.reqview.com/doc/user-stories-example.html)
> - [9 common user story mistakes](https://airfocus.com/blog/user-story-mistakes/)

## Requisitos

As tabelas a seguir apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade dos requisitos, aplique uma técnica de priorização e detalhe como essa técnica foi aplicada.

### Requisitos funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir que o gerente cadastre tarefas | ALTA | 
|RF-002| Controlar a disponibilidade dos funcionários para evitar conflitos de horários   | ALTA |
|RF-003| Permitir o cadastro de fornecedores | ALTA | 
|RF-004| Permitir o cadastro de clientes com informações como nome, endereço e contato | BAIXA | 
|RF-005| Permitir o cadastro e gerenciamento de funcionários com informações como nome, matricula, cargo e horário de trabalho | ALTA | 
|RF-006| Controlar horários disponíveis para agendamentos de banho, tosa e consulta  | ALTA |
|RF-007| Permitir o registro de novos produtos recebidos diariamente   | ALTA |
|RF-008| Registrar vendas com detalhamento de itens, quantidade, preço, forma de pagamento e data da venda | ALTA | 
|RF-009| Cadastrar datas de validade dos produtos                      | ALTA |
|RF-010| Atualizar automaticamente o estoque após o cadastro de produtos  | ALTA |
|RF-011| Notificar sobre produtos próximos do vencimento   | MÉDIA |
|RF-012| Atualizar o estoque em tempo real com cada venda ou movimentação   | ALTA |
|RF-013| Gerar alertas de produtos com baixa quantidade	   | MÉDIA |
|RF-014| Permitir que os funcionários consultem a disponibilidade dos produtos no estoque.   | MÉDIA |
|RF-015| Emitir um relatório de tarefas de um determinado período ou funcionário  | MÉDIA |
|RF-016| Emitir relatórios de compras e vendas e movimentação de produtos   | ALTA |
|RF-017| Permitir a visualização do histórico de compras de clientes	  | MÉDIA | 
|RF-018| Mostrar o fluxo de agendamentos e atendimentos   | ALTA |
|RF-019| Permitir a atribuição dos atendimentos a matricula dos funcionários   | MÉDIA |
|RF-020| O sistema deve permitir que usuários realizem login com credenciais(matricula e senha)	  | ALTA | 
|RF-021| Disponibilizar um sistema de agendamento para banhos, tosas e consultas veterinárias   | ALTA |
|RF-022| Permitir a remarcação e o cancelamento de atendimentos pelos funcionários   | ALTA |
|RF-023| Validar as credenciais e conceder acesso conforme o tipo de usuário(gerente, funcionário, etc)	   | ALTA |
|RF-024| Permitir que o funcionário associe a venda a um cliente | MÉDIA | 
|RF-025| Permitir a emissão de um comprovante de venda | ALTA | 
|RF-026| Permitir a consulta do histórico de compras e vendas | ALTA | 
|RF-027| Permitir o filtro do histórico por cliente, fornecedor, período, produto ou funcionário reponsável | MÉDIA | 
|RF-028| Permitir a edição dos cadastros de fornecedores, clientes, produtos e funcionários | ALTA |
|RF-029| Permitir a exclusão de registros, solicitando confirmação do usuários antes de proceder com a remoção | MÉDIA | 
|RF-030| Disponibilizar funcionalidade de recuperação de senha, enviando instruções para o e-mail cadastrado. | MÉDIA |
|RF-031| Possibilitar alteração da senha pelo usuário, mediante validação da senha atual | MÉDIA | 
|RF-032| Disponibilizar um relatório para o funcionário consultar os agendamentos atribuidos a ele | ALTA |



### Requisitos não funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em dispositivos móveis | MÉDIA | 
|RNF-002| Deve processar as requisições do usuário em no máximo 3 segundos |  BAIXA | 

Com base nas histórias de usuários, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos não funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).

Lembre-se de que cada requisito deve corresponder a uma e somente uma característica-alvo da sua solução. Além disso, certifique-se de que todos os aspectos capturados nas histórias de usuários foram cobertos.

> **Links úteis**:
> - [O que são requisitos funcionais e requisitos não funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [Entenda o que são requisitos de software, a diferença entre requisito funcional e não funcional, e como identificar e documentar cada um deles](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

## Restrições

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

O projeto está restrito aos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|001| O projeto deverá ser entregue até o final do semestre |
|002| O custo total do projeto não deve exceder o orçamento definido       |

## Diagrama de casos de uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos. Ele utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. O diagrama contempla a fronteira do sistema e o detalhamento dos requisitos funcionais, com a indicação dos atores, casos de uso e seus relacionamentos.

As referências abaixo irão auxiliá-lo na geração do artefato “diagrama de casos de uso”.

> **Links úteis**:
> - [Criando casos de uso](https://www.ibm.com/docs/pt-br/engineering-lifecycle-management-suite/design-rhapsody/10.0?topic=cases-creating-use)
> - [Como criar diagrama de caso de uso: tutorial passo a passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)
