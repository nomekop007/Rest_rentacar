const { asClass, asFunction } = require('awilix');

const PagoRoutes = require('../../../api/routes/apis/pagos.routes');
const AbonoRoutes = require('../../../api/routes/apis/abonos.routes');
const FacturacionRoutes = require('../../../api/routes/apis/facturaciones.routes');
const PagoAccesorioRoutes = require('../../../api/routes/apis/pagosAccesorios.routes');
const PagoArriendoRoutes = require('../../../api/routes/apis/pagosArriendos.routes');
const PagoDanioRoutes = require('../../../api/routes/apis/pagosDanios.routes');

const PagoController = require('../../../api/controllers/pago.controller');
const AbonoController = require('../../../api/controllers/abono.controller');
const FacturacionController = require('../../../api/controllers/facturacion.controller');
const PagoAccesorioController = require('../../../api/controllers/pagoAccesorio.controller');
const PagoArriendoController = require('../../../api/controllers/pagoArriendo.controller');
const PagoDanioController = require('../../../api/controllers/pagoDanio.controller');

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
        AbonoRoutes: asFunction(AbonoRoutes).singleton(),
        FacturacionRoutes: asFunction(FacturacionRoutes).singleton(),
        PagoAccesorioRoutes: asFunction(PagoAccesorioRoutes).singleton(),
        PagoArriendoRoutes: asFunction(PagoArriendoRoutes).singleton(),
        PagoDanioRoutes: asFunction(PagoDanioRoutes).singleton(),

        PagoController: asClass(PagoController).singleton(),
        AbonoController: asClass(AbonoController).singleton(),
        FacturacionController: asClass(FacturacionController).singleton(),
        PagoAccesorioController: asClass(PagoAccesorioController).singleton(),
        PagoArriendoController: asClass(PagoArriendoController).singleton(),
        PagoDanioController: asClass(PagoDanioController).singleton(),

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
