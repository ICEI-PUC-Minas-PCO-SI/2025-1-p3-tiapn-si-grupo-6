# Modelagem dos processos de negócio

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>



## Modelagem da situação atual (Modelagem AS IS)

Descrição Textual dos Processos Atuais
1. Cadastro de Produtos:
Processo Atual:
- Recebimento da Carga: Quando uma nova carga de produtos chega ao pet shop, um funcionário é responsável por recebê-la.
- Conferência: O funcionário confere a carga recebida com a nota fiscal e assina o recibo para confirmar que tudo está em ordem.
- Armazenamento: Após a conferência, o funcionário guarda os produtos no estoque.
- Registro no Sistema: O funcionário precisa se deslocar até um computador para registrar manualmente cada produto no sistema de gestão do pet shop.
Problemas Identificados:
- Sobrecarga de Tarefas: Com o aumento do volume de produtos, os funcionários enfrentam uma sobrecarga de tarefas, resultando em desorganização.
- Gargalo no Cadastro: Se vários produtos chegam ao mesmo tempo, o processo de cadastro pode se tornar um gargalo, atrasando a atualização do estoque.
- Deslocamento Ineficiente: O deslocamento até o computador para registrar os produtos é ineficiente e consome tempo.
- Falta de Controle de Validade e Lotes: O sistema atual não controla a data de validade dos produtos nem os lotes, o que pode levar a perdas e desperdícios.

2. Venda de Produtos:
Processo Atual:
- Atendimento ao Cliente: Quando um cliente chega ao pet shop, um funcionário o recebe e pergunta sobre o produto desejado.
- Consulta de Disponibilidade: O funcionário verifica manualmente no estoque físico ou no sistema básico de gestão se o produto está disponível.
- Informação ao Cliente: Caso o produto esteja disponível, o funcionário informa o preço e as condições de pagamento ao cliente. Se não estiver, informa que não há estoque.
- Registro da Venda: Após a confirmação do cliente, o funcionário registra manualmente a venda no excel.
- Pagamento: O cliente realiza o pagamento no caixa, onde outro funcionário emite o recibo.
- Entrega do Produto: O funcionário separa o produto vendido e o entrega ao cliente, registrando o estoque no papel e depois passa para a planilha.


