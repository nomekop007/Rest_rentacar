const router = require("express").Router();
const ActaEntregaController = require("../../controllers/actaEntrega_controller");
const actaEntrega = new ActaEntregaController();

router.post("/generarPDFactaEntrega", actaEntrega.generatePDFactaEntrega.bind(actaEntrega));

module.exports = router;