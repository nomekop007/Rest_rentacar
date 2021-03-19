const { asClass, asFunction } = require('awilix');

const DespachoRoutes = require('../../../api/routes/apis/despachos.routes');
const DespachoController = require('../../../api/controllers/despacho.controller');
const DespachoService = require('../../../contexts/despachos/services/despacho.service');
const DespachoBusiness = require('../../../contexts/despachos/domain/despacho.business');

const DespachoRepository = require('../../../contexts/despachos/dataccess/despacho.repository');
const ActaEntregaRepository = require('../../../contexts/despachos/dataccess/actaEntrega.repository');
const FotoDespachoRepository = require('../../../contexts/despachos/dataccess/fotosDespachos.repository');
const FotoRecepcionRepository = require('../../../contexts/despachos/dataccess/fotosRecepcion.repository');
const BloqueoUsuarioRepository = require('../../../contexts/despachos/dataccess/bloqueoUsuario.repository');

module.exports = (container) => {
    container.register({
        DespachoRoutes: asFunction(DespachoRoutes).singleton(),
        DespachoController: asClass(DespachoController).singleton(),
        DespachoService: asClass(DespachoService).singleton(),
        DespachoBusiness: asClass(DespachoBusiness).singleton(),

        DespachoRepository: asClass(DespachoRepository).singleton(),
        ActaEntregaRepository: asClass(ActaEntregaRepository).singleton(),
        FotoDespachoRepository: asClass(FotoDespachoRepository).singleton(),
        FotoRecepcionRepository: asClass(FotoRecepcionRepository).singleton(),
        BloqueoUsuarioRepository: asClass(BloqueoUsuarioRepository).singleton(),
    })
    return container;
}
