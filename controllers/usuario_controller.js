const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const moment = require("moment");
const jwt = require("jwt-simple");

const { Usuario, Rol, Sucursal } = require("../db");

class UsuarioController {
    async getUsuarios(req, res) {
        const usuario = await Usuario.findAll({
            include: [
                { model: Rol, attributes: ["nombre_rol"] },
                { model: Sucursal, attributes: ["nombre_sucursal"] },
            ],
            attributes: ["estado_usuario", "id_usuario", "nombre_usuario", "email_usuario", "createdAt"],
        });
        res.json({
            success: true,
            data: usuario,
        });
    }

    async findUsuario(req, res) {
        const usuario = await Usuario.findOne({
            where: { id_usuario: req.params.id }
        })
        if (usuario) {
            res.json({
                success: true,
                data: usuario,
            });
        } else {
            res.json({
                success: false,
                msg: "sin datos",
            });
        }
    }

    async createUsuario(req, res) {
        //valida los datos ingresados
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //encripta la password
        req.body.clave_usuario = bcrypt.hashSync(req.body.clave_usuario, 10);
        const v = await Usuario.create(req.body);

        const usuario = await Usuario.findOne({
            where: { id_usuario: v.id_usuario },
            include: [
                { model: Rol, attributes: ["nombre_rol"] },
                { model: Sucursal, attributes: ["nombre_sucursal"] },
            ],
            attributes: ["estado_usuario", "id_usuario", "nombre_usuario", "email_usuario", "createdAt"],
        });

        res.json({
            success: true,
            msg: "Usuario creado exitosamente",
            data: usuario,
        });
    }

    async loginUsuario(req, res) {
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
    }


    async updateUsuario(req, res) {
        const response = req.body;

        const values = {
            nombre_usuario: response.nombre_usuario,
            email_usuario: response.email_usuario,
            id_rol: response.id_rol,
            id_sucursal: response.id_sucursal
        };

        //si hay campos en contraseña para cambiar
        if (response.clave_usuario != "") {
            values.clave_usuario = bcrypt.hashSync(response.clave_usuario, 10);
        }

        await Usuario.update(values, {
            where: { id_usuario: req.params.id },
        });


        const usuario = await Usuario.findOne({
            where: { id_usuario: req.params.id },
            include: [
                { model: Rol, attributes: ["nombre_rol"] },
                { model: Sucursal, attributes: ["nombre_sucursal"] },
            ],
            attributes: ["estado_usuario", "id_usuario", "nombre_usuario", "email_usuario", "createdAt"],
        });
        res.json({
            success: true,
            msg: "Usuario actualizado exitosamente",
            data: usuario,
        });
    }
}

const crearToken = (usuario) => {
    const payload = {
        usuarioId: usuario.id_usuario,
        createAt: moment().unix(),
        expiredAt: moment().add(8, "hours").unix(),
    };
    return jwt.encode(payload, "frase secreta");
};

module.exports = UsuarioController;