const { asValue } = require('awilix');

const logMiddleware = require('../../api/middlewares/log.middleware');
const checkMiddleware = require('../../api/middlewares/check.middleware');
const checkApiMiddleware = require('../../api/middlewares/checkApi.middleware')
const logErrorMiddleware = require('../../api/middlewares/logError.middleware');
const { subirFotosRecepcion,
    subirFotosDespacho,
    subirDocumentoContrato,
    subirDocumentoFacturacion,
    subirDocumentoRequisitosArriendo,
    subirDocumentosCliente,
    subirDocumentosConductor,
    subirDocumentosEmpresa,
    subirImageVehiculo,
    subirFotoRespaldoIngresoLicitacion } = require('../../api/middlewares/upload.middleware');

module.exports = (container) => {
    container.register({
        logMiddleware: asValue(logMiddleware),
        logErrorMiddleware: asValue(logErrorMiddleware),
        checkMiddleware: asValue(checkMiddleware),
        checkApiMiddleware: asValue(checkApiMiddleware),
        subirFotoRespaldoIngresoLicitacion: asValue(subirFotoRespaldoIngresoLicitacion),
        subirFotosRecepcion: asValue(subirFotosRecepcion),
        subirFotosDespacho: asValue(subirFotosDespacho),
        subirDocumentoContrato: asValue(subirDocumentoContrato),
        subirDocumentoFacturacion: asValue(subirDocumentoFacturacion),
        subirDocumentoRequisitosArriendo: asValue(subirDocumentoRequisitosArriendo),
        subirDocumentosCliente: asValue(subirDocumentosCliente),
        subirDocumentosConductor: asValue(subirDocumentosConductor),
        subirDocumentosEmpresa: asValue(subirDocumentosEmpresa),
        subirImageVehiculo: asValue(subirImageVehiculo),
    })
    return container;
}


