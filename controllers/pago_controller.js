const { Pago } = require("../db");

class PagoController {
    async createPago(req, res) {
        res.json({
            success: true,
            msg: "registro exitoso",
        });
    }
}

module.exports = PagoController;