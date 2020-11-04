const { Pago, Facturacion } = require("../database/db");
const { sendError } = require("../helpers/components");

class PagoController {
    async createPagoFacturacion(req, res) {
        try {
            const response = req.body;

            const dataPago = {
                userAt: response.userAt,
                id_arriendo: response.id_arriendo,
                neto_pago: response.neto_pago,
                iva_pago: response.iva_pago,
                descuento_pago: response.descuento_pago,
                total_pago: response.total_pago,
                observaciones_pago: response.observaciones_pago,
                digitador_pago: response.digitador_pago,
            };
            //se elige el metodo de pago para el PAGO
            switch (response.id_modoPago) {
                case "TARJETA":
                    dataPago.id_modoPago = 3;
                    break;
                case "CHEQUE":
                    dataPago.id_modoPago = 2;
                    break;
                case "EFECTIVO":
                    dataPago.id_modoPago = 1;
                    break;
            }
            const pago = await Pago.create(dataPago);

            const dataFacuracion = {
                tipo_facturacion: response.tipo_facturacion,
                numero_facturacion: response.numero_facturacion,
                id_pago: pago.id_pago,
                userAt: response.userAt,
            };

            const facturacion = await Facturacion.create(dataFacuracion);

            res.json({
                success: true,
                pago: pago,
                facturacion: facturacion,
                msg: "registro exitoso",
            });
        } catch (error) {
            sendError(error, res);
        }
    }
}

module.exports = PagoController;