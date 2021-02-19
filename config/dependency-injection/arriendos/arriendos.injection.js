const { asClass, asFunction } = require('awilix');

const ArriendoRoutes = require('../../../api/routes/apis/arriendos.routes');
const ArriendoController = require('../../../api/controllers/arriendo.controller');
const ArriendoService = require('../../../services/arriendo.service');

module.exports = (container) => {
    container.register({
        ArriendoRoutes: asFunction(ArriendoRoutes).singleton(),
        ArriendoController: asClass(ArriendoController).singleton(),
        ArriendoService: asClass(ArriendoService).singleton(),
    })
    return container;
}



