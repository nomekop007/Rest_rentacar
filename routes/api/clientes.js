const router = require("express").Router();
const {
    subirDocumentosCliente,
} = require("../../middlewares/upload.middleware");
const ClienteController = require("../../controllers/cliente.controller");
const cliente = new ClienteController();

router.get("/cargarClientes", cliente.getClientes.bind(cliente));

router.get("/buscarCliente/:id", cliente.findCliente.bind(cliente));

router.post("/registrarCliente", cliente.createCliente.bind(cliente));

router.put("/editarCliente/:id", cliente.putCliente.bind(cliente));

router.post("/editarArchivos/:id", subirDocumentosCliente, cliente.updateFile.bind(cliente));


module.exports = router;