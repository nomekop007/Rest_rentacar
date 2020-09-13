const { Conductor } = require("../db");

class ConductorController {
  async getConductores(req, res) {
    const conductores = await Conductor.findAll({
      attributes: [
        "rut_conductor",
        "nombre_conductor",
        "clase_conductor",
        "telefono_conductor",
      ],
    });
    res.json({
      success: true,
      data: conductores,
    });
  }

  async findConductor(req, res) {
    const conductor = await Conductor.findByPk(req.params.id);

    if (conductor) {
      res.json({
        success: true,
        data: conductor,
      });
    } else {
      res.json({
        success: false,
        msg: "sin datos",
      });
    }
  }
}

module.exports = ConductorController;