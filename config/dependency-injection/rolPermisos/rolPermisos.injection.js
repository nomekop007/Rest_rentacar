const { asClass, asFunction } = require('awilix');
const RolPermisoRepository = require('../../../contexts/roles/dataAccess/rolPermiso.repository')

module.exports = (container) => {
    container.register({
        RolPermisoRepository: asClass(RolPermisoRepository).singleton()
    })
    return container;
}
