class PropietarioController {

  constructor({ PropietarioService, sendError }) {
    this._servicePropietario = PropietarioService;
    this.sendError = sendError;
  }


  async getPropietario(req, res) {
    try {
      const propietario = await this._servicePropietario.getFindAll();
      res.json({
        success: true,
        data: propietario,
      });
    } catch (error) {
      this.sendError(error, req, res);
    }
  }
}

module.exports = PropietarioController;
