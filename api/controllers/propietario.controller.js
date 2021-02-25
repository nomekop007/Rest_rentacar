class PropietarioController {

  constructor({ PropietarioRepository, sendError }) {
    this.sendError = sendError;

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
