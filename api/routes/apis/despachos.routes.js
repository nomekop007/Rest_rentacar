const router = require("express").Router();
module.exports = ({ DespachoController, subirFotosDespacho, subirFotosRecepcion }) => {

    router.post("/registrarDespacho", DespachoController.createDespacho.bind(DespachoController));
    router.put("/registrarRevision/:id", DespachoController.addRevision.bind(DespachoController));
    router.post("/registrarBloqueoUsuario", DespachoController.createBloqueoUsuario.bind(DespachoController));
    router.get("/revisarBloqueoUsuario", DespachoController.revisarBloqueoUsuario.bind(DespachoController));
    router.post("/generarPDFactaRecepcion", DespachoController.generarPDFactaRecepcion.bind(DespachoController));
    router.delete("/eliminarFotosRecepcion/:id", DespachoController.eliminarFotosRecepcion.bind(DespachoController));
    router.delete("/eliminarFotosDespacho/:id", DespachoController.eliminarFotosDespacho.bind(DespachoController));
    router.post("/confirmarRecepcionArriendo", DespachoController.confirmarRecepcionArriendo.bind(DespachoController));

    router.get("/buscarActaEntrega/:id", DespachoController.findActaEntrega.bind(DespachoController))
    router.post("/registrarActaEntrega", DespachoController.createActaEntrega.bind(DespachoController));
    router.post("/generarPDFactaEntrega", DespachoController.generatePDFactaEntrega.bind(DespachoController));
    router.post("/enviarCorreoActaEntrega", DespachoController.sendEmailActaEntrega.bind(DespachoController));
    router.post("/guardarFotosVehiculos/:id", subirFotosDespacho, DespachoController.guardarFotosVehiculos.bind(DespachoController));
    router.post("/guardarFotoRecepcion/:id", subirFotosRecepcion, DespachoController.guardarFotoRecepcion.bind(DespachoController));

    return router;
}

