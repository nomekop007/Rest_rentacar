const { asClass, asFunction } = require('awilix');

//const rolPermisoRoutes = require('../../../routes/api/rolPermisos.routes');
//const rolPermisoController = require('../../../controllers/rolPermiso.controller');
const RolPermisoService = require('../../../services/rolPermiso.service')

module.exports = (container) => {
    container.register({
        /*  rolPermisoRoutes: asFunction(rolPermisoRoutes).singleton(),
         rolPermisoController: asClass(rolPermisoController).singleton(), */
        RolPermisoService: asClass(RolPermisoService).singleton()
    })
    return container;
}
