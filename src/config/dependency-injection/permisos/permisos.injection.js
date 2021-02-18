const { asClass, asFunction } = require('awilix');

const PermisoRoutes = require('../../../routes/api/permisos.routes');
const PermisoController = require('../../../controllers/permisos.controller');
const PermisoService = require('../../../services/permisos.service')

module.exports = (container) => {
    container.register({
        PermisoRoutes: asFunction(PermisoRoutes).singleton(),
        PermisoController: asClass(PermisoController).singleton(),
        PermisoService: asClass(PermisoService).singleton()
    })
    return container;
}
