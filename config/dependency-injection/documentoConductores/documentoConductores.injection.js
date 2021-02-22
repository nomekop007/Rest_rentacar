const { asClass } = require('awilix');


const DocumentoConductorService = require('../../../contexts/clientes/dataAccess/documentoConductor.repository');

module.exports = (container) => {
    container.register({
        DocumentoConductorService: asClass(DocumentoConductorService).singleton(),
    })
    return container;
}


