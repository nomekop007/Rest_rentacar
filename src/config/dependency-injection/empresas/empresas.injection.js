const { asClass, asFunction } = require('awilix');

const EmpresaRoutes = require('../../../routes/api/empresas.routes');
const EmpresaController = require('../../../controllers/empresa.controller');
const EmpresaService = require('../../../services/empresa.service');

module.exports = (container) => {
    container.register({
        EmpresaRoutes: asFunction(EmpresaRoutes).singleton(),
        EmpresaController: asClass(EmpresaController).singleton(),
        EmpresaService: asClass(EmpresaService).singleton(),
    })
    return container;
}


