const { asClass } = require('awilix');


const DocumentoEmpresaService = require('../../../contexts/clientes/dataAccess/documentoEmpresa.repository');

module.exports = (container) => {
    container.register({
        DocumentoEmpresaService: asClass(DocumentoEmpresaService).singleton(),
    })
    return container;
}


