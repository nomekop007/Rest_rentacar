const { asClass, asFunction } = require('awilix');

const GarantiaRoutes = require('../../../api/routes/apis/garantias.routes');
const GarantiaController = require('../../../api/controllers/garantia.controller');
const GarantiaRepository = require('../../../contexts/arriendos/dataAccess/garantia.repository')

module.exports = (container) => {
    container.register({
        GarantiaRoutes: asFunction(GarantiaRoutes).singleton(),
        GarantiaController: asClass(GarantiaController).singleton(),
        GarantiaRepository: asClass(GarantiaRepository).singleton()
    })
    return container;
}
