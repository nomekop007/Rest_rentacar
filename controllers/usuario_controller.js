const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const moment = require("moment");
const jwt = require("jwt-simple");

const { Usuario, Rol, Sucursal } = require("../db");

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
      res.json({
        success: false,
        msg: "error: " + error,
      });
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
      res.json({
        success: false,
        msg: "error: " + error,
      });
    }
  }

  async createUsuario(req, res) {
    try {
      //valida los datos ingresados
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //encripta la password
      req.body.clave_usuario = bcrypt.hashSync(
        req.body.clave_usuario,
        Number(process.env.NUM_BCRYPT)
      );
      const v = await Usuario.create(req.body);

      const usuario = await Usuario.findOne({
        where: { id_usuario: v.id_usuario },
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
      res.json({
        success: false,
        msg: "error: " + error,
      });
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
      res.json({
        success: false,
        msg: "error: " + error,
      });
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

      await Usuario.update(userdata, {
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
      res.json({
        success: false,
        msg: "error: " + error,
      });
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
      await Usuario.update(
        { estado_usuario: state, userAt: req.body.userAt },
        {
          where: { id_usuario: req.params.id },
        }
      );

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
      res.json({
        success: false,
        msg: "error: " + error,
      });
    }
  }
}

const crearToken = (usuario) => {
  const payload = {
    usuarioId: usuario.id_usuario,
    createAt: moment().unix(),
    expiredAt: moment().add(12, "hours").unix(),
  };
  return jwt.encode(payload, process.env.SECRET_PHRASE);
};

module.exports = UsuarioController;
