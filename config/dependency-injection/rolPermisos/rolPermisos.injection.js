const { asClass, asFunction } = require('awilix');
const RolPermisoService = require('../../../contexts/roles/dataAccess/rolPermiso.repository')

module.exports = (container) => {
    container.register({
        RolPermisoService: asClass(RolPermisoService).singleton()
    })
    return container;
}
