const router = require("express").Router();
module.exports = ({ ConductorController, subirDocumentosConductor }) => {

    router.get("/cargarConductores", ConductorController.getConductores.bind(ConductorController));
    router.get("/buscarConductor/:id", ConductorController.findConductor.bind(ConductorController));
    router.post("/registrarConductor", ConductorController.createConductor.bind(ConductorController));
    router.put("/editarConductor/:id", ConductorController.putConductor.bind(ConductorController));
    router.post("/editarArchivos/:id", subirDocumentosConductor, ConductorController.updateFile.bind(ConductorController));

    return router;
}

