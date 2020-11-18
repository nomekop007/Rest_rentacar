const { Facturacion, Pago } = require("../database/db");
const { sendError } = require("../helpers/components");
const sequelize = require("sequelize");
class FacturacionController {

    async getFacturacion(req, res) {
        try {

            const facturacion = await Facturacion.findAll({
                include: Pago,
                attributes: [
                    "id_facturacion",
                    "tipo_facturacion",
                    "numero_facturacion",
                    [sequelize.fn('COUNT', sequelize.col('pagos.id_facturacion')), 'cantidadPagos'],
                    "createdAt",
                    "userAt"
                ],
                group: "pagos.id_facturacion",
                raw: true
            });

            console.log(facturacion);
            res.json({
                success: true,
                data: facturacion,
            })
        } catch (error) {
            sendError(error, res);
        }

    }

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
                data: facturacion,
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