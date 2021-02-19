const { asClass, asFunction } = require('awilix');


const FotoDespachoService = require('../../../services/fotosDespachos.service')

module.exports = (container) => {
    container.register({
        FotoDespachoService: asClass(FotoDespachoService).singleton()
    })
    return container;
}

