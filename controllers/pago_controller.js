const { Pago } = require("../db");

class PagoController {
    async createPago(req, res) {
        const response = req.body;

        console.log(response);

        //const pago = await Pago.create(response);

        res.json({
            success: true,
            msg: "registro exitoso",
        });
    }
}

module.exports = PagoController;