const { asClass, asFunction } = require('awilix');

const EmpresaRemplazoRoutes = require('../../../api/routes/apis/empresasRemplazos.routes');
const EmpresaRemplazoController = require('../../../api/controllers/empresaRemplazo.controller');
const EmpresaRemplazoRepository = require('../../../contexts/empresaRemplazos/dataAccess/empresaRemplazo.repository');

module.exports = (container) => {
    container.register({
        EmpresaRemplazoRoutes: asFunction(EmpresaRemplazoRoutes).singleton(),
        EmpresaRemplazoController: asClass(EmpresaRemplazoController).singleton(),
        EmpresaRemplazoRepository: asClass(EmpresaRemplazoRepository).singleton()
    })
    return container;
}


