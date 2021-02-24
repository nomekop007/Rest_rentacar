const { asClass, asFunction } = require('awilix');

const ContratoRoutes = require('../../../api/routes/apis/contratos.routes');
const ContratoController = require('../../../api/controllers/contrato.controller');
const ContratoRepository = require('../../../contexts/arriendos/dataAccess/contrato.repository');

module.exports = (container) => {
    container.register({
        ContratoRoutes: asFunction(ContratoRoutes).singleton(),
        ContratoController: asClass(ContratoController).singleton(),
        ContratoRepository: asClass(ContratoRepository).singleton(),
    })
    return container;
}


