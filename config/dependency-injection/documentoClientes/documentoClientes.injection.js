const { asClass } = require('awilix');


const DocumentoClienteRepository = require('../../../contexts/clientes/dataAccess/documentoCliente.repository');

module.exports = (container) => {
    container.register({
        DocumentoClienteRepository: asClass(DocumentoClienteRepository).singleton(),
    })
    return container;
}


