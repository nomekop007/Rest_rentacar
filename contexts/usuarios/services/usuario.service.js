class UsuarioService {

    constructor({ UsuarioBusiness }) {
        this._usuarioBusiness = UsuarioBusiness;
    }

    async getUsuarios() {
        return await this._usuarioBusiness.getUsuarios();
    }

    async validarUsuario(usertoken) {
        return await this._usuarioBusiness.validarUsuario(usertoken);
    }

    async findUsuario(id) {
        return await this._usuarioBusiness.findUsuario(id);
    }

    async createUsuario(usuario) {
        return await this._usuarioBusiness.createUsuario(usuario);

    }

    async loginUsuario(usuario) {
        return await this._usuarioBusiness.loginUsuario(usuario);

    }

    async updateUsuario(usuario, id) {
        return usuario = await this._usuarioBusiness.updateUsuario(usuario, id);

    }

    async stateUsuario(accion, userAt, id) {
        return { usuario, msg } = await this._usuarioBusiness.stateUsuario(accion, userAt, id);

    }

}

module.exports = UsuarioService;