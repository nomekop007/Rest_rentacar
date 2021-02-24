const { asValue } = require('awilix');

const logMiddleware = require('../../api/middlewares/log.middleware');
const checkMiddleware = require('../../api/middlewares/check.middleware');
const checkApiMiddleware = require('../../api/middlewares/checkApi.middleware')
const logErrorMiddleware = require('../../api/middlewares/logError.middleware');
const { subirFotosVehiculo,
    subirDocumentoContrato,
    subirDocumentoFacturacion,
    subirDocumentoRequisitosArriendo,
    subirDocumentosCliente,
    subirDocumentosConductor,
    subirDocumentosEmpresa,
    subirImageVehiculo } = require('../../api/middlewares/upload.middleware');

module.exports = (container) => {
    container.register({
        logMiddleware: asValue(logMiddleware),
        checkMiddleware: asValue(checkMiddleware),
        checkApiMiddleware: asValue(checkApiMiddleware),
        logErrorMiddleware: asValue(logErrorMiddleware),
        subirFotosVehiculo: asValue(subirFotosVehiculo),
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


