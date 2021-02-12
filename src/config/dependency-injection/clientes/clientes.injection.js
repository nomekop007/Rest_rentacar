const { asClass, asFunction } = require('awilix');

const ClienteRoutes = require('../../../routes/api/clientes.routes');
const ClienteController = require('../../../controllers/cliente.controller');
const ClienteService = require('../../../services/cliente.service');

module.exports = (container) => {
    container.register({
        ClienteRoutes: asFunction(ClienteRoutes).singleton(),
        ClienteController: asClass(ClienteController).singleton(),
        ClienteService: asClass(ClienteService).singleton(),
    })
    return container;
}



