const { asClass, asFunction } = require('awilix');

const RolRoutes = require('../../../api/routes/apis/roles.routes');
const RolController = require('../../../api/controllers/rol.controller');

const RolService = require('../../../contexts/roles/services/rol.service');
const RolBusiness = require('../../../contexts/roles/domain/rol.business');

const RolRepository = require('../../../contexts/roles/dataAccess/rol.repository')
const RolPermisoRepository = require('../../../contexts/roles/dataAccess/rolPermiso.repository')

module.exports = (container) => {
    container.register({
        RolRoutes: asFunction(RolRoutes).singleton(),
        RolController: asClass(RolController).singleton(),

        RolService: asClass(RolService).singleton(),
        RolBusiness: asClass(RolBusiness).singleton(),

        RolRepository: asClass(RolRepository).singleton(),
        RolPermisoRepository: asClass(RolPermisoRepository).singleton()
    })
    return container;
}



