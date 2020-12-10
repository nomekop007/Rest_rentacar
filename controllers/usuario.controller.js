const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { crearToken, sendError } = require("../helpers/components");
const { Usuario, Rol, Sucursal } = require("../database/db");

class UsuarioController {
    async getUsuarios(req, res) {
        try {
            const usuario = await Usuario.findAll({
                include: [
                    { model: Rol, attributes: ["nombre_rol"] },
                    { model: Sucursal, attributes: ["nombre_sucursal"] },
                ],
                attributes: [
                    "estado_usuario",
                    "id_usuario",
                    "nombre_usuario",
                    "email_usuario",
                    "createdAt",
                ],
            });
            res.json({
                success: true,
                data: usuario,
            });
        } catch (error) {
            sendError(error, res);
        }
    }

    async findUsuario(req, res) {
        try {
            const usuario = await Usuario.findOne({
                where: { id_usuario: req.params.id },
            });
            res.json({
                success: true,
                data: usuario,
            });
        } catch (error) {
            sendError(error, res);
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

            const u = await Usuario.create(req.body);

            const usuario = await Usuario.findOne({
                where: { id_usuario: u.id_usuario },
                include: [
                    { model: Rol, attributes: ["nombre_rol"] },
                    { model: Sucursal, attributes: ["nombre_sucursal"] },
                ],
                attributes: [
                    "estado_usuario",
                    "id_usuario",
                    "nombre_usuario",
                    "email_usuario",
                    "createdAt",
                ],
            });

            res.json({
                success: true,
                msg: "Usuario creado exitosamente",
                data: usuario,
            });
        } catch (error) {
            sendError(error)
        }
    }

    async loginUsuario(req, res) {
        try {
            const usuario = await Usuario.findOne({
                where: { email_usuario: req.body.email_usuario },
            });
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
            sendError(error, res);
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

            const u = await Usuario.update(userdata, {
                where: { id_usuario: req.params.id },
            });

            const usuario = await Usuario.findOne({
                where: { id_usuario: req.params.id },
                include: [
                    { model: Rol, attributes: ["nombre_rol"] },
                    { model: Sucursal, attributes: ["nombre_sucursal"] },
                ],
                attributes: [
                    "estado_usuario",
                    "id_usuario",
                    "nombre_usuario",
                    "email_usuario",
                    "createdAt",
                ],
            });
            res.json({
                success: true,
                msg: "Usuario actualizado exitosamente",
                data: usuario,
            });
        } catch (error) {
            sendError(error, res);
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
            const u = await Usuario.update({ estado_usuario: state, userAt: req.body.userAt }, {
                where: { id_usuario: req.params.id },
            });

            const usuario = await Usuario.findOne({
                where: { id_usuario: req.params.id },
                include: [
                    { model: Rol, attributes: ["nombre_rol"] },
                    { model: Sucursal, attributes: ["nombre_sucursal"] },
                ],
                attributes: [
                    "estado_usuario",
                    "id_usuario",
                    "nombre_usuario",
                    "email_usuario",
                    "createdAt",
                ],
            });
            res.json({
                success: true,
                msg: msg,
                data: usuario,
            });
        } catch (error) {
            sendError(error, res);
        }
    }
}

module.exports = UsuarioController;