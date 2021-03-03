const { asClass, asFunction } = require('awilix');

const RolRoutes = require('../../../api/routes/apis/roles.routes');
const PermisoRoutes = require('../../../api/routes/apis/permisos.routes');

const PermisoController = require('../../../api/controllers/permisos.controller');
const PermisoService = require('../../../contexts/permisos/services/permiso.service');
const PermisoBusiness = require('../../../contexts/permisos/domain/permiso.business');

const PermisoRepository = require('../../../contexts/permisos/dataAccess/permisos.repository')
const RolRepository = require('../../../contexts/permisos/dataAccess/rol.repository')
const RolPermisoRepository = require('../../../contexts/permisos/dataAccess/rolPermiso.repository')

module.exports = (container) => {
    container.register({
        PermisoRoutes: asFunction(PermisoRoutes).singleton(),
        RolRoutes: asFunction(RolRoutes).singleton(),

        PermisoController: asClass(PermisoController).singleton(),
        PermisoService: asClass(PermisoService).singleton(),
        PermisoBusiness: asClass(PermisoBusiness).singleton(),

        PermisoRepository: asClass(PermisoRepository).singleton(),
        RolRepository: asClass(RolRepository).singleton(),
        RolPermisoRepository: asClass(RolPermisoRepository).singleton()
    })
    return container;
}
