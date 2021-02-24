const { asClass, asFunction } = require('awilix');

const FacturacionRoutes = require('../../../api/routes/apis/facturaciones.routes');
const FacturacionController = require('../../../api/controllers/facturacion.controller');
const FacturacionService = require('../../../contexts/pagos/dataAccess/facturacion.repository')

module.exports = (container) => {
    container.register({
        FacturacionRoutes: asFunction(FacturacionRoutes).singleton(),
        FacturacionController: asClass(FacturacionController).singleton(),
        FacturacionService: asClass(FacturacionService).singleton()
    })
    return container;
}