**Processo 1 - Cadastro de Produto**
![AS IS e TO BE - Cadastro de Produto - AS IS Processo 1 (Cadastrar Produtos)](https://github.com/user-attachments/assets/4032106d-e349-4d8b-b1c3-60cdcdb86d2f)

**Processo 2 - Venda de Produto**
![AS IS - Venda de Produto - AS IS Processo 2 (Vender Produtos)](images/as_is_venda.jpg)


## Descrição geral da proposta (Modelagem TO BE)

Através da  análise dos processos AS-IS (Venda de Produtos e Cadastro de Produtos), foram identificados alguns gargalos: dependência de processos manuais, falhas na comunicação e registros paralelos em planilhas. Utilizando modelo TO BE é esperado automatizar estes processos, possibilitando a integração e oferecendo o controle centralizado da administração do petshop, otimizando as operações e promovendo melhor experiência tanto para os clientes quanto para os colaboradores da empresa.


**Processo 1 - Cadastro de Produto**
![AS IS e TO BE - Cadastro de Produto (1)](https://github.com/user-attachments/assets/3a394931-dfa7-4fe0-8502-0d74815dc702)




**Processo 2 - Venda de Produto**
![AS IS e TO BE - Venda de Produto - TO BE Processo 2 (Vender Produtos) (1)](https://github.com/user-attachments/assets/5f75506b-0ed3-49ee-b524-52c16f2f8a16)


[AS IS e TO BE - Venda de Produto.pdf](https://github.com/user-attachments/files/19694499/AS.IS.e.TO.BE.-.Venda.de.Produto.pdf)

**Oportunidades de melhoria de cada processo da solução proposta**
**Venda de Produtos:**
- Substituição do controle manual por sistema informatizado
  - Eliminação do uso de planilhas Excel para registro de vendas.
  - Implantação de um sistema de gestão de estoque que permite maior precisão, agilidade e segurança das informações.
- Criação de uma Lista de Desejos para produtos não disponíveis
  - Possibilidade de registrar a demanda de clientes por produtos que não estão disponíveis no momento.
  - Suporte à tomada de decisão do gerente na aquisição de novos produtos com base em dados reais de interesse dos clientes.
- Implementação de Lista de Notificação para produtos sem estoque
  - Caso o produto esteja cadastrado no sistema, mas indisponível no estoque, o cliente poderá se inscrever para ser notificado quando o item estiver disponível.
  - Melhoria na experiência do cliente, com aumento das chances de fidelização.
  - Redução da perda de vendas por indisponibilidade temporária de estoque.
- Maior controle e visibilidade do estoque em tempo real
  - Redução de erros manuais e falhas no controle de inventário.
  - Aumento da eficiência na reposição de produtos.
- Apoio à tomada de decisão estratégica
  - Geração de relatórios e históricos de vendas para melhor planejamento de compras.
  - Monitoramento da demanda de produtos com base nos registros da lista de desejos e notificações. 
**Cadastro de Produtos:**
- Envio da nota fiscal (XML) pelo fornecedor antes da entrega, permitindo conferência prévia dos dados e facilitando a conferência da mercadoria.
- Atualização automática do estoque, uma vez que os produtos foram cadastrados. 
- Registro automatizados de pedidos negados ou com problemas, reduzindo retrabalho e garantindo rastreabilidade.

**Limites da solução de Cadastro de Produtos:**
- A solução depende da adesão dos fornecedores ao envio eletrônico da NF-e (XML).
- Atualização automática do estoque, uma vez que os produtos foram cadastrados. 

**Alinhamento com Estratégias e Objetivos do Negócio**
- Agilidade e precisão nos processos logísticos, reduzindo o tempo de cadastro e processamento de mercadorias. 
- Melhoria no controle de estoque, contribuindo diretamente nas reposições e redução de perdas.
- Aprimoramento da comunicação entre equipe e fornecedores, acelerando a resolução de falhas. 



## Modelagem dos processos

[Processo 1 – Cadastro de Produtos no Sistema](https://github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-6/blob/main/docs/processes/processo-1-Cadastro_de_produtos_no_sistema.md)

[Processo 2 – Venda de Produtos no Sistema](https://github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-6/blob/main/docs/processes/processo-2-Venda_de_produtos.md)


## Indicadores de desempenho

Apresente aqui os principais indicadores de desempenho e algumas metas para o processo. Atenção: as informações necessárias para gerar os indicadores devem estar contempladas no diagrama de classe. Coloque no mínimo 5 indicadores.

Use o seguinte modelo:
**Processo 1 - Cadastro de Produto**
| **Indicador**                              | **Objetivo**                                                       | **Descrição**                                                                                   | **Fonte de Dados (Módulo ERP)**                     | **Fórmula de Cálculo**                                                   |
|--------------------------------------------|---------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|----------------------------------------------------|-------------------------------------------------------------------------|
| Nível de satisfação do funcionário com o processo  | Avaliar a usabilidade e fluidez do sistema                     | Baseado em feedbacks e pesquisas com a equipe de cadastro                                            | Pesquisa interna                      |Média das notas atribuídas (escala de 1 a 5)              |
| Taxa de Atendimento de Requisições Internas| Medir a eficiência na resposta a solicitações entre setores        | Percentual de requisições internas concluídas                                                   | `Requisições`, `Usuários`, `Setores`               | `(nº de requisições atendidas / total de requisições) * 100`          |
| Tempo Médio de Reposição de Estoque        | Reduzir rupturas e melhorar a logística de reposição               | Tempo médio entre a falta e a reposição de um item no estoque                                   | `Estoque`, `Pedidos`, `Produtos`                   | `soma dos tempos de reposição / nº de produtos repostos`              |
| Conversão da Lista de Desejos              | Avaliar o potencial de vendas de produtos desejados                | Percentual de desejos que resultaram em vendas após disponibilidade do produto                 | `ListaDesejos`, `Produtos`, `Clientes`, `Vendas`   | `(nº de desejos comprados / nº total de desejos) * 100`               |
| Conversão da Notificação de Produto        | Medir a eficiência das notificações de disponibilidade em vendas   | Percentual de notificações de produto que geraram vendas                                        | `Notificações`, `Estoque`, `Vendas`                | `(nº de vendas após notificação / nº total de notificações enviadas) * 100` |




**Processo 2 - Venda de Produto**
| **Indicador**                              | **Objetivo**                                                       | **Descrição**                                                                                   | **Fonte de Dados (Módulo ERP)**                     | **Fórmula de Cálculo**                                                   |
|--------------------------------------------|---------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|----------------------------------------------------|-------------------------------------------------------------------------|
| Percentual de Reclamações por Atendimento  | Avaliar a qualidade do atendimento ao cliente                      | Proporção de atendimentos que geraram reclamações                                               | `Atendimentos`, `Reclamações`                      | `(nº de reclamações / nº total de atendimentos) * 100`                 |
| Taxa de Atendimento de Requisições Internas| Medir a eficiência na resposta a solicitações entre setores        | Percentual de requisições internas concluídas                                                   | `Requisições`, `Usuários`, `Setores`               | `(nº de requisições atendidas / total de requisições) * 100`          |
| Tempo Médio de Reposição de Estoque        | Reduzir rupturas e melhorar a logística de reposição               | Tempo médio entre a falta e a reposição de um item no estoque                                   | `Estoque`, `Pedidos`, `Produtos`                   | `soma dos tempos de reposição / nº de produtos repostos`              |
| Conversão da Lista de Desejos              | Avaliar o potencial de vendas de produtos desejados                | Percentual de desejos que resultaram em vendas após disponibilidade do produto                 | `ListaDesejos`, `Produtos`, `Clientes`, `Vendas`   | `(nº de desejos comprados / nº total de desejos) * 100`               |
| Conversão da Notificação de Produto        | Medir a eficiência das notificações de disponibilidade em vendas   | Percentual de notificações de produto que geraram vendas                                        | `Notificações`, `Estoque`, `Vendas`                | `(nº de vendas após notificação / nº total de notificações enviadas) * 100` |




