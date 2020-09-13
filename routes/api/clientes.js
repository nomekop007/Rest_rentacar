const router = require("express").Router();
const ClienteController = require("../../controllers/cliente_controller");
const cliente = new ClienteController();

router.get("/cargarClientes", cliente.getClientes.bind(cliente));

router.get("/buscarCliente/:id", cliente.findCliente.bind(cliente));

module.exports = router;
