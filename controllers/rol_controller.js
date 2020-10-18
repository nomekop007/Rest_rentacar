const { Rol } = require("../db");

class RolController {
  async getRoles(req, res) {
    try {
      const roles = await Rol.findAll({
        attributes: ["id_rol", "nombre_rol"],
      });
      res.json({
        success: true,
        data: roles,
      });
    } catch (error) {
      res.json({
        success: false,
        msg: "error: " + error,
      });
    }
  }
}

module.exports = RolController;
