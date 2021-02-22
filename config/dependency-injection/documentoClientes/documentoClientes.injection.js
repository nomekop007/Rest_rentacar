const { asClass } = require('awilix');


const DocumentoClienteService = require('../../../contexts/clientes/dataAccess/documentoCliente.repository');

module.exports = (container) => {
    container.register({
        DocumentoClienteService: asClass(DocumentoClienteService).singleton(),
    })
    return container;
}


