const { asClass, asFunction } = require('awilix');


const FotoDespachoRepository = require('../../../contexts/despachos/dataccess/fotosDespachos.repository')

module.exports = (container) => {
    container.register({
        FotoDespachoRepository: asClass(FotoDespachoRepository).singleton()
    })
    return container;
}

