const { asClass, asFunction } = require('awilix');

const AccesorioRoutes = require('../../../api/routes/apis/accesorios.routes');
const AccesorioController = require('../../../api/controllers/accesorio.controller');
const AccesorioService = require('../../../contexts/accesorios/dataAccess/accesorio.repository');

module.exports = (container) => {
    container.register({
        AccesorioRoutes: asFunction(AccesorioRoutes).singleton(),
        AccesorioController: asClass(AccesorioController).singleton(),
        AccesorioService: asClass(AccesorioService).singleton(),
    })
    return container;
}



