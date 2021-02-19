const { asClass } = require('awilix');


const DocumentoEmpresaService = require('../../../services/documentoEmpresa.service');

module.exports = (container) => {
    container.register({
        DocumentoEmpresaService: asClass(DocumentoEmpresaService).singleton(),
    })
    return container;
}


