const sendError = require('../../helpers/sendError');

class PropietarioController {

  constructor({ PropietarioService }) {
    this._propietarioService = PropietarioService;
  }


  async getPropietario(req, res) {
    try {
      const propietario = await this._propietarioService.getPropietario();
      res.json({ success: true, data: propietario });
    } catch (error) {
      sendError(error, req, res);
    }
  }
}

module.exports = PropietarioController;
