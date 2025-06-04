
# Metodologia


A equipe adotou uma abordagem baseada nos princípios do Scrum, utilizando ferramentas e práticas modernas para garantir organização, controle e rastreabilidade do desenvolvimento.

## Controle de versão

A ferramenta de controle de versão adotada no projeto foi o [Git](https://git-scm.com/), sendo que o [GitHub](https://github.com) foi utilizado para hospedagem do repositório.

O projeto segue a seguinte convenção para o nome de branches:

- `main`: versão estável já testada do software
- `unstable`: versão já testada do software, porém instável
- `testing`: versão em testes do software
- `dev`: versão de desenvolvimento do software

Quanto à gerência de issues, o projeto adota a seguinte convenção para etiquetas:

- `documentation`: melhorias ou acréscimos à documentação
- `bug`: uma funcionalidade encontra-se com problemas
- `enhancement`: uma funcionalidade precisa ser melhorada
- `feature`: uma nova funcionalidade precisa ser introduzida

A equipe estruturou o repositório utilizando a seguinte divisão de branches: main (representando a versão estável em produção), doc (reservada exclusivamente para alterações na documentação) e develop (utilizada para o desenvolvimento ativo do sistema). Para cada issue relacionada a uma nova funcionalidade, foi criada uma branch específica, com nome associado à tarefa ou funcionalidade. Além disso, foi definido que, a cada nova entrega ou versão do sistema, uma nova branch de desenvolvimento será criada, como develop_v2, develop_v3, e assim por diante, garantindo melhor controle de versões e isolamento entre as etapas do projeto.
## Planejamento do projeto

###  Divisão de papéis
<<<<<<< HEAD

[docs/images/GitHubProjects.png](https://github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-6/blob/main/docs/images/GitHubProjects.png)
=======
<p align="center">
  <img src="images/GitHubProjects.png" alt="GitHubProjects" width="800px"> <br/>
    <strong>Figura:</strong> Imagem do GitHub Projects
</p>
>>>>>>> eb236b3ede58f8be6526ba538dd45d11343d53cf

#### Sprint 1
- _Scrum master_: Wanessa Cristina
- Documentação: Alice Machado, Eduarda Silva, Gabriel Lucas, Maria Clara, Miriam Cristina, Wanessa Cristina

#### Sprint 2
- _Scrum master_: Míriam Cristina
- Documentação: Alice Machado, Eduarda Silva, Gabriel Lucas, Maria Clara, Miriam Cristina, Wanessa Cristina
- Desenvolvedor _Modelagem_ASIS: Alice Machado e Gabriel Alves
- Desenvolvedor _Modelagem_TOBE: Maria Clara e Wanessa Cristina
- Diferencial,gargalos e monetização: Eduarda Silva e Miriam Cristina

#### Sprint 3
- _Scrum master_: Alice Machado
- _Engenheiro(a) de Software_:  Gabriel Lucas, Miriam Cristina
- _Analista de Sistemas / Modelador(a) de Dados_: Alice Machado, Maria Clara
- _UX Designer_: Wanessa Cristina
- _Arquiteto(a) de Soluções_: Eduarda Silva, Gabriel Lucas
- _UI Designer_: Alice Machado,Eduarda Silva, Gabriel Lucas, Maria Clara, Miriam Cristina, Wanessa Cristina

#### Sprint 4
- _Scrum master_: Gabriel Lucas
- _Desenvolvedor Full Stack_: Alice Machado, Eduarda Silva, Gabriel Lucas, Maria Clara, Miriam Cristina, Wanessa Cristina

###  Quadro de tarefas



#### Sprint 1

Atualizado em: 13/03/2025

| Responsável   | Tarefa/Requisito                          | Iniciado em    | Prazo      | Status | Terminado em     |
| :----         |    :----                                  |      :----:    | :----:     | :----: | :----:           |
| Alice         | Histórias de usuário e Personas           | 28/02/2024     | 13/03/2025 |  ✔️   | 13/03/2025        |
| Eduarda       | Requisitos não funcionais e Restrições    | 28/02/2024     | 13/03/2025 |  ✔️   |  13/03/2025      |
| Gabriel       | Documentação de Contexto                  | 28/02/2024     | 13/03/2025 |  ✔️   |  08/03/2025      |
| Miriam        | Requisitos não funcionais e Restrições    | 28/02/2024     | 13/03/2025 | ✔️    |  13/03/2025      |
| Maria Clara   | Requisitos funcionais e Diagrama de CSU   | 28/02/2024     | 13/03/2025 | ✔️    |   13/03/2025     |
| Wanessa       | Requisitos funcionais e Diagrama de CSU   | 28/02/2024     | 13/03/2025 | ✔️    |   13/03/2025     |


#### Sprint 2

Atualizado em: 10/04/2025

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Alice Machado       | Modelagem AS IS  | 26/03/2025     | 10/04/2025 | ✔️    | 05/04/2025      |
| Eduarda        | Diferencial, gargalos e monetização, indicadores de desempenho  | 08/04/2025     | 10/04/2025   |  ✔️  | 08/04/2025 |   |                 |
| Eduarda        | Indicadores de desempenho  | 10/04/2025     | 10/04/2025   |  ✔️  | 10/04/2025 |   |     
| Gabriel       | Modelagem AS IS | 27/03/2025     |10/04/2025 | ✔️     |     05/04/2025            | 
| Maria Clara   | Modelagem TO BE   | 02/04/2025     | 10/04/2025 | ✔️    |   05/04/2025     |
| Miriam        | Diferencial, gargalos e monetização, indicadores de desempenho |  10/04/2025    |  10/04/2025  | ✔️    |   10/04/2025      |
| Miriam         | Indicadores de desempenho  | 10/04/2025     | 10/04/2025   |  ✔️  | 10/04/2025 |   | 
| Wanessa       | Modelagem TO BE  | 02/04/2025     | 10/04/2025 | ✔️    |   03/04/2025     |

#### Sprint 3

Atualizado em: 04/06/2025

| Responsável         | Tarefa/Requisito                  | Iniciado em    | Prazo      | Status  | Terminado em    |
| :----               |    :----                          |      :----:    | :----:     | :----:  | :----:          |
| Alice Machado       | Modelo Logico                     | 26/04/2025     | 08/05/2025 | ✔️     | 08/05/2025       | 
| Alice Machado       | Tela XML Figma                    | 26/04/2025     | 08/05/2025 | ✔️     | 08/05/2025       |
| Alice Machado       | Tela Produto Figma                | 26/04/2025     | 08/05/2025 | ✔️     | 08/05/2025       |
| Alice Machado       | Landing Page Figma                | 26/04/2025     | 08/05/2025 | ✔️     | 08/05/2025       |
| Eduarda Silva       | Tela Registro Vendas Figma        | 26/04/2025     | 08/05/2025 | ✔️     | 08/05/2025       | 
| Eduarda Silva       | Tela Login Figma                  | 26/04/2025     | 08/05/2025 | ✔️     | 08/05/2025       | 
| Eduarda Silva       | Tecnologias Utilizadas            | 26/04/2025     | 08/05/2025 | ✔️     | 08/05/2025       | 
| Eduarda Silva       | Apresentação                      | 26/04/2025     | 08/05/2025 | ✔️     | 08/05/2025       | 
| Gabriel Lucas       | Tela Relatório Figma              | 26/04/2025     | 08/05/2025 | ✔️     | 08/05/2025       |
| Gabriel Lucas       | Tela Usuarios Figma               | 26/04/2025     | 08/05/2025 | ✔️     | 08/05/2025       |
| Gabriel Lucas       | Arquitetura da Solução            | 26/04/2025     | 08/05/2025 | ✔️     | 05/05/2025       |
| Maria Clara         | Modelo Conceitual                 | 26/04/2025     | 08/05/2025 | ✔️     | 08/05/2025       |
| Maria Clara         | Tela Inicial Figma                | 26/04/2025     | 08/05/2025 | ✔️     | 08/05/2025       |
| Maria Clara         | Consultar Estoque Figma           | 26/04/2025     | 08/05/2025 | ✔️     | 08/05/2025       |
| Miriam Cristina     | Tela Clientes Figma               | 26/04/2025     | 08/05/2025 | ✔️     | 08/05/2025       |
| Miriam Cristina     | Diagrama de Classes               | 26/04/2025     | 08/05/2025 | ✔️     | 08/05/2025       |
| Wanessa Cristina    | Tela Fornecedores Figma           | 26/04/2025     | 08/05/2025 | ✔️     | 08/05/2025       |
| Wanessa Cristina    | Tela Montar Pedido Compra Figma   | 26/04/2025     | 10/04/2025 | ✔️     | 08/05/2025       |
| Wanessa Cristina    | Qualidade                         | 26/04/2025     | 10/04/2025 | ✔️     | 08/05/2025       |

#### Sprint 3

Atualizado em: 04/06/2025
| Responsável         | Tarefa/Requisito                | Iniciado em    | Prazo      | Status  | Terminado em     |
| :----               |    :----                        |      :----:    | :----:     | :----:  | :----:           |
| Alice Machado       | Crud Produto (Front/Backend)    | 21/05/2025     | 05/06/2025 | ✔️     | 04/06/2025       | 
| Eduarda Silva       | Login                           | 10/05/2025     | 05/06/2025 | ✔️     | 04/06/2025       | 
| Eduarda Silva       | Apresentação                    | 26/04/2025     | 05/06/2025 | 📝     |                  | 
| Gabriel Lucas       | Crud Usuario (Front/Backend)    | 15/05/2025     | 05/06/2025 | ✔️     | 17/05/2025       |
| Gabriel Lucas       | Configuração Projeto            | 11/05/2025     | 05/06/2025 | ✔️     | 11/05/2025       |
| Maria Clara         | Crud Categoria(Front/Backend)   | 21/05/2025     | 05/06/2025 | 📝     |                  |
| Miriam Cristina     | Crud Cliente (Front/Backend)    | 20/04/2025     | 05/06/2025 | 📝     |                  |
| Wanessa Cristina    | Crud Fornecedor(Front/Backend)  | 21/04/2025     | 05/06/2025 | 📝     | 08/05/2025       |

Legenda:
- ✔️: terminado
- 📝: em execução
- ⌛: atrasado
- ❌: não iniciado



### Processo

A equipe utilizou o GitHub Projects como principal recurso para o acompanhamento do progresso das tarefas e para a organização visual das demandas do projeto.
Cada tarefa foi registrada como uma issue no repositório GitHub, vinculada ao quadro do projeto e associada à respectiva sprint. Com isso, foi possível aplicar práticas do manifesto ágil e registrar o progresso da construção do sistema.

## Relação de ambientes de trabalho

Os artefatos do projeto são desenvolvidos a partir de diversas plataformas. Todos os ambientes e frameworks utilizados no desenvolvimento da aplicação estão listados na seção abaixo.

### Ferramentas

| Ambiente                            | Plataforma                         | Link de acesso                         |
|-------------------------------------|------------------------------------|----------------------------------------|
| Repositório de código fonte         | GitHub                             | [http://....     ](https://github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-6/tree/main/src)                       |
| Documentos do projeto               | GitHub                             | [http://....    ](https://github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-6/tree/main/docs)                        |
| Modelagem                         | Miro                             |[ http://....  ](https://miro.com/welcome/WUlQZFg5OUZRWFc4RHVZZTA4ZE5BUkpsaTEvWlpTVWVhaGlGMkxDLytYN3orTFZHRXJOSkhYRFVTRTNTblByWTN0cWhyd2RuRTl6WFh4OUg3a29hbHQ2c0lpb0wybDU1Z0M1OHh6dTBySXdoSVcvdkFvQThDdjFXSGw3UUFxTnpzVXVvMm53MW9OWFg5bkJoVXZxdFhRPT0hdjE=?share_link_id=536145299240)                          |
| Projeto de interface                | Figma                              | [http://....      ](https://www.figma.com/design/ETIC16yTETDizManQhXTUP/ERPET---Telas-do-Sistema?node-id=0-1&p=f&t=06MSeQlT7Ra9PSvy-0)                      |
| Gerenciamento do projeto            | GitHub Projects                    | http://....                            |
| Hospedagem                          | Vercel                             | http://....                            |

# Metodologia

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>

A equipe adotou uma abordagem baseada nos princípios do Scrum, utilizando ferramentas e práticas modernas para garantir organização, controle e rastreabilidade do desenvolvimento.

## Controle de versão

A ferramenta de controle de versão adotada no projeto foi o [Git](https://git-scm.com/), sendo que o [GitHub](https://github.com) foi utilizado para hospedagem do repositório.

O projeto segue a seguinte convenção para o nome de branches:

- `main`: versão estável já testada do software
- `unstable`: versão já testada do software, porém instável
- `testing`: versão em testes do software
- `dev`: versão de desenvolvimento do software

Quanto à gerência de issues, o projeto adota a seguinte convenção para etiquetas:

- `documentation`: melhorias ou acréscimos à documentação
- `bug`: uma funcionalidade encontra-se com problemas
- `enhancement`: uma funcionalidade precisa ser melhorada
- `feature`: uma nova funcionalidade precisa ser introduzida

A equipe estruturou o repositório utilizando a seguinte divisão de branches: main (representando a versão estável em produção), doc (reservada exclusivamente para alterações na documentação) e develop (utilizada para o desenvolvimento ativo do sistema). Para cada issue relacionada a uma nova funcionalidade, foi criada uma branch específica, com nome associado à tarefa ou funcionalidade. Além disso, foi definido que, a cada nova entrega ou versão do sistema, uma nova branch de desenvolvimento será criada, como develop_v2, develop_v3, e assim por diante, garantindo melhor controle de versões e isolamento entre as etapas do projeto.
## Planejamento do projeto

###  Divisão de papéis

[docs/images/GitHubProjects.png](https://github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-6/blob/main/docs/images/GitHubProjects.png)

#### Sprint 1
- _Scrum master_: Wanessa Cristina
- Documentação: Alice Machado, Eduarda Silva, Gabriel Lucas, Maria Clara, Miriam Cristina, Wanessa Cristina

#### Sprint 2
- _Scrum master_: Míriam Cristina 
- Desenvolvedor _Modelagem_ASIS: Alice Machado e Gabriel Alves
- Desenvolvedor _Modelagem_TOBE: Maria Clara e Wanessa Cristina
- Diferencial,gargalos e monetização: Eduarda Nunis e Miriam Cristina
#### Sprint 3
- _Scrum master_: Alice Machado
- _Diagrama de classes_:  Gabriel Lucas, Miriam Cristina
- _Diagrama conceitual e Modelo Logico_: Alice Machado, Maria Clara
- _User Flow_: Wanessa Cristina
- _Arquitetura da solução_: Eduarda Nuniz, Gabriel Lucas

#### Sprint 4
- _Scrum master_: Gabriel Lucas
- _Desenvolvedor Full Stack_: Alice Machado, Eduarda Nuniz, Gabriel Lucas, Maria Clara, Miriam Cristina, Wanessa Cristina

###  Quadro de tarefas



#### Sprint 1

Atualizado em: 13/03/2025

| Responsável   | Tarefa/Requisito                          | Iniciado em    | Prazo      | Status | Terminado em     |
| :----         |    :----                                  |      :----:    | :----:     | :----: | :----:           |
| Alice         | Histórias de usuário e Personas           | 28/02/2024     | 13/03/2025 |  ✔️   | 13/03/2025        |
| Eduarda       | Requisitos não funcionais e Restrições    | 28/02/2024     | 13/03/2025 |  ✔️   |  13/03/2025      |
| Gabriel       | Documentação de Contexto                  | 28/02/2024     | 13/03/2025 |  ✔️   |  08/03/2025      |
| Miriam        | Requisitos não funcionais e Restrições    | 28/02/2024     | 13/03/2025 | ✔️    |  13/03/2025      |
| Maria Clara   | Requisitos funcionais e Diagrama de CSU   | 28/02/2024     | 13/03/2025 | ✔️    |   13/03/2025     |
| Wanessa       | Requisitos funcionais e Diagrama de CSU   | 28/02/2024     | 13/03/2025 | ✔️    |   13/03/2025     |


#### Sprint 2

Atualizado em: 10/04/2025

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Alice Machado       | Modelagem AS IS  | 26/03/2025     | 10/04/2025 | ✔️    | 05/04/2025      |
| Eduarda        | Diferencial, gargalos e monetização, indicadores de desempenho  | 08/04/2025     | 10/04/2025   |  ✔️  | 08/04/2025 |   |                 |
| Eduarda        | Indicadores de desempenho  | 10/04/2025     | 10/04/2025   |  ✔️  | 10/04/2025 |   |     
| Gabriel       | Modelagem AS IS | 27/03/2025     |10/04/2025 | ✔️     |     05/04/2025            | 
| Maria Clara   | Modelagem TO BE   | 02/04/2025     | 10/04/2025 | ✔️    |   05/04/2025     |
| Miriam        | Diferencial, gargalos e monetização, indicadores de desempenho |  10/04/2025    |  10/04/2025  | ✔️    |   10/04/2025      |
| Miriam         | Indicadores de desempenho  | 10/04/2025     | 10/04/2025   |  ✔️  | 10/04/2025 |   | 
| Wanessa       | Modelagem TO BE  | 02/04/2025     | 10/04/2025 | ✔️    |   03/04/2025     |

#### Sprint 3

Atualizado em: 04/06/2025

| Responsável         | Tarefa/Requisito                  | Iniciado em    | Prazo      | Status  | Terminado em    |
| :----               |    :----                          |      :----:    | :----:     | :----:  | :----:          |
| Alice Machado       | Modelo Logico                     | 26/04/2025     | 08/05/2025 | ✔️     | 08/05/2025       | 
| Alice Machado       | Tela XML Figma                    | 26/04/2025     | 08/05/2025 | ✔️     | 08/05/2025       |
| Alice Machado       | Tela Produto Figma                | 26/04/2025     | 08/05/2025 | ✔️     | 08/05/2025       |
| Alice Machado       | Landing Page Figma                | 26/04/2025     | 08/05/2025 | ✔️     | 08/05/2025       |
| Eduarda Silva       | Tela Registro Vendas Figma        | 26/04/2025     | 08/05/2025 | ✔️     | 08/05/2025       | 
| Eduarda Silva       | Tela Login Figma                  | 26/04/2025     | 08/05/2025 | ✔️     | 08/05/2025       | 
| Eduarda Silva       | Tecnologias Utilizadas            | 26/04/2025     | 08/05/2025 | ✔️     | 08/05/2025       | 
| Eduarda Silva       | Apresentação                      | 26/04/2025     | 08/05/2025 | ✔️     | 08/05/2025       | 
| Gabriel Lucas       | Tela Relatório Figma              | 26/04/2025     | 08/05/2025 | ✔️     | 08/05/2025       |
| Gabriel Lucas       | Tela Usuarios Figma               | 26/04/2025     | 08/05/2025 | ✔️     | 08/05/2025       |
| Gabriel Lucas       | Arquitetura da Solução            | 26/04/2025     | 08/05/2025 | ✔️     | 05/05/2025       |
| Maria Clara         | Modelo Conceitual                 | 26/04/2025     | 08/05/2025 | ✔️     | 08/05/2025       |
| Maria Clara         | Tela Inicial Figma                | 26/04/2025     | 08/05/2025 | ✔️     | 08/05/2025       |
| Maria Clara         | Consultar Estoque Figma           | 26/04/2025     | 08/05/2025 | ✔️     | 08/05/2025       |
| Miriam Cristina     | Tela Clientes Figma               | 26/04/2025     | 08/05/2025 | ✔️     | 08/05/2025       |
| Miriam Cristina     | Diagrama de Classes               | 26/04/2025     | 08/05/2025 | ✔️     | 08/05/2025       |
| Wanessa Cristina    | Tela Fornecedores Figma           | 26/04/2025     | 08/05/2025 | ✔️     | 08/05/2025       |
| Wanessa Cristina    | Tela Montar Pedido Compra Figma   | 26/04/2025     | 10/04/2025 | ✔️     | 08/05/2025       |
| Wanessa Cristina    | Qualidade                         | 26/04/2025     | 10/04/2025 | ✔️     | 08/05/2025       |

#### Sprint 3

Atualizado em: 04/06/2025
| Responsável         | Tarefa/Requisito                | Iniciado em    | Prazo      | Status  | Terminado em     |
| :----               |    :----                        |      :----:    | :----:     | :----:  | :----:           |
| Alice Machado       | Crud Produto (Front/Backend)    | 21/05/2025     | 05/06/2025 | ✔️     | 04/06/2025       | 
| Eduarda Silva       | Login                           | 10/05/2025     | 05/06/2025 | ✔️     | 04/06/2025       | 
| Eduarda Silva       | Apresentação                    | 26/04/2025     | 05/06/2025 | 📝     |                  | 
| Gabriel Lucas       | Crud Usuario (Front/Backend)    | 15/05/2025     | 05/06/2025 | ✔️     | 17/05/2025       |
| Gabriel Lucas       | Configuração Projeto            | 11/05/2025     | 05/06/2025 | ✔️     | 11/05/2025       |
| Maria Clara         | Crud Categoria(Front/Backend)   | 21/05/2025     | 05/06/2025 | 📝     |                  |
| Miriam Cristina     | Crud Cliente (Front/Backend)    | 20/04/2025     | 05/06/2025 | 📝     |                  |
| Wanessa Cristina    | Crud Fornecedor(Front/Backend)  | 21/04/2025     | 05/06/2025 | 📝     | 08/05/2025       |

Legenda:
- ✔️: terminado
- 📝: em execução
- ⌛: atrasado
- ❌: não iniciado



### Processo

A equipe utilizou o GitHub Projects como principal recurso para o acompanhamento do progresso das tarefas e para a organização visual das demandas do projeto.
Cada tarefa foi registrada como uma issue no repositório GitHub, vinculada ao quadro do projeto e associada à respectiva sprint. Com isso, foi possível aplicar práticas do manifesto ágil e registrar o progresso da construção do sistema.

## Relação de ambientes de trabalho

Os artefatos do projeto são desenvolvidos a partir de diversas plataformas. Todos os ambientes e frameworks utilizados no desenvolvimento da aplicação estão listados na seção abaixo.

### Ferramentas

| Ambiente                            | Plataforma                         | Link de acesso                         |
|-------------------------------------|------------------------------------|----------------------------------------|
| Repositório de código fonte         | GitHub                             | [http://....     ](https://github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-6/tree/main/src)                       |
| Documentos do projeto               | GitHub                             | [http://....    ](https://github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-6/tree/main/docs)                        |
| Modelagem                         | Miro                             |[ http://....  ](https://miro.com/welcome/WUlQZFg5OUZRWFc4RHVZZTA4ZE5BUkpsaTEvWlpTVWVhaGlGMkxDLytYN3orTFZHRXJOSkhYRFVTRTNTblByWTN0cWhyd2RuRTl6WFh4OUg3a29hbHQ2c0lpb0wybDU1Z0M1OHh6dTBySXdoSVcvdkFvQThDdjFXSGw3UUFxTnpzVXVvMm53MW9OWFg5bkJoVXZxdFhRPT0hdjE=?share_link_id=536145299240)                          |
| Projeto de interface                | Figma                              | [http://....      ](https://www.figma.com/design/ETIC16yTETDizManQhXTUP/ERPET---Telas-do-Sistema?node-id=0-1&p=f&t=06MSeQlT7Ra9PSvy-0)                      |
| Gerenciamento do projeto            | GitHub Projects                    | [http://....        ](https://github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-6/projects?query=is%3Aopen)                    |
| Hospedagem                          | Vercel                             | http://....                            |
