const { Facturacion } = require("../database/db");
const { sendError } = require("../helpers/components");

class FacturacionController {
  async createFacturacion(req, res) {
    try {
      const response = req.body;

      //se elige el metodo de pago para el PAGO
      switch (response.id_modoPago) {
        case "TARJETA":
          response.id_modoPago = 3;
          break;
        case "CHEQUE":
          response.id_modoPago = 2;
          break;
        case "EFECTIVO":
          response.id_modoPago = 1;
          break;
        default:
          response.id_modoPago = null;
      }

      const facturacion = await Facturacion.create(response);
      res.json({
        success: true,
        facturacion: facturacion,
        msg: "registro exitoso",
      });
    } catch (error) {
      sendError(error, res);
    }
  }
}

module.exports = FacturacionController;
