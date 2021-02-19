const router = require("express").Router();

module.exports = ({ ClienteController, subirDocumentosCliente }) => {

    router.get("/cargarClientes", ClienteController.getClientes.bind(ClienteController));
    router.get("/buscarCliente/:id", ClienteController.findCliente.bind(ClienteController));
    router.post("/registrarCliente", ClienteController.createCliente.bind(ClienteController));
    router.put("/editarCliente/:id", ClienteController.putCliente.bind(ClienteController));
    router.post("/editarArchivos/:id", subirDocumentosCliente, ClienteController.updateFile.bind(ClienteController));

    return router;

}

