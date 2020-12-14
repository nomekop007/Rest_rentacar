const PropietarioService = require("../services/propietario.service");
const { sendError } = require("../helpers/components");
class PropietarioController {

  constructor() {
    this.servicePropietario = new PropietarioService();
  }


  async getPropietario(req, res) {
    try {
      const propietario = await this.servicePropietario.getFindAll();
      res.json({
        success: true,
        data: propietario,
      });
    } catch (error) {
      sendError(error, res);
    }
  }
}

module.exports = PropietarioController;
