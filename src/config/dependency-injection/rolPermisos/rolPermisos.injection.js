const { asClass, asFunction } = require('awilix');
const RolPermisoService = require('../../../services/rolPermiso.service')

module.exports = (container) => {
    container.register({
        RolPermisoService: asClass(RolPermisoService).singleton()
    })
    return container;
}
