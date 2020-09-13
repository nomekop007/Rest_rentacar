const { Rol } = require("../db");

class RolController {
  async getRoles(req, res) {
    const roles = await Rol.findAll({
      attributes: ["id_rol", "nombre_rol"],
    });
    res.json({
      success: true,
      data: roles,
    });
  }
}

module.exports = RolController;
