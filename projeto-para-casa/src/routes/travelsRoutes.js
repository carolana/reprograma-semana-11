const express = require("express");
const router = express.Router();

const controller = require("../controllers/travelsControllers");

// viagens
router.get("/", controller.welcome);
router.get("/travels", controller.getAllTravels);
router.get("/travels/:id", controller.getTravelById);
router.delete("/travels/:id/delete", controller.deleteTravel)

// passageiros
router.post("/travels/:id/passenger/create", controller.createPerson);
router.put("/passenger/:id/update", controller.updatePerson)  
router.delete("/passenger/:id/delete", controller.deletePerson);

// motorista
router.post("/travels/:id/driver/create", controller.createDriver)
router.patch("/driver/:id/update", controller.updateDriverInfos)

module.exports = router;