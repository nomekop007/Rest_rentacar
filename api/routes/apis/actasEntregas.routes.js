const router = require("express").Router();
module.exports = ({ DespachoController, subirFotosDespacho, subirFotosRecepcion }) => {

    router.get("/buscarActaEntrega/:id", DespachoController.findActaEntrega.bind(DespachoController))
    router.post("/registrarActaEntrega", DespachoController.createActaEntrega.bind(DespachoController));
    router.post("/generarPDFactaEntrega", DespachoController.generatePDFactaEntrega.bind(DespachoController));
    router.post("/enviarCorreoActaEntrega", DespachoController.sendEmailActaEntrega.bind(DespachoController));
    router.post("/guardarFotosVehiculos/:id", subirFotosDespacho, DespachoController.guardarFotosVehiculos.bind(DespachoController));
    router.post("/guardarFotoRecepcion/:id", subirFotosRecepcion, DespachoController.guardarFotoRecepcion.bind(DespachoController));

    return router;

}

