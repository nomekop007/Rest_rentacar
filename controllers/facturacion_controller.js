const { Facturacion } = require("../database/db");
const { sendError } = require("../helpers/components");

class FacturacionController {
    async createFacturacion(req, res, next) {
        try {
            const response = req.body;
            console.log(response);
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

            next(facturacion.logging);
        } catch (error) {
            sendError(error, res);
        }
    }


    async uploadDocumentFacturacion(req, res) {
        try {

            console.log(req.file);

            await Facturacion.update({ documento_facturacion: req.file.filename }, {
                where: { id_facturacion: req.params.id },
            });

            res.json({
                success: true,
                msg: " documento guardada",
            });
        } catch (error) {
            sendError(error, res);
        }
    }
}

module.exports = FacturacionController;