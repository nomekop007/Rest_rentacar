const { asClass, asFunction } = require('awilix');


const PagoExtraService = require('../../../contexts/pagos/services/pagoExtra.service');
const PagoExtraBusiness = require('../../../contexts/pagos/domain/pagoExtra.business');
const PagoExtraRepository = require('../../../contexts/pagos/dataAccess/pagoExtra.repository');

module.exports = (container) => {
    container.register({
        PagoExtraService: asClass(PagoExtraService).singleton(),
        PagoExtraBusiness: asClass(PagoExtraBusiness).singleton(),
        PagoExtraRepository: asClass(PagoExtraRepository).singleton(),
    })
    return container;
}
