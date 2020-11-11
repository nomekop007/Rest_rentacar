const router = require("express").Router();
const ActaEntregaController = require("../../controllers/actaEntrega_controller");
const actaEntrega = new ActaEntregaController();

router.post(
    "/registrarActaEntrega",
    actaEntrega.createActaEntrega.bind(actaEntrega)
);

router.post(
    "/generarPDFactaEntrega",
    actaEntrega.generatePDFactaEntrega.bind(actaEntrega)
);

router.post(
    "/enviarCorreoActaEntrega",
    actaEntrega.sendEmailActaEntrega.bind(actaEntrega)
);
router.get("/buscarActaEntrega/:id", actaEntrega.findActaEntrega.bind(actaEntrega))

module.exports = router;