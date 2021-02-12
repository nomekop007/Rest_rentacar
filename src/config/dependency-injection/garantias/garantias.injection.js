const { asClass, asFunction } = require('awilix');

const GarantiaRoutes = require('../../../routes/api/garantias.routes');
const GarantiaController = require('../../../controllers/garantia.controller');
const GarantiaService = require('../../../services/garantia.service')

module.exports = (container) => {
    container.register({
        GarantiaRoutes: asFunction(GarantiaRoutes).singleton(),
        GarantiaController: asClass(GarantiaController).singleton(),
        GarantiaService: asClass(GarantiaService).singleton()
    })
    return container;
}
