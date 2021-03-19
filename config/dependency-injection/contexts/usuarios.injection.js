const { asClass, asFunction } = require('awilix');

const UsuarioRoutes = require('../../../api/routes/apis/usuarios.routes');
const UsuarioController = require('../../../api/controllers/usuario.controller');
const UsuarioService = require('../../../contexts/usuarios/services/usuario.service');
const UsuarioBusiness = require('../../../contexts/usuarios/domain/usuario.business');
const UsuarioRepository = require('../../../contexts/usuarios/dataAccess/usuario.repository');

module.exports = (container) => {
    container.register({
        UsuarioRoutes: asFunction(UsuarioRoutes).singleton(),
        UsuarioController: asClass(UsuarioController).singleton(),
        UsuarioService: asClass(UsuarioService).singleton(),
        UsuarioBusiness: asClass(UsuarioBusiness).singleton(),
        UsuarioRepository: asClass(UsuarioRepository).singleton()
    })
    return container;
}