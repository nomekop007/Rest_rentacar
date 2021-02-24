const { asClass, asFunction } = require('awilix');

const AccesorioRoutes = require('../../../api/routes/apis/accesorios.routes');
const AccesorioController = require('../../../api/controllers/accesorio.controller');
const AccesorioService = require('../../../contexts/accesorios/services/accesorio.service');
const AccesorioBusiness = require('../../../contexts/accesorios/domain/accesorio.business');
const AccesorioRepository = require('../../../contexts/accesorios/dataAccess/accesorio.repository');

module.exports = (container) => {
    container.register({
        AccesorioRoutes: asFunction(AccesorioRoutes).singleton(),
        AccesorioController: asClass(AccesorioController).singleton(),
        AccesorioService: asClass(AccesorioService).singleton(),
        AccesorioBusiness: asClass(AccesorioBusiness).singleton(),
        AccesorioRepository: asClass(AccesorioRepository).singleton(),
    })
    return container;
}



