const router = require("express").Router();
module.exports = ({ DespachoController }) => {

    router.post("/registrarDespacho", DespachoController.createDespacho.bind(DespachoController));
    router.put("/registrarRevision/:id", DespachoController.addRevision.bind(DespachoController));
    router.post("/registrarBloqueoUsuario", DespachoController.createBloqueoUsuario.bind(DespachoController));
    router.get("/revisarBloqueoUsuario", DespachoController.revisarBloqueoUsuario.bind(DespachoController));
    router.post("/generarPDFactaRecepcion", DespachoController.generarPDFactaRecepcion.bind(DespachoController));
    router.delete("/eliminarFotosRecepcion/:id", DespachoController.eliminarFotosRecepcion.bind(DespachoController));
    router.delete("/eliminarFotosDespacho/:id", DespachoController.eliminarFotosDespacho.bind(DespachoController));
    router.post("/confirmarRecepcionArriendo", DespachoController.confirmarRecepcionArriendo.bind(DespachoController));

    return router;
}

