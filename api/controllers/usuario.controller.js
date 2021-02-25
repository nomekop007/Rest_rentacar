const { validationResult } = require("express-validator");

class UsuarioController {

    constructor({ UsuarioService, sendError }) {
        this._usuarioService = UsuarioService;
        this.sendError = sendError;
    }


    async getUsuarios(req, res) {
        try {
            const usuario = await this._usuarioService.getUsuarios();
            res.json({
                success: true,
                data: usuario,
            });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async validarUsuario(req, res) {
        try {
            const { usertoken } = req.params;
            const usuario = await this._usuarioService.validarUsuario(usertoken);
            res.json({
                success: true,
                data: usuario,
            });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async findUsuario(req, res) {
        try {
            const { id } = req.params;
            const usuario = await this._usuarioService.findUsuario(id);
            res.json({
                success: true,
                data: usuario,
            });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async createUsuario(req, res) {
        try {
            const usuarioReq = req.body;
            //valida los datos ingresados
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(310).json({
                    success: false,
                    msg: "error: " + errors.array(),
                });
            }
            const usuario = await this._usuarioService.createUsuario(usuarioReq);
            res.json({
                success: true,
                msg: "Usuario creado exitosamente",
                data: usuario,
            });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async loginUsuario(req, res) {
        try {
            const usuarioReq = req.body;
            const usuario = await this._usuarioService.loginUsuario(usuarioReq);
            if (usuario) {
                res.json({
                    success: true,
                    usuario: usuario,
                });
            } else {
                res.json({
                    success: false,
                    msg: "Error en usuario y/o constraseña",
                });
            }
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async updateUsuario(req, res) {
        try {
            const usuarioReq = req.body;
            const { id } = req.params;
            const usuario = await this._usuarioService.updateUsuario(usuarioReq, id);
            res.json({
                success: true,
                msg: "Usuario actualizado exitosamente",
                data: usuario,
            });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async stateUsuario(req, res) {
        try {
            const { userAt, accion } = req.body;
            const { id } = req.params;
            const { usuario, msg } = this._usuarioService.stateUsuario(accion, userAt, id)
            res.json({
                success: true,
                msg: msg,
                data: usuario,
            });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


}

module.exports = UsuarioController;