const { asClass, asFunction } = require('awilix');

const PropietarioRoutes = require('../../../api/routes/apis/propietarios.routes');
const PropietarioController = require('../../../api/controllers/propietario.controller');
const PropietarioService = require('../../../contexts/propietarios/services/propietario.service');
const PropietarioBusiness = require('../../../contexts/propietarios/domain/propietario.business');
const PropietarioRepository = require('../../../contexts/propietarios/dataAccess/propietario.repository');

module.exports = (container) => {
    container.register({
        PropietarioRoutes: asFunction(PropietarioRoutes).singleton(),
        PropietarioController: asClass(PropietarioController).singleton(),
        PropietarioService: asClass(PropietarioService).singleton(),
        PropietarioBusiness: asClass(PropietarioBusiness).singleton(),
        PropietarioRepository: asClass(PropietarioRepository).singleton()
    })
    return container;
}
