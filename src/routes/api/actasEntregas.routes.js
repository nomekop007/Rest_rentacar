const router = require("express").Router();
const ActaEntregaController = require("../../controllers/actaEntrega.controller");
const { subirFotosVehiculo, } = require("../../middlewares/upload.middleware");
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

router.post("/guardarFotosVehiculos/:id", subirFotosVehiculo, actaEntrega.guardarFotosVehiculos.bind(actaEntrega));

module.exports = router;