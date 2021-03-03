class PropietarioController {

  constructor({ PropietarioService, sendError }) {
    this.sendError = sendError;
    this._propietarioService = PropietarioService;
  }


  async getPropietario(req, res) {
    try {
      const propietario = await this._propietarioService.getPropietario();
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
