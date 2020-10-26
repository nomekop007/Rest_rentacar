const router = require("express").Router();
const ActaEntregaController = require("../../controllers/actaEntrega_controller");
const actaEntrega = new ActaEntregaController();

router.post("/generarPDFactaEntrega", actaEntrega.generatePDFactaEntrega.bind(actaEntrega));

router.post("/registrarActaEntrega", actaEntrega.createActaEntrega.bind(actaEntrega));


module.exports = router;