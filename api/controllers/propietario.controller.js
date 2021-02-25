class PropietarioController {

  constructor({ PropietarioService, PropietarioRepository, sendError }) {
    this.sendError = sendError;
    this._propietarioService = PropietarioService;

    //mover
    this._servicePropietario = PropietarioRepository;
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
