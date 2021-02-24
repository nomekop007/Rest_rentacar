const { asClass, asFunction } = require('awilix');

const PermisoRoutes = require('../../../api/routes/apis/permisos.routes');
const PermisoController = require('../../../api/controllers/permisos.controller');
const PermisoService = require('../../../contexts/permisos/services/permiso.service');
const PermisoBusiness = require('../../../contexts/permisos/domain/permiso.business');
const PermisoRepository = require('../../../contexts/permisos/dataAccess/permisos.repository')

module.exports = (container) => {
    container.register({
        PermisoRoutes: asFunction(PermisoRoutes).singleton(),
        PermisoController: asClass(PermisoController).singleton(),
        PermisoService: asClass(PermisoService).singleton(),
        PermisoBusiness: asClass(PermisoBusiness).singleton(),
        PermisoRepository: asClass(PermisoRepository).singleton()
    })
    return container;
}
