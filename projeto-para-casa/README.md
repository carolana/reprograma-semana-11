### On12 API-CRUD | Projeto Guiado

Essa semana fizemos nosso Projeto Guiado: Uma api que permite você observar diferentes viagens de ônibus, controlando informações sobre o motorista e passageiros!

![gif "a bus"](img/giphy000.gif)

## Instruções

- {GET}/: Uma breve apresentação do nosso projeto

#### Viagens

- {GET}/travels: Retornará todas as viagens disponíveis
- {GET}/travels/id: Retornará a viagem correspondente àquele ID
- {DELETE}/travels/id: Aqui você pode excluir uma viagem

#### Passageiros

- {POST}/travels/id/passenger/create: Aqui, você poderá cadastrar um passageiro passando o seguinte parâmetro:

       {
           "name": "XXX",
           "email": "xxx@xxx.com",
           "documentNumber": "xxx"
       }

- E sua resposta será dada no formato jSON da seguinte forma:

        {
            "id": XXXXX,
            "name": "XXX",
            "email": xxx@xxx.com,
            "documentNumber": "xxx"
        }


- {PUT}/passenger/id/create: Onde você poderá atualizar um passageiro

- {DELETE}/passenger/id/delete: Aqui você pode excluir um passageiro

#### Motorista

- {POST}/travels/id/driver/create: Para criar um motorista, passe o seguinte parâmetro:

       {
           "name": "XXX",
           "license": "XXXX-XXXX",
       }

- E sua resposta será dada no formato jSON da seguinte forma:

        {
            "id": XXXXX,
            "name": "XXX",
            "license": "XXX-XXXX",
        }


E, aí, pronta(o) para essa viagem?

![gif "Dwight driving a bus"](img/giphy-downsized.gif)
