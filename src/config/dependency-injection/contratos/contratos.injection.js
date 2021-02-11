const { asClass, asFunction } = require('awilix');

const ContratoRoutes = require('../../../routes/api/contratos.routes');
const ContratoController = require('../../../controllers/contrato.controller');
const ContratoService = require('../../../services/contrato.service');

module.exports = (container) => {
    container.register({
        ContratoRoutes: asFunction(ContratoRoutes).singleton(),
        ContratoController: asClass(ContratoController).singleton(),
        ContratoService: asClass(ContratoService).singleton(),
    })
    return container;
}


