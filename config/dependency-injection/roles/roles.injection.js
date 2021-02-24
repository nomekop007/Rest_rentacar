const { asClass, asFunction } = require('awilix');

const RolRoutes = require('../../../api/routes/apis/roles.routes');
const RolController = require('../../../api/controllers/rol.controller');
const RolRepository = require('../../../contexts/roles/dataAccess/rol.repository')

module.exports = (container) => {
    container.register({
        RolRoutes: asFunction(RolRoutes).singleton(),
        RolController: asClass(RolController).singleton(),
        RolRepository: asClass(RolRepository).singleton()
    })
    return container;
}



