const router = require("express").Router();
module.exports = ({ DespachoController }) => {

    router.post("/registrarDespacho", DespachoController.createDespacho.bind(DespachoController));
    router.put("/registrarRevision/:id", DespachoController.addRevision.bind(DespachoController));
    router.post("/registrarBloqueoUsuario", DespachoController.createBloqueoUsuario.bind(DespachoController));
    router.get("/revisarBloqueoUsuario", DespachoController.revisarBloqueoUsuario.bind(DespachoController));
    router.post("/generarPDFactaRecepcion", DespachoController.generarPDFactaRecepcion.bind(DespachoController));


    return router;
}

