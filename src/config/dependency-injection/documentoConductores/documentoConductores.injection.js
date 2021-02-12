const { asClass } = require('awilix');


const DocumentoConductorService = require('../../../services/documentosConductor.service');

module.exports = (container) => {
    container.register({
        DocumentoConductorService: asClass(DocumentoConductorService).singleton(),
    })
    return container;
}


