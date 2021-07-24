const travels = require("../models/travels.json");
const passengers = require("../models/passengers.json");
const utils = require("../utils/travelsUtils");

const fs = require("fs");

const welcome = (req, res) => {
    res.status(200).send({
        "message": "Bem-vinda(o) aos seus itinetários!"
    })
}
const getAllTravels = (req, res) => {
    res.status(200).send(travels);
};

const getTravelById = (req, res) => {
    // trazer o id vindo da requisição
    let idRequerido = req.params.id;

    // encontrar o item da lista que possui o mesmo id que foi solicitado
    let filteredTravel = utils.findById(travels, idRequerido);

    // enviar o item como resposta
    res.status(200).send(filteredTravel);
};

// adicionar um novo passageiro à uma viagem recebendo da requisão nome, email e numero do documento

const createPerson = (req, res) => {
    // trazer o dados da requisição
    let { name, email, documentNumber } = req.body;

    let newPerson = {
        id: Math.random().toString(32).substr(2),
        name,
        email,
        documentNumber
    };

    // id da viagem que chega através do path params
    let travelRequiredId = req.params.id;

    //verificar o id de cada item da lista de viagens para achar aquele que é igual ao id requerido
    let travelRequired = utils.findById(travels, travelRequiredId);

    travels.forEach((travel) => {
        let sameTravel = travel === travelRequired;

        if (sameTravel) {
            travel.passengersInfos.push(newPerson);
        };
    });

    // usar módulo fs para escrever as alterações no nosso arquivo

    fs.writeFile("./src/models/travels.json", JSON.stringify(travels), 'utf8', function(err) {
        if (err) {
            res.status(500).send({
                "message": err
            })
        } else {
            // enviar a resposta pro postman
            res.status(201).send({ "message": "Passageiro adicionado à viagem com sucesso", travelRequired });
        };
    });
};

// deletar um passageiro do SISTEMA (o registro dele continua nas informações da viagem)
const deletePerson = (req, res) => {
    // id requerido 
    const requestId = req.params.id;

    // achar o item da lista que corresponde ao id requerido
    const filteredPerson = utils.findById(passengers, requestId);
    console.log(filteredPerson);

    const index = passengers.indexOf(filteredPerson);

    if (index >= 0) {
        passengers.splice(index, 1);

        fs.writeFile("./scr/models/passengers.json", JSON.stringify(passengers), "utf8", (err) => {
            if (err) {
                res.status(500).send({
                    "message": err
                })
            } else {
                res.status(200).send({
                    "message": "Passageiro excluído com sucesso",
                    passengers
                })
            };
        });
    };
};

const updatePerson = (req, res) => {
    // trazer id do passageiro
    const requiredId = req.params.id;
    // trazer dados da atualização
    const {name, email, documentNumber} = req.body;
    // filtrar para achar o passageiro
    let filteredPassenger = utils.findById(passengers, requiredId);
    // criar novo objeto do passageiro
    const updatedPassenger = {
        id: requiredId,
        name,
        email,
        documentNumber,
        travelId: filteredPassenger.travelId
    }

    // achar o index do passageiro
    const index = passengers.index(filteredPassenger);

    // verificar se o index existe, se existir, usar o método splice para substituição
    if (index >=0) {
        passengers.splice(index, 1, updatedPassenger)
        fs.writeFile("./src/models/passengers.json", JSON.stringify(passengers), "utf8", (err) => {
            if (err) {
                res.status(500).send({
                    "message": err
                })
            } else {
                res.status(200).send({
                    "message": "Passageirp atualizado com sucesso",
                    filteredPassenger
                })
            }
        })}
    
}

const createDriver = (req, res) => {
    let {name, license} = req.body;

    let newDriver = {
        id: Math.random().toString(32).substr(2),
        name,
        license
    };
    let travelRequiredId = req.params.id
    let travelRequired = utils.findById(travels, travelRequiredId);

    travels.forEach((travel) => {
        let sameTravel = travel == travelRequired;

        if (sameTravel) {
            travel.driverInfos.push(newDriver)
        };
    });

    fs.writeFile("./src/models/travels.json", JSON.stringify(travels), 'utf8', function(err) {
        if (err) {
            res.status(500).send({
                "message": err
            })
        } else {
            // enviar a resposta pro postman
            res.status(201).send({ "message": "Motorista adicionado à viagem com sucesso", travelRequired });
        };
    });
};

const updateDriverInfos = (req, res) => {
    let requestIdDriver = req.params.id;
    let filteredIdDrive = utils.findById(travels, requestIdDriver)
    let indice = travels.indexOf(filteredIdDrive);  
    let {name, license} = req.body
    
    let updateDriver = {id: requestIdDriver,
            name, 
            license 
        };
    
       if(indice >= 0){
        travels.forEach((conteudo) => {
            let sameTravel = conteudo === filteredIdDrive;
            if (sameTravel){
                conteudo.driverInfos = updateDriver;
            }
        });

        fs.writeFile("./src/models/travels.json", JSON.stringify(travels), 'utf8', function (err){

        if(err){
            res.status(500).send({
                "message": err
             })
        }else{
            res.status(200).send({"mensagem": "Informação atualizada com sucesso", filteredIdDrive})
    
            }
    
        });
    
    
     };
};

const deleteTravel = (req, res) => {
    const requestId = req.params.id;
    const filteredTravel = utils.findById(travels, requestId);
    console.log(filteredTravel);

    const index = travels.indexOf(filteredTravel);

    if (index >= 0) {
        travels.splice(index, 1);

        fs.writeFile("./scr/models/travels.json", JSON.stringify(travels), "utf8", (err) => {
            if (err) {
                res.status(500).send({
                    "message": err
                })
            } else {
                res.status(200).send({
                    "message": "Viagem excluída com sucesso",
                    travels
                })
            };
        });
    };
};





module.exports = {
    welcome,
    getAllTravels,
    getTravelById,
    createPerson,
    deletePerson,
    updatePerson,
    createDriver,
    updateDriverInfos,
    deleteTravel
}