const { asClass } = require('awilix');


const DocumentoConductorRepository = require('../../../contexts/clientes/dataAccess/documentoConductor.repository');

module.exports = (container) => {
    container.register({
        DocumentoConductorRepository: asClass(DocumentoConductorRepository).singleton(),
    })
    return container;
}


