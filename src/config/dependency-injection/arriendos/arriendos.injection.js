const { asClass, asFunction } = require('awilix');

const ArriendoRoutes = require('../../../routes/api/arriendos.routes');
const ArriendoController = require('../../../controllers/arriendo.controller');
const ArriendoService = require('../../../services/arriendo.service');

module.exports = (container) => {
    container.register({
        ArriendoRoutes: asFunction(ArriendoRoutes).singleton(),
        ArriendoController: asClass(ArriendoController).singleton(),
        ArriendoService: asClass(ArriendoService).singleton(),
    })
    return container;
}



