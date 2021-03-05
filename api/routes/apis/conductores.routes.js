const router = require("express").Router();
module.exports = ({ ClienteController, subirDocumentosConductor }) => {

    router.get("/cargarConductores", ClienteController.getConductores.bind(ClienteController));
    router.get("/buscarConductor/:id", ClienteController.findConductor.bind(ClienteController));
    router.post("/registrarConductor", ClienteController.createConductor.bind(ClienteController));
    router.put("/editarConductor/:id", ClienteController.putConductor.bind(ClienteController));
    router.post("/editarArchivos/:id", subirDocumentosConductor, ClienteController.updateFileConductor.bind(ClienteController));

    return router;
}

