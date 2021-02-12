const { asClass, asFunction } = require('awilix');

module.exports = (container) => {
    const ActaEntregaRoutes = require('../../../routes/api/actasEntregas.routes');
    const ActaEntregaController = require('../../../controllers/actaEntrega.controller');
    const ActaEntregaService = require('../../../services/actaEntrega.service');
    container.register({
        ActaEntregaRoutes: asFunction(ActaEntregaRoutes).singleton(),
        ActaEntregaController: asClass(ActaEntregaController).singleton(),
        ActaEntregaService: asClass(ActaEntregaService).singleton()
    })
    return container;
}


