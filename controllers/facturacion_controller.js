const { Facturacion } = require("../database/db");
const { sendError } = require("../helpers/components");

class FacturacionController {
    async createFacturacion(req, res) {
        try {
            const response = req.body;

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