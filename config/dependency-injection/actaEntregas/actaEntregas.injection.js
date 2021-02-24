const { asClass, asFunction } = require('awilix');

module.exports = (container) => {
    const ActaEntregaRoutes = require('../../../api/routes/apis/actasEntregas.routes');
    const ActaEntregaController = require('../../../api/controllers/actaEntrega.controller');
    const ActaEntregaRepository = require('../../../contexts/despachos/dataccess/actaEntrega.repository');
    container.register({
        ActaEntregaRoutes: asFunction(ActaEntregaRoutes).singleton(),
        ActaEntregaController: asClass(ActaEntregaController).singleton(),
        ActaEntregaRepository: asClass(ActaEntregaRepository).singleton()
    })
    return container;
}


