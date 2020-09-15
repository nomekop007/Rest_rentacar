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
            attributes: ["nombre_usuario", "email_usuario", "createdAt"],
        });
        res.json({
            success: true,
            data: usuario,
        });
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
            attributes: ["nombre_usuario", "email_usuario", "createdAt"],
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