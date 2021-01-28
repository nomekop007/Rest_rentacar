const PropietarioService = require("../services/propietario.service");
const { sendError } = require("../helpers/components");
class PropietarioController {

  constructor() {
    this._servicePropietario = new PropietarioService();
  }


  async getPropietario(req, res) {
    try {
      const propietario = await this._servicePropietario.getFindAll();
      res.json({
        success: true,
        data: propietario,
      });
    } catch (error) {
      sendError(error, req, res);
    }
  }
}

module.exports = PropietarioController;
