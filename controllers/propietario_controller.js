const { Propietario } = require("../db");

class PropietarioController {
  async getPropietario(req, res) {
    try {
      const propietario = await Propietario.findAll({
        attributes: ["rut_propietario", "nombre_propietario"],
      });
      res.json({
        success: true,
        data: propietario,
      });
    } catch (error) {
      res.json({
        success: false,
        msg: "error: " + error,
      });
    }
  }
}

module.exports = PropietarioController;
