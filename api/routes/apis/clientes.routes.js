const router = require("express").Router();

module.exports = ({ ClienteController, subirDocumentosCliente, subirDocumentosConductor, subirDocumentosEmpresa }) => {

    router.get("/cargarClientes", ClienteController.getClientes.bind(ClienteController));
    router.get("/buscarCliente/:id", ClienteController.findCliente.bind(ClienteController));
    router.post("/registrarCliente", ClienteController.createCliente.bind(ClienteController));
    router.put("/editarCliente/:id", ClienteController.putCliente.bind(ClienteController));
    router.post("/editarArchivos/:id", subirDocumentosCliente, ClienteController.updateFileCliente.bind(ClienteController));

    router.get("/cargarConductores", ClienteController.getConductores.bind(ClienteController));
    router.get("/buscarConductor/:id", ClienteController.findConductor.bind(ClienteController));
    router.post("/registrarConductor", ClienteController.createConductor.bind(ClienteController));
    router.put("/editarConductor/:id", ClienteController.putConductor.bind(ClienteController));
    router.post("/editarArchivos/:id", subirDocumentosConductor, ClienteController.updateFileConductor.bind(ClienteController));

    router.get("/cargarEmpresas", ClienteController.getEmpresas.bind(ClienteController));
    router.get("/buscarEmpresa/:id", ClienteController.findEmpresa.bind(ClienteController));
    router.post("/registrarEmpresa", ClienteController.createEmpresa.bind(ClienteController));
    router.put("/editarEmpresa/:id", ClienteController.putEmpresa.bind(ClienteController));
    router.post("/editarArchivos/:id", subirDocumentosEmpresa, ClienteController.updateFileEmpresa.bind(ClienteController));


    return router;

}

