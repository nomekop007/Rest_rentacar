const { PagoArriendo } = require("../database/db");
const { sendError } = require("../helpers/components");

class PagoArriendoController {
    async createPagoArriendo(req, res) {
        try {
            const response = req.body;
            const pagoArriendo = await PagoArriendo.create(response);

            res.json({
                success: true,
                pagoArriendo: pagoArriendo,
                msg: "registro exitoso",
            });

        } catch (error) {
            sendError(error, res);
        }
    }


}

module.exports = PagoArriendoController;