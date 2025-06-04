
# Introdução

A indústria de varejo hoje anda enfrentando vários desafios na gestão de estoque e na eficiência operacional, especialmente em empresas que lidam com grandes quantidades de produto entrando e saindo todos os dias do estabelecimento. A falta de um controle eficiente das mercadorias pode gerar perda financeira, compras sem necessidade e o desperdício de mercadorias. Quando pensamos em lojas físicas, a atualização o estoque com uma venda ou um cadastro de um novo produto se torna um processo vagaroso gerando retrabalho. 

No caso específico de um pet shop, os funcionários enfrentam dificuldades para cadastrar novos produtos de forma ágil e precisa, uma vez que a loja recebe mercadorias diariamente. Além disso, a ausência de um sistema eficiente dificulta o acompanhamento em tempo real da disponibilidade de produtos, impactando diretamente a reposição e a organização do estoque. Outro problema enfrentado é a falta de acessibilidade das informações pelo gerente, que não consegue visualizar o status da loja de forma prática pelo celular/tablet, prejudicando a tomada de decisões rápidas. 

Diante desse cenário, este trabalho tem como objetivo o desenvolvimento de um software para automatizar o processo de cadastramento de produtos, gerenciar a agenda de horários de consultas com veterinários e tosa e a administração de funcionários pela parte do gerente, reduzindo o tempo gasto no registro e minimizando erros. Além disso, a aplicação permitirá o acesso remoto ao status do estoque, facilitando o monitoramento pelo gerente.

## Cliente - PexPetShop

A PexPetShop é uma empresa de pequeno porte localizada no bairro Tirol, Região Barreiro - BH, sua atuação é o setor pet, oferecendo uma combinação de loja, farmácia veterinária e atendimento clínico. Seu nicho de mercado inclui tutores de animais de estimação que buscam serviços de qualidade a preços acessíveis.

Desde sua fundação, a PexPetShop tem se destacado por seu compromisso com o bem-estar animal e a acessibilidade dos serviços veterinários, com sua equipe desenvolvendo um atendimento personalizado de acordo com a personalidade de cada paciente. A empresa também desenvolve ações de conscientização sobre cuidados com os pets e colabora com iniciativas locais de adoção responsável.

Com o objetivo de se tornar referencia no mercado pet pelo modelo de atendimento e equipe qualificada a PexPetShop enfrenta o desafio de expandir sua base de cliente, manter o equilíbrio entre qualidade e acessibilidade e possuir sempre mão de obra técnica treinada e qualificada.

## Problema

Com o crescimento do negócio, os funcionários passaram a enfrentar uma sobrecarga de tarefas, resultando em desorganização na gestão do pet shop. Nem todos os produtos são cadastrados corretamente, o que pode levar a inconsistências no controle de estoque e dificuldades na reposição. Além disso, o pet shop recebe diariamente uma grande quantidade de produtos dos fornecedores, e os funcionários não conseguem cadastrá-los com eficiência, o que aumenta ainda mais o descontrole e pode gerar perdas.

O agendamento de serviços como banhos, tosas e consultas veterinárias também se tornou um desafio, pois não há um sistema eficiente para gerenciar a disponibilidade dos profissionais, causando dificuldades no encaixe de horários.

Outro problema enfrentado é a ausência de um programa de fidelidade, o que dificulta a retenção de clientes e reduz as chances de retornos frequentes. Além disso, a falta de um controle adequado do estoque faz com que muitos produtos ultrapassem a data de validade, gerando desperdício e prejuízo para o negócio.

Também há uma dificuldade na supervisão do pet shop à distância. O gerente não consegue acessar facilmente o status da loja pelo celular, o que limita sua capacidade de acompanhar o fluxo de atendimentos, verificar o estoque e monitorar o desempenho geral do negócio em tempo real.

## Objetivos

**Objetivo Geral:** desenvolver um sistema para facilitar a gestão do pet shop, solucionando os problemas identificados, como desorganização no cadastro de produtos, dificuldades no agendamento de serviços, falta de um programa de fidelidade e a impossibilidade do gerente de acessar informações da loja remotamente.

**Objetivos específicos:**

* **Automatizar o controle de estoque:** Criar um sistema eficiente para o cadastro e gerenciamento de produtos, garantindo que todos os itens recebidos diariamente dos fornecedores sejam registrados corretamente e evitando perdas por validade vencida.
    
* **Facilitar o agendamento de serviços:** Implementar um módulo para organizar os horários de banhos, tosas e consultas veterinárias, levando em consideração a disponibilidade dos funcionários e otimizando o atendimento.
    
