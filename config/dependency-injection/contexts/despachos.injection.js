const { asClass, asFunction } = require('awilix');

const DespachoRoutes = require('../../../api/routes/apis/despachos.routes');
const ActaEntregaRoutes = require('../../../api/routes/apis/actasEntregas.routes');

const DespachoController = require('../../../api/controllers/despacho.controller');
const ActaEntregaController = require('../../../api/controllers/actaEntrega.controller');

const DespachoService = require('../../../contexts/despachos/services/despacho.service');
const DespachoBusiness = require('../../../contexts/despachos/domain/despacho.business');

const DespachoRepository = require('../../../contexts/despachos/dataccess/despacho.repository');
const ActaEntregaRepository = require('../../../contexts/despachos/dataccess/actaEntrega.repository');
const FotoDespachoRepository = require('../../../contexts/despachos/dataccess/fotosDespachos.repository')


module.exports = (container) => {
    container.register({
        DespachoRoutes: asFunction(DespachoRoutes).singleton(),
        ActaEntregaRoutes: asFunction(ActaEntregaRoutes).singleton(),

        DespachoController: asClass(DespachoController).singleton(),
        ActaEntregaController: asClass(ActaEntregaController).singleton(),

        DespachoService: asClass(DespachoService).singleton(),
        DespachoBusiness: asClass(DespachoBusiness).singleton(),

        DespachoRepository: asClass(DespachoRepository).singleton(),
        ActaEntregaRepository: asClass(ActaEntregaRepository).singleton(),
        FotoDespachoRepository: asClass(FotoDespachoRepository).singleton()
    })
    return container;
}
