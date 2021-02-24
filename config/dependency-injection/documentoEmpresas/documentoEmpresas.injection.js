const { asClass } = require('awilix');


const DocumentoEmpresaRepository = require('../../../contexts/clientes/dataAccess/documentoEmpresa.repository');

module.exports = (container) => {
    container.register({
        DocumentoEmpresaRepository: asClass(DocumentoEmpresaRepository).singleton(),
    })
    return container;
}