* **Desenvolver um programa de fidelidade:** Criar um sistema que incentive os clientes a retornarem ao pet shop, oferecendo benefícios baseados em compras e serviços utilizados.
    
* **Fornecer acesso remoto para o gerente:** Criar uma interface acessível via celular para que o gerente possa monitorar o status da loja em tempo real, acompanhando o fluxo de atendimentos, estoque e desempenho geral do negócio.
 
## Justificativa

O mercado pet brasileiro tem apresentado um crescimento significativo nos últimos anos. Em 2024, o setor movimentou cerca de R$ 77 bilhões, representando um aumento de aproximadamente 12% em relação a 2023, consolidando o Brasil como o terceiro maior mercado pet do mundo, atrás apenas dos Estados Unidos e da China. Apesar desse cenário promissor, muitos pet shops, especialmente de pequeno e médio porte, enfrentam desafios significativos na gestão de seus negócios. A ausência de sistemas modernos e integrados de gestão resulta em processos manuais e suscetíveis a erros, impactando diretamente na eficiência operacional e na satisfação do cliente. Um dos principais problemas enfrentados é a gestão inadequada de estoque. A falta de controle pode levar à ruptura de estoque, onde produtos essenciais não estão disponíveis quando necessário, ou ao acúmulo de itens com baixa rotatividade, resultando em perdas financeiras, especialmente quando produtos vencem antes de serem vendidos .

A escolha de desenvolver esse sistema se baseia na necessidade real de otimizar a gestão do pet shop, um nicho que cresceu significativamente nos últimos anos, mas que ainda enfrenta desafios na organização interna e no atendimento ao cliente. A falta de um sistema web e eficiente para o controle faz com que as Empresas do ramo pet fiquem presas em sistemas desktop antigos e ultrapassados, sem a possibilidade do acesso remoto e de diferentes plataformas, como: tablets, celular e notebooks.
Além disso, a ausência de um sistema eficiente para agendamento de serviços, como banhos, tosas e consultas veterinárias, pode causar conflitos de horários e insatisfação dos clientes. A implementação de um programa de fidelidade também se mostra essencial para a retenção de clientes em um mercado altamente competitivo.

A falta de acessibilidade às informações em tempo real é outro desafio. Gerentes e proprietários muitas vezes não conseguem monitorar o desempenho da loja remotamente, dificultando a tomada de decisões rápidas e informadas.

Diante desses desafios, o desenvolvimento de um sistema de gestão integrado e acessível, como o ERPet, é fundamental. A solução proposta visa automatizar processos, melhorar o controle de estoque, facilitar o agendamento de serviços, implementar programas de fidelidade e permitir o acesso remoto às informações da loja. Com isso, espera-se não apenas otimizar a operação do pet shop, mas também melhorar a experiência do cliente e aumentar a competitividade no mercado.
## Público-alvo

#### **1. Perfis de Usuários**

- **Gerente do Pet Shop**
    
    - Responsável pela supervisão geral da loja.
    - Normalmente possui experiência administrativa, e de sistemas de gerência pet e de funcionários, mas pode ter um conhecimento técnico limitado sobre tecnologia e podem enfrentar dificuldades com sistemas que possuem fluxos complexos.
    - Necessita de acesso rápido a informações de estoque, gerência de funcionários cadastrados, agendamentos e desempenho da loja, de preferência via mobile.
    - Pode ter dificuldade em monitorar a loja à distância devido à falta de uma solução digital integrada.
- **Funcionários da Loja**
    
    - Atuam no atendimento ao cliente e fornecedores, registro de produtos no estoque e organização dos serviços oferecidos.
    - Têm conhecimento técnico limitado sobre tecnologia e podem enfrentar dificuldades com sistemas que possuem fluxos complexos.
    - Precisam de um sistema ágil e simplificado para cadastrar produtos, consultar informações de estoque e gerenciar agendamentos sem que isso atrapalhe o fluxo de trabalho.
- **Veterinários e Tosadores**
    
    - Profissionais especializados que prestam serviços dentro do pet shop.
    - Possuem um nível de familiaridade variável com tecnologia, dependendo da formação e experiência.
    - Precisam visualizar rapidamente sua agenda de atendimentos e receber notificações sobre alterações nos horários.
- **Clientes do Pet Shop** (afetados indiretamente)
    
    - Podem não interagir diretamente com o sistema, mas serão beneficiados por uma experiência de atendimento mais organizada.
    - Devem ser impactados pelo programa de fidelidade, melhorando o engajamento e incentivando o retorno.


