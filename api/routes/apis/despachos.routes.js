const router = require("express").Router();
module.exports = ({ DespachoController }) => {

    router.post("/registrarDespacho", DespachoController.createDespacho.bind(DespachoController));
    router.put("/registrarRevision/:id", DespachoController.addRevision.bind(DespachoController));
    router.post("/registrarRecepcionUsuario", DespachoController.createRecepcionUsuario.bind(DespachoController));
    return router;
}

