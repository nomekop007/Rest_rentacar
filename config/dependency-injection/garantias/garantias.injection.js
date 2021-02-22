const { asClass, asFunction } = require('awilix');

const GarantiaRoutes = require('../../../api/routes/apis/garantias.routes');
const GarantiaController = require('../../../api/controllers/garantia.controller');
const GarantiaService = require('../../../contexts/arriendos/dataAccess/garantia.repository')

module.exports = (container) => {
    container.register({
        GarantiaRoutes: asFunction(GarantiaRoutes).singleton(),
        GarantiaController: asClass(GarantiaController).singleton(),
        GarantiaService: asClass(GarantiaService).singleton()
    })
    return container;
}
