const { Pago, Arriendo } = require("../database/db");
const { sendError } = require("../helpers/components");

class PagoController {
    async createPago(req, res, next) {
        try {
            const response = req.body;

            const pago = await Pago.create(response);

            res.json({
                success: true,
                pago: pago,
                msg: "registro exitoso",
            });
            next(pago.logging);

        } catch (error) {
            sendError(error, res);
        }
    }


}

module.exports = PagoController;