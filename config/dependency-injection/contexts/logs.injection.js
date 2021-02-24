const { asClass, asFunction } = require('awilix');

//agregar todas las capas

const LogService = require('../../../contexts/logs/services/log.service');
const LogBusiness = require('../../../contexts/logs/domain/log.business');

module.exports = (container) => {
    container.register({
        LogService: asClass(LogService).singleton(),
        LogBusiness: asClass(LogBusiness).singleton(),
    })
    return container;
}