const { asClass, asFunction } = require('awilix');

const UsuarioRoutes = require('../../../routes/api/usuarios.routes');
const UsuarioController = require('../../../controllers/usuario.controller');
const UsuarioService = require('../../../services/usuario.service')

module.exports = (container) => {
    container.register({
        UsuarioRoutes: asFunction(UsuarioRoutes).singleton(),
        UsuarioController: asClass(UsuarioController).singleton(),
        UsuarioService: asClass(UsuarioService).singleton()
    })
    return container;
}