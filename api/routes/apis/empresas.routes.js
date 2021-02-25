const router = require("express").Router();
module.exports = ({ ClienteController, subirDocumentosEmpresa }) => {

    router.get("/cargarEmpresas", ClienteController.getEmpresas.bind(ClienteController));
    router.get("/buscarEmpresa/:id", ClienteController.findEmpresa.bind(ClienteController));
    router.post("/registrarEmpresa", ClienteController.createEmpresa.bind(ClienteController));
    router.put("/editarEmpresa/:id", ClienteController.putEmpresa.bind(ClienteController));
    router.post("/editarArchivos/:id", subirDocumentosEmpresa, ClienteController.updateFile.bind(ClienteController));

    return router
}

