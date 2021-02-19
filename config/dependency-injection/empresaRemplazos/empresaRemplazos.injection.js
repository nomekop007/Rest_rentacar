const { asClass, asFunction } = require('awilix');

const EmpresaRemplazoRoutes = require('../../../api/routes/apis/empresasRemplazos.routes');
const EmpresaRemplazoController = require('../../../api/controllers/empresaRemplazo.controller');
const EmpresaRemplazoService = require('../../../services/empresaRemplazo.service')

module.exports = (container) => {
    container.register({
        EmpresaRemplazoRoutes: asFunction(EmpresaRemplazoRoutes).singleton(),
        EmpresaRemplazoController: asClass(EmpresaRemplazoController).singleton(),
        EmpresaRemplazoService: asClass(EmpresaRemplazoService).singleton()
    })
    return container;
}


