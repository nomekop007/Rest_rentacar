const router = require("express").Router();
module.exports = ({ DespachoController, subirFotosVehiculo }) => {

    router.get("/buscarActaEntrega/:id", DespachoController.findActaEntrega.bind(DespachoController))
    router.post("/registrarActaEntrega", DespachoController.createActaEntrega.bind(DespachoController));
    router.post("/generarPDFactaEntrega", DespachoController.generatePDFactaEntrega.bind(DespachoController));
    router.post("/enviarCorreoActaEntrega", DespachoController.sendEmailActaEntrega.bind(DespachoController));
    router.post("/guardarFotosVehiculos/:id", subirFotosVehiculo, DespachoController.guardarFotosVehiculos.bind(DespachoController));

    return router;

}

