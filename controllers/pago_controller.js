const { Pago, Facturacion, PagoArriendo, PagoAccesorio, Arriendo, Cliente, Empresa, Remplazo, EmpresaRemplazo } = require("../database/db");
const { sendError } = require("../helpers/components");

class PagoController {
    async createPago(req, res) {
        try {
            const response = req.body;
            console.log(response);
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