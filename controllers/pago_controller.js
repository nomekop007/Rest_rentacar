const { Pago } = require("../database/db");
const { sendError } = require("../helpers/components");

class PagoController {
  async createPago(req, res) {
    try {
      const response = req.body;

      const pago = await Pago.create(response);

      res.json({
        success: true,
        pago: pago,
        msg: "registro exitoso",
      });
    } catch (error) {
      sendError(error, res);
    }
  }
}

module.exports = PagoController;
