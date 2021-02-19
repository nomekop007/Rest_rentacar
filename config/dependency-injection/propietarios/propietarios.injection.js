const { asClass, asFunction } = require('awilix');

const PropietarioRoutes = require('../../../api/routes/apis/propietarios.routes');
const PropietarioController = require('../../../api/controllers/propietario.controller');
const PropietarioService = require('../../../services/propietario.service');

module.exports = (container) => {
    container.register({
        PropietarioRoutes: asFunction(PropietarioRoutes).singleton(),
        PropietarioController: asClass(PropietarioController).singleton(),
        PropietarioService: asClass(PropietarioService).singleton()
    })
    return container;
}
