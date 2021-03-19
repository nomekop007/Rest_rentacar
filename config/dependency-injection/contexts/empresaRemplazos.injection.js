const { asClass, asFunction } = require('awilix');

const EmpresaRemplazoRoutes = require('../../../api/routes/apis/empresasRemplazos.routes');
const EmpresaRemplazoController = require('../../../api/controllers/empresaRemplazo.controller');
const EmpresaRemplazoService = require('../../../contexts/empresaRemplazos/services/empresaRemplazo.service');
const EmpresaRemplazoBusiness = require('../../../contexts/empresaRemplazos/domain/empresaRemplazo.business');

const EmpresaRemplazoRepository = require('../../../contexts/empresaRemplazos/dataAccess/empresaRemplazo.repository');
const RemplazoRepository = require('../../../contexts/empresaRemplazos/dataAccess/remplazo.repository');


module.exports = (container) => {
    container.register({
        EmpresaRemplazoRoutes: asFunction(EmpresaRemplazoRoutes).singleton(),
        EmpresaRemplazoController: asClass(EmpresaRemplazoController).singleton(),
        EmpresaRemplazoService: asClass(EmpresaRemplazoService).singleton(),
        EmpresaRemplazoBusiness: asClass(EmpresaRemplazoBusiness).singleton(),

        EmpresaRemplazoRepository: asClass(EmpresaRemplazoRepository).singleton(),
        RemplazoRepository: asClass(RemplazoRepository).singleton()
    })
    return container;
}


