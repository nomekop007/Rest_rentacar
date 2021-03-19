const { asClass, asFunction } = require('awilix');

const PagoRoutes = require('../../../api/routes/apis/pagos.routes');
const PagoController = require('../../../api/controllers/pago.controller');
const PagoService = require('../../../contexts/pagos/services/pago.service');
const PagoBusiness = require('../../../contexts/pagos/domain/pago.business');

const PagoRepository = require('../../../contexts/pagos/dataAccess/pago.repository')
const AbonoRepository = require('../../../contexts/pagos/dataAccess/abono.repository');
const FacturacionRepository = require('../../../contexts/pagos/dataAccess/facturacion.repository')
const PagoAccesorioRepository = require('../../../contexts/pagos/dataAccess/pagoAccesorio.repository')
const PagoArriendoRepository = require('../../../contexts/pagos/dataAccess/pagoArriendo.repository')
const PagoDanioRepository = require('../../../contexts/pagos/dataAccess/pagoDanio.repository')
const PagoExtraRepository = require('../../../contexts/pagos/dataAccess/pagoExtra.repository');


module.exports = (container) => {
    container.register({
        PagoRoutes: asFunction(PagoRoutes).singleton(),
        PagoController: asClass(PagoController).singleton(),
        PagoService: asClass(PagoService).singleton(),
        PagoBusiness: asClass(PagoBusiness).singleton(),

        AbonoRepository: asClass(AbonoRepository).singleton(),
        PagoRepository: asClass(PagoRepository).singleton(),
        FacturacionRepository: asClass(FacturacionRepository).singleton(),
        PagoAccesorioRepository: asClass(PagoAccesorioRepository).singleton(),
        PagoArriendoRepository: asClass(PagoArriendoRepository).singleton(),
        PagoDanioRepository: asClass(PagoDanioRepository).singleton(),
        PagoExtraRepository: asClass(PagoExtraRepository).singleton(),
    })
    return container;
}
