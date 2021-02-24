const { asClass, asFunction } = require('awilix');

const PermisoRoutes = require('../../../api/routes/apis/permisos.routes');
const PermisoController = require('../../../api/controllers/permisos.controller');
const PermisoRepository = require('../../../contexts/permisos/dataAccess/permisos.repository')

module.exports = (container) => {
    container.register({
        PermisoRoutes: asFunction(PermisoRoutes).singleton(),
        PermisoController: asClass(PermisoController).singleton(),
        PermisoRepository: asClass(PermisoRepository).singleton()
    })
    return container;
}
