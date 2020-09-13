const router = require("express").Router();
const ConductorController = require("../../controllers/conductor_controller");
const conductor = new ConductorController();

router.get("/cargarConductores", conductor.getConductores.bind(conductor));

router.get("/buscarConductor/:id", conductor.findConductor.bind(conductor));

module.exports = router;
