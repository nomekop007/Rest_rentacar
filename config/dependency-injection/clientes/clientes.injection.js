const { asClass, asFunction } = require('awilix');

const ClienteRoutes = require('../../../api/routes/apis/clientes.routes');
const ClienteController = require('../../../api/controllers/cliente.controller');
const ClienteRepository = require('../../../contexts/clientes/dataAccess/cliente.repository');

module.exports = (container) => {
    container.register({
        ClienteRoutes: asFunction(ClienteRoutes).singleton(),
        ClienteController: asClass(ClienteController).singleton(),
        ClienteRepository: asClass(ClienteRepository).singleton(),
    })
    return container;
}



