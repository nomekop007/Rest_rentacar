const { asClass, asFunction } = require('awilix');

const FacturacionRoutes = require('../../../routes/api/facturaciones.routes');
const FacturacionController = require('../../../controllers/facturacion.controller');
const FacturacionService = require('../../../services/facturacion.service')

module.exports = (container) => {
    container.register({
        FacturacionRoutes: asFunction(FacturacionRoutes).singleton(),
        FacturacionController: asClass(FacturacionController).singleton(),
        FacturacionService: asClass(FacturacionService).singleton()
    })
    return container;
}

