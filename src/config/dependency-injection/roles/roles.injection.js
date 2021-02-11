const { asClass, asFunction } = require('awilix');

const RolRoutes = require('../../../routes/api/roles.routes');
const RolController = require('../../../controllers/rol.controller');
const RolService = require('../../../services/rol.service')

module.exports = (container) => {
    container.register({
        RolRoutes: asFunction(RolRoutes).singleton(),
        RolController: asClass(RolController).singleton(),
        RolService: asClass(RolService).singleton()
    })
    return container;
}



