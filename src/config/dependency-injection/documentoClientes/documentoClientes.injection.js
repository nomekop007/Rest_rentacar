const { asClass } = require('awilix');


const DocumentoClienteService = require('../../../services/documentoCliente.service');

module.exports = (container) => {
    container.register({
        DocumentoClienteService: asClass(DocumentoClienteService).singleton(),
    })
    return container;
}


