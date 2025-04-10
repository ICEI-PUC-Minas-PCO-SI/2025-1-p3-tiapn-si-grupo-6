### 3.3.2 Processo 2 – NOME DO PROCESSO
 
**Automatização do Registro**: Substituir o registro manual em Excel por um sistema integrado para reduzir erros e aumentar a eficiência.
**Automatização da Consulta de Disponibilidade**: Implementar integração em tempo real com o sistema de estoque para evitar verificações manuais. 
Adicionar opção de "notificação automática" quando o produto estiver disponível, eliminando a necessidade de o cliente retornar para consultar.
**Comunicação Proativa com o Cliente**: Permitir que o cliente escolha preferências de notificação (ex: WhatsApp, e-mail) durante a solicitação.
**Decisão Simplificada para Produto Indisponível**: Permitir que o cliente adicione o produto à lista de desejos caso ele não esteja disponível no estoque.

#### Detalhamento das atividades

**Atividade 1: Solicitar Produto**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Código do Cliente | Número  |    Obrigatório            |                   |
| Nome do Cliente | Caixa de Texto  |    Obrigatório            |                  |
| Código do Produto | Número  |    Obrigatório            |   Mín. 1              |
| Quantidade | Número  |    Obrigatório            |   Mín. 1              |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Avançar | Consultar Disponibilidade  | default |
|  Cancelar      |   Fim do Processo (Cancelamento)       |     cancel              |

**Atividade 2: Consultar Disponibilidade**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Código do Produto | Número   | Obrigatório |                |
| Resultado Consulta   | Seleção Única   | "Disponível"/"Indisponível" (automático) |           |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Avançar               | Informar Dados do Produto (se "Sim")              | default           |
| Notificar            | Registrar Interesse (se "Não")  |  cancel                 |



