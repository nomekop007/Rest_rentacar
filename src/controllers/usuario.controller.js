const { crearToken } = require("../helpers/components");
const { validationResult } = require("express-validator");
const jwt = require("jwt-simple");
const bcrypt = require("bcryptjs");
class UsuarioController {

    constructor({ UsuarioService, sendError }) {
        this._serviceUsuario = UsuarioService;
        this.sendError = sendError;
    }


    async getUsuarios(req, res) {
        try {
            const usuario = await this._serviceUsuario.getFindAll();
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
            const payload = jwt.decode(usertoken, process.env.SECRET_PHRASE);
            payload.usuarioId
            const usuario = await this._serviceUsuario.getFindOne(payload.usuarioId);
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
            const usuario = await this._serviceUsuario.getFindOne(req.params.id);
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
            //valida los datos ingresados
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(310).json({
                    success: false,
                    msg: "error: " + errors.array(),
                });
            }
            //encripta la password
            req.body.clave_usuario = bcrypt.hashSync(
                req.body.clave_usuario,
                Number(process.env.NUM_BCRYPT)
            );
            const u = await this._serviceUsuario.postCreate(req.body);
            const usuario = await this._serviceUsuario.getFindOne(u.id_usuario);
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
            const usuario = await this._serviceUsuario.getFindByEmail(req.body.email_usuario);
            if (usuario) {
                //compara las password
                if (bcrypt.compareSync(req.body.clave_usuario, usuario.clave_usuario)) {
                    res.json({
                        success: true,
                        usuario: {
                            id_usuario: usuario.id_usuario,
                            nombre_usuario: usuario.nombre_usuario,
                            email_usuario: usuario.email_usuario,
                            estado_usuario: usuario.estado_usuario,
                            id_sucursal: usuario.id_sucursal,
                            id_rol: usuario.id_rol,
                            userToken: crearToken(usuario),
                        },
                    });
                } else {
                    res.json({
                        success: false,
                        msg: "Error en usuario y/o constraseña",
                    });
                }
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
            const response = req.body;
            const userdata = {
                userAt: response.userAt,
                nombre_usuario: response.nombre_usuario,
                email_usuario: response.email_usuario,
                id_rol: response.id_rol,
                id_sucursal: response.id_sucursal,
            };
            //si hay campos en contraseña para cambiar
            if (response.clave_usuario != "") {
                userdata.clave_usuario = bcrypt.hashSync(
                    response.clave_usuario,
                    Number(process.env.NUM_BCRYPT)
                );
            }
            await this._serviceUsuario.putUpdate(userdata, req.params.id);
            const usuario = await this._serviceUsuario.getFindOne(req.params.id);
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
            var state = null;
            var msg = "";
            if (req.body.accion == "inhabilitar") {
                state = false;
                msg = "usuario Inabilitado exitosamente";
            } else {
                state = true;
                msg = "usuario Habilitado exitosamente";
            }
            const data = { estado_usuario: state, userAt: req.body.userAt };
            await this._serviceUsuario.putUpdate(data, req.params.id);
            const usuario = await this._serviceUsuario.getFindOne(req.params.id);
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