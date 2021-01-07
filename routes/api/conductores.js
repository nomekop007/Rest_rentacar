const router = require("express").Router();
const ConductorController = require("../../controllers/conductor.controller");
const conductor = new ConductorController();

router.get("/cargarConductores", conductor.getConductores.bind(conductor));

router.get("/buscarConductor/:id", conductor.findConductor.bind(conductor));

router.post("/registrarConductor", conductor.createConductor.bind(conductor));

router.put("/editarConductor/:id", conductor.putConductor.bind(conductor));

module.exports = router;