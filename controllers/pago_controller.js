const { Pago } = require("../database/db");
const { sendError } = require("../helpers/components");

class PagoController {
    async createPagoFacturacion(req, res) {
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
            }
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