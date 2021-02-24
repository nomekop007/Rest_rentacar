const { asClass } = require('awilix');


// AUN SIN IMPLEMENTAR SUS FUNCIONALIDADES A NIVEL DE ARQUITECTURA

const LogService = require('../../../contexts/logs/services/log.service');
const LogBusiness = require('../../../contexts/logs/domain/log.business');
const LogRepository = require('../../../contexts/logs/dataAccess/log.repository');

module.exports = (container) => {
    container.register({
        LogService: asClass(LogService).singleton(),
        LogBusiness: asClass(LogBusiness).singleton(),
        LogRepository: asClass(LogRepository).singleton(),
    })
    return container;
}