const { asClass, asFunction } = require('awilix');

const ContratoRoutes = require('../../../api/routes/apis/contratos.routes');
const ContratoController = require('../../../api/controllers/contrato.controller');
const ContratoService = require('../../../contexts/arriendos/dataAccess/contacto.repository');

module.exports = (container) => {
    container.register({
        ContratoRoutes: asFunction(ContratoRoutes).singleton(),
        ContratoController: asClass(ContratoController).singleton(),
        ContratoService: asClass(ContratoService).singleton(),
    })
    return container;
}


