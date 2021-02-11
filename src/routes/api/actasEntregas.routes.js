const router = require("express").Router();
module.exports = ({ ActaEntregaController, subirFotosVehiculo }) => {

    router.get("/buscarActaEntrega/:id", ActaEntregaController.findActaEntrega.bind(ActaEntregaController))
    router.post("/registrarActaEntrega", ActaEntregaController.createActaEntrega.bind(ActaEntregaController));
    router.post("/generarPDFactaEntrega", ActaEntregaController.generatePDFactaEntrega.bind(ActaEntregaController));
    router.post("/enviarCorreoActaEntrega", ActaEntregaController.sendEmailActaEntrega.bind(ActaEntregaController));
    router.post("/guardarFotosVehiculos/:id", subirFotosVehiculo, ActaEntregaController.guardarFotosVehiculos.bind(ActaEntregaController));

    return router;

}

