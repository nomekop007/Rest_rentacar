const { asClass, asFunction } = require('awilix');

const AccesorioRoutes = require('../../../routes/api/accesorios.routes');
const AccesorioController = require('../../../controllers/accesorio.controller');
const AccesorioService = require('../../../services/accesorio.service');

module.exports = (container) => {
    container.register({
        AccesorioRoutes: asFunction(AccesorioRoutes).singleton(),
        AccesorioController: asClass(AccesorioController).singleton(),
        AccesorioService: asClass(AccesorioService).singleton(),
    })
    return container;
}



