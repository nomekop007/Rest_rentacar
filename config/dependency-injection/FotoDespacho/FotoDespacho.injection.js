const { asClass, asFunction } = require('awilix');


const FotoDespachoService = require('../../../contexts/despachos/dataccess/fotosDespachos.repository')

module.exports = (container) => {
    container.register({
        FotoDespachoService: asClass(FotoDespachoService).singleton()
    })
    return container;
}

